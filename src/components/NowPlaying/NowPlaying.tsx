import { AlbumArt } from '../AlbumArt';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import {
  IconCheck,
  IconDownload,
  IconNext,
  IconPause,
  IconPlay,
  IconPrev,
  IconSpinner,
  IconVolumeHigh,
  IconVolumeLow,
} from '../Icon';
import { formatTime } from '../../utils/format';
import type { NowPlayingProps } from './NowPlaying.types';
import * as S from './NowPlaying.style';

/** Full-screen, draggable "now playing" bottom sheet. */
export function NowPlaying({
  track,
  isOpen,
  isDragging,
  dragY,
  isPlaying,
  progress,
  duration,
  volume,
  isDownloaded,
  isDownloading,
  onClose,
  onSeek,
  onToggle,
  onNext,
  onPrevious,
  onVolumeChange,
  onDownload,
  onRemoveDownload,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: NowPlayingProps) {
  const backdropStyle = dragY ? { opacity: Math.max(0, 1 - dragY / 480) } : undefined;
  const sheetStyle = dragY
    ? { transform: `translateY(${dragY}px)`, transition: isDragging ? 'none' : undefined }
    : undefined;

  return (
    <S.Container $open={isOpen} role="dialog" aria-modal="true" aria-label="Now playing" aria-hidden={!isOpen}>
      <S.Backdrop $open={isOpen} $dragging={isDragging} style={backdropStyle} onClick={onClose} />
      <S.Sheet $open={isOpen} $dragging={isDragging} style={sheetStyle}>
        <S.Handle onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          <S.Grip type="button" onClick={onClose} aria-label="Close now playing" />
          <S.ArtWrap>
            <AlbumArt seed={track.id} playing={isPlaying} spin />
          </S.ArtWrap>
        </S.Handle>
        <S.Meta>
          <S.Eyebrow>Now playing</S.Eyebrow>
          <S.Title>{track.title}</S.Title>
          <S.Sub>
            {track.artist} • {track.album}
          </S.Sub>
        </S.Meta>
        <S.Scrubber>
          <S.Range
            type="range"
            min={0}
            max={duration || 100}
            step="0.1"
            value={progress}
            aria-label="Seek"
            onChange={(event) => onSeek(Number(event.target.value))}
          />
          <S.Times>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </S.Times>
        </S.Scrubber>
        <S.Transport>
          <IconButton size="lg" onClick={onPrevious} aria-label="Previous track">
            <IconPrev size={24} />
          </IconButton>
          <S.PlayButton type="button" onClick={onToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <IconPause size={26} /> : <IconPlay size={26} />}
          </S.PlayButton>
          <IconButton size="lg" onClick={onNext} aria-label="Next track">
            <IconNext size={24} />
          </IconButton>
        </S.Transport>
        <S.Volume htmlFor="np-volume">
          <IconVolumeLow size={18} />
          <input
            id="np-volume"
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            aria-label="Volume"
            onChange={onVolumeChange}
          />
          <IconVolumeHigh size={18} />
        </S.Volume>
        <S.Foot>
          {isDownloaded ? (
            <Button variant="secondary" size="sm" onClick={onRemoveDownload}>
              <IconCheck size={16} /> Saved offline
            </Button>
          ) : isDownloading ? (
            <Button variant="secondary" size="sm" disabled>
              <S.Spinning>
                <IconSpinner size={16} />
              </S.Spinning>{' '}
              Downloading…
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={onDownload}>
              <IconDownload size={16} /> Download
            </Button>
          )}
        </S.Foot>
      </S.Sheet>
    </S.Container>
  );
}
