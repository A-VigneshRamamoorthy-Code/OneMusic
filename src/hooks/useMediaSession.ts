import { useEffect } from 'react';
import { artworkDataUrl } from '../lib/albumArt';
import type { Track } from '../types';

export interface UseMediaSessionParams {
  activeTrack: Track | null;
  isPlaying: boolean;
  playNext: () => void;
  playPrevious: () => void;
  resume: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => void;
}

/**
 * Wire the browser Media Session API (metadata, artwork, transport handlers,
 * position state) so playback keeps going when the device is locked and shows
 * lock-screen / Control Center controls.
 */
export function useMediaSession({
  activeTrack,
  isPlaying,
  playNext,
  playPrevious,
  resume,
  pause,
  seek,
}: UseMediaSessionParams): void {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
      return;
    }
    const session = navigator.mediaSession;

    if (activeTrack && typeof window.MediaMetadata === 'function') {
      try {
        session.metadata = new window.MediaMetadata({
          title: activeTrack.title || activeTrack.name || 'Unknown title',
          artist: activeTrack.artist || 'OneMusic',
          album: activeTrack.album || 'OneDrive',
          artwork: [{ src: artworkDataUrl(activeTrack.id, isPlaying), sizes: '512x512', type: 'image/svg+xml' }],
        });
      } catch {
        /* MediaMetadata may be unavailable */
      }
    }

    try {
      session.playbackState = isPlaying ? 'playing' : 'paused';
    } catch {
      /* playbackState is best-effort */
    }

    const setHandler = (action: MediaSessionAction, handler: MediaSessionActionHandler) => {
      try {
        session.setActionHandler(action, handler);
      } catch {
        /* unsupported action */
      }
    };

    setHandler('play', () => {
      void resume();
    });
    setHandler('pause', () => {
      pause();
    });
    setHandler('previoustrack', () => {
      playPrevious();
    });
    setHandler('nexttrack', () => {
      playNext();
    });
    setHandler('seekto', (details) => {
      if (typeof details.seekTime === 'number') {
        seek(details.seekTime);
      }
    });
  }, [activeTrack, isPlaying, playNext, playPrevious, resume, pause, seek]);
}
