import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchTrackContent } from '../lib/graph';
import { clearTracks, deleteTrack, listTracks, saveTrack } from '../lib/offline';
import { getErrorMessage } from '../utils/errors';
import type { DownloadedTrackMeta, MsalAccount, Track } from '../types';

export interface UseDownloadsParams {
  ensureAccessToken: (accountToUse?: MsalAccount | null) => Promise<string>;
  setStatus: (status: string) => void;
}

export interface UseDownloadsResult {
  downloadedIds: Set<string>;
  downloadedTracks: DownloadedTrackMeta[];
  downloadingIds: Set<string>;
  isDownloaded: (id: string) => boolean;
  isDownloading: (id: string) => boolean;
  isBatchDownloading: boolean;
  downloadTrack: (track: Track) => Promise<boolean>;
  downloadBatch: (tracks: Track[]) => Promise<void>;
  cancelBatchDownload: () => void;
  removeDownload: (track: Track) => Promise<void>;
  removeAllDownloads: () => Promise<void>;
  reset: () => void;
}

/** Offline downloads persisted to IndexedDB, surviving reloads and tab closes. */
export function useDownloads({ ensureAccessToken, setStatus }: UseDownloadsParams): UseDownloadsResult {
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(() => new Set());
  const [downloadedTracks, setDownloadedTracks] = useState<DownloadedTrackMeta[]>([]);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(() => new Set());
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);
  const batchControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    listTracks()
      .then((rows) => {
        if (cancelled) {
          return;
        }
        setDownloadedTracks(rows);
        setDownloadedIds(new Set(rows.map((row) => row.id)));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const isDownloaded = useCallback((id: string) => downloadedIds.has(id), [downloadedIds]);
  const isDownloading = useCallback((id: string) => downloadingIds.has(id), [downloadingIds]);

  const downloadTrack = useCallback(
    async (track: Track, signal?: AbortSignal) => {
      if (signal?.aborted) {
        return false;
      }
      if (downloadedIds.has(track.id) || downloadingIds.has(track.id)) {
        return false;
      }
      setDownloadingIds((current) => new Set(current).add(track.id));
      try {
        const token = await ensureAccessToken();
        if (signal?.aborted) {
          return false;
        }
        const blob = await fetchTrackContent(track.id, token, signal);
        if (signal?.aborted) {
          return false;
        }
        await saveTrack(track, blob);
        setDownloadedIds((current) => new Set(current).add(track.id));
        setDownloadedTracks((current) => {
          if (current.some((item) => item.id === track.id)) {
            return current;
          }
          const meta: DownloadedTrackMeta = {
            id: track.id,
            name: track.name,
            title: track.title,
            artist: track.artist,
            album: track.album,
            size: blob.size,
            savedAt: Date.now(),
          };
          return [meta, ...current];
        });
        setStatus(`Downloaded “${track.title}” for offline use.`);
        return true;
      } catch (error) {
        if (signal?.aborted || (error instanceof Error && error.name === 'AbortError')) {
          return false;
        }
        setStatus(`Download failed: ${getErrorMessage(error)}`);
        return false;
      } finally {
        setDownloadingIds((current) => {
          const next = new Set(current);
          next.delete(track.id);
          return next;
        });
      }
    },
    [downloadedIds, downloadingIds, ensureAccessToken, setStatus],
  );

  const downloadBatch = useCallback(
    async (tracks: Track[]) => {
      if (batchControllerRef.current || !tracks.length) {
        return;
      }
      const pending = tracks.filter(
        (track) => !downloadedIds.has(track.id) && !downloadingIds.has(track.id),
      );
      if (!pending.length) {
        setStatus('Those songs are already downloaded or in progress.');
        return;
      }

      const controller = new AbortController();
      batchControllerRef.current = controller;
      setIsBatchDownloading(true);
      let completed = 0;
      try {
        for (const track of pending) {
          if (controller.signal.aborted) {
            break;
          }
          const saved = await downloadTrack(track, controller.signal);
          if (!controller.signal.aborted && saved) {
            completed += 1;
          }
        }
        if (controller.signal.aborted) {
          setStatus(`Stopped download after ${completed} song${completed === 1 ? '' : 's'}.`);
        } else {
          setStatus(`Finished downloading ${completed} song${completed === 1 ? '' : 's'}.`);
        }
      } finally {
        if (batchControllerRef.current === controller) {
          batchControllerRef.current = null;
          setIsBatchDownloading(false);
        }
      }
    },
    [downloadTrack, downloadedIds, downloadingIds, setStatus],
  );

  const cancelBatchDownload = useCallback(() => {
    batchControllerRef.current?.abort();
  }, []);

  const removeDownload = useCallback(
    async (track: Track) => {
      try {
        await deleteTrack(track.id);
      } catch {
        /* ignore */
      }
      setDownloadedIds((current) => {
        const next = new Set(current);
        next.delete(track.id);
        return next;
      });
      setDownloadedTracks((current) => current.filter((item) => item.id !== track.id));
      setStatus(`Removed “${track.title}” from offline downloads.`);
    },
    [setStatus],
  );

  const removeAllDownloads = useCallback(async () => {
    batchControllerRef.current?.abort();
    try {
      await clearTracks();
      setDownloadedIds(new Set());
      setDownloadedTracks([]);
      setStatus('Removed all offline downloads.');
    } catch (error) {
      setStatus(`Could not remove downloads: ${getErrorMessage(error)}`);
    }
  }, [setStatus]);

  const reset = useCallback(() => {
    batchControllerRef.current?.abort();
    batchControllerRef.current = null;
    setDownloadingIds(new Set());
    setIsBatchDownloading(false);
  }, []);

  return {
    downloadedIds,
    downloadedTracks,
    downloadingIds,
    isDownloaded,
    isDownloading,
    isBatchDownloading,
    downloadTrack,
    downloadBatch,
    cancelBatchDownload,
    removeDownload,
    removeAllDownloads,
    reset,
  };
}
