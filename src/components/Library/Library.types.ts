import type { AlbumGroup, DownloadedTrackMeta, Track, ViewMode } from '../../types';

export interface LibraryProps {
  isLoading: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  tracks: Track[];
  visibleTracks: Track[];
  albumGroups: AlbumGroup[];
  visibleDownloaded: DownloadedTrackMeta[];
  downloadedTracks: DownloadedTrackMeta[];
  folderPath: string;
  activeTrackId: string | null;
  isPlaying: boolean;
  isDownloaded: (id: string) => boolean;
  isDownloading: (id: string) => boolean;
  onSelect: (track: Track) => void;
  onDownload: (track: Track) => void;
  onRemoveDownload: (track: Track) => void;
}
