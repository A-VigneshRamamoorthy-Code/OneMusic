import { AUDIO_EXTENSIONS } from '../config/constants';
import type { DriveItem, Track } from '../types';

/** True when a file name has a recognised audio extension. */
export function isAudioFile(name: string): boolean {
  const extension = name.split('.').pop()?.toLowerCase();
  return Boolean(extension && AUDIO_EXTENSIONS.has(extension));
}

/** Strip slashes and a redundant "My files/" prefix from a user-entered path. */
export function normalizeFolderPath(rawPath: string): string {
  return (rawPath || '')
    .replace(/^\/+|\/+$/g, '')
    .replace(/^my files\/?/i, '')
    .replace(/^\/+|\/+$/g, '')
    .trim();
}

/** Build the Graph children route for a folder path under the drive root. */
export function buildFolderRoute(rawPath: string): string {
  const clean = normalizeFolderPath(rawPath);
  if (!clean) {
    return '/me/drive/root/children';
  }
  const encoded = clean.split('/').filter(Boolean).map(encodeURIComponent).join('/');
  return `/me/drive/root:/${encoded}:/children`;
}

/** Human-readable label for a folder path, always prefixed with "My files". */
export function folderLabel(rawPath: string): string {
  const clean = normalizeFolderPath(rawPath);
  return clean ? `My files/${clean}` : 'My files';
}

/** Derive display metadata (title/artist/album) from a Graph drive item. */
export function buildTrackMetadata(item: DriveItem): Track {
  const fileName = item.name.replace(/\.[^/.]+$/, '');
  const cleaned = fileName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const words = cleaned.split(' ').filter(Boolean);
  const guessedArtist = words.length > 1 && !words[0].match(/^\d+$/) ? words[0] : 'Unknown artist';
  const guessedTitle = words.length > 1 ? words.slice(1).join(' ') : cleaned || item.name;

  const audio = item.audio || {};
  let folderName = '';
  try {
    folderName = decodeURIComponent(item.parentReference?.path?.split('/').filter(Boolean).pop() || '');
  } catch {
    folderName = item.parentReference?.path?.split('/').filter(Boolean).pop() || '';
  }

  const title = audio.title?.trim() || guessedTitle;
  const artist = audio.artist?.trim() || audio.albumArtist?.trim() || guessedArtist;
  const album = audio.album?.trim() || folderName || 'Singles';

  return {
    id: item.id,
    name: item.name,
    title,
    artist,
    album,
    trackNumber: typeof audio.track === 'number' ? audio.track : undefined,
    mimeType: item.file?.mimeType || 'audio/mpeg',
    path: item.parentReference?.path || '',
  };
}
