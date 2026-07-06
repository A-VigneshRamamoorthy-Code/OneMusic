import type { AccountInfo } from '@azure/msal-browser';

export type MsalAccount = AccountInfo;

/** A playable audio track discovered in OneDrive. */
export interface Track {
  id: string;
  name: string;
  title: string;
  artist: string;
  album: string;
  /** Track number within its album (from ID3 metadata), when available. */
  trackNumber?: number;
  mimeType?: string;
  path?: string;
}

/** Metadata for a track saved for offline playback (blob stripped). */
export interface DownloadedTrackMeta extends Track {
  size?: number;
  savedAt?: number;
}

/** Tracks grouped by album, used by the Albums view. */
export interface AlbumGroup {
  album: string;
  tracks: Track[];
}

export type ViewMode = 'songs' | 'albums' | 'downloaded';

export type AuthState = 'idle' | 'config' | 'ready' | 'error';

/** Microsoft Graph `audio` facet: ID3-derived metadata for audio driveItems. */
export interface DriveAudioFacet {
  album?: string;
  albumArtist?: string;
  artist?: string;
  title?: string;
  track?: number;
  year?: number;
}

/** Minimal shape of the Microsoft Graph driveItem fields we rely on. */
export interface DriveItem {
  id: string;
  name: string;
  folder?: unknown;
  file?: { mimeType?: string };
  audio?: DriveAudioFacet;
  parentReference?: { path?: string };
}

export interface DriveChildrenResponse {
  value?: DriveItem[];
  '@odata.nextLink'?: string;
  error?: { message?: string };
}

export interface MsalConfig {
  clientId: string;
  tenant: string;
  redirectUri: string;
}
