import type { Track } from '../../types';

export interface TrackRowProps {
  track: Track;
  index: number;
  isActive: boolean;
  /** True only when this specific track is both active AND currently playing. */
  isActivePlaying: boolean;
  isDownloaded: boolean;
  isDownloading: boolean;
  onSelect: (track: Track) => void;
  onDownload: (track: Track) => void;
  onRemoveDownload: (track: Track) => void;
}
