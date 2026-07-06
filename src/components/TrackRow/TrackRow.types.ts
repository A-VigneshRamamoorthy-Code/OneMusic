import type { Track } from '../../types';

export interface TrackRowProps {
  track: Track;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  isDownloaded: boolean;
  isDownloading: boolean;
  onSelect: (track: Track) => void;
  onDownload: (track: Track) => void;
  onRemoveDownload: (track: Track) => void;
}
