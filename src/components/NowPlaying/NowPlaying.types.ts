import type { ChangeEvent, PointerEventHandler } from 'react';
import type { Track } from '../../types';

export interface NowPlayingProps {
  track: Track;
  isOpen: boolean;
  isDragging: boolean;
  dragY: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isDownloaded: boolean;
  isDownloading: boolean;
  onClose: () => void;
  onSeek: (time: number) => void;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  onRemoveDownload: () => void;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
}
