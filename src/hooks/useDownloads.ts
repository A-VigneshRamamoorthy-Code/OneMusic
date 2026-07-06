import { useCallback, useEffect, useState } from 'react';
import { fetchTrackContent } from '../lib/graph';
import { deleteTrack, listTracks, saveTrack } from '../lib/offline';
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
  downloadTrack: (track: Track) => Promise<void>;
  removeDownload: (track: Track) => Promise<void>;
  reset: () => void;
}

/** Offline downloads persisted to IndexedDB, surviving reloads and tab closes. */
export function useDownloads({ ensureAccessToken, setStatus }: UseDownloadsParams): UseDownloadsResult {
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(() => new Set());
  const [downloadedTracks, setDownloadedTracks] = useState<DownloadedTrackMeta[]>([]);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(() => new Set());

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
    async (track: Track) => {
      if (downloadedIds.has(track.id) || downloadingIds.has(track.id)) {
        return;
      }
      setDownloadingIds((current) => new Set(current).add(track.id));
      try {
        const token = await ensureAccessToken();
        const blob = await fetchTrackContent(track.id, token);
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
      } catch (error) {
        setStatus(`Download failed: ${getErrorMessage(error)}`);
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

  const reset = useCallback(() => {
    setDownloadingIds(new Set());
  }, []);

  return {
    downloadedIds,
    downloadedTracks,
    downloadingIds,
    isDownloaded,
    isDownloading,
    downloadTrack,
    removeDownload,
    reset,
  };
}
