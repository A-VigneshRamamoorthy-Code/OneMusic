import { AlbumArt } from '../AlbumArt';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import {
  IconCheck,
  IconChevronDown,
  IconDownload,
  IconNext,
  IconPause,
  IconPlay,
  IconShuffle,
  IconPrev,
  IconSpinner,
  IconVolumeHigh,
  IconVolumeLow,
} from '../Icon';
import { formatTime, formatTrackMetaLine } from '../../utils/format';
import type { NowPlayingProps } from './NowPlaying.types';
import * as S from './NowPlaying.style';

/** Full-screen, drag-to-dismiss "now playing" view. */
export function NowPlaying({
  track,
  isOpen,
  isDragging,
  dragY,
  isPlaying,
  progress,
  duration,
  volume,
  isShuffleOn,
  isDownloaded,
  isDownloading,
  onClose,
  onSeek,
  onToggle,
  onNext,
  onPrevious,
  onVolumeChange,
  onToggleShuffle,
  onDownload,
  onRemoveDownload,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: NowPlayingProps) {
  const backdropStyle = dragY ? { opacity: Math.max(0, 1 - dragY / 520) } : undefined;
  const sheetStyle = dragY
    ? { transform: `translateY(${dragY}px)`, transition: isDragging ? 'none' : undefined }
    : undefined;

  return (
    <S.Container $open={isOpen} role="dialog" aria-modal="true" aria-label="Now playing" aria-hidden={!isOpen}>
      <S.Backdrop $open={isOpen} $dragging={isDragging} style={backdropStyle} onClick={onClose} />
      <S.Sheet
        $open={isOpen}
        $dragging={isDragging}
        style={sheetStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <S.TopBar>
          <S.Close type="button" onClick={onClose} aria-label="Close now playing">
            <IconChevronDown size={22} />
          </S.Close>
          <S.Grip type="button" onClick={onClose} aria-label="Close now playing" />
        </S.TopBar>

        <S.Body>
          <S.ArtWrap $playing={isPlaying}>
            <AlbumArt seed={track.id} playing={isPlaying} variant="player" />
          </S.ArtWrap>

          <S.Meta>
            <S.Eyebrow>Now playing</S.Eyebrow>
            <S.Title>{track.title}</S.Title>
            <S.Sub>{formatTrackMetaLine(track.album, track.artist)}</S.Sub>
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
              {isPlaying ? <IconPause size={28} /> : <IconPlay size={28} />}
            </S.PlayButton>
            <IconButton size="lg" onClick={onNext} aria-label="Next track">
              <IconNext size={24} />
            </IconButton>
          </S.Transport>

          <S.ShuffleButton type="button" $active={isShuffleOn} onClick={onToggleShuffle} aria-pressed={isShuffleOn}>
            <IconShuffle size={18} /> {isShuffleOn ? 'Shuffle on' : 'Shuffle off'}
          </S.ShuffleButton>

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
                <IconDownload size={16} /> Download songs
              </Button>
            )}
          </S.Foot>
        </S.Body>
      </S.Sheet>
    </S.Container>
  );
}
