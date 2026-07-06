import type { Track } from '../../types';

export interface MiniPlayerProps {
  track: Track;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onOpen: () => void;
  onToggle: () => void;
  onNext: () => void;
}
