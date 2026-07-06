import { AlbumArt } from '../AlbumArt';
import { IconButton } from '../IconButton';
import { IconChevronUp, IconNext, IconPause, IconPlay } from '../Icon';
import type { MiniPlayerProps } from './MiniPlayer.types';
import * as S from './MiniPlayer.style';

/** Floating, frosted "now playing" pill. Tapping the body opens the full player. */
export function MiniPlayer({ track, isPlaying, progress, duration, onOpen, onToggle, onNext }: MiniPlayerProps) {
  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <S.Player>
      <S.Bar aria-hidden="true">
        <S.BarFill style={{ width: `${progressPercent}%` }} />
      </S.Bar>
      <S.Open type="button" onClick={onOpen} aria-label="Open now playing">
        <S.Art>
          <AlbumArt seed={track.id} playing={isPlaying} />
        </S.Art>
        <S.Meta>
          <S.Title>{track.title}</S.Title>
          <S.Sub>{track.artist}</S.Sub>
        </S.Meta>
        <S.Expand aria-hidden="true">
          <IconChevronUp size={18} />
        </S.Expand>
      </S.Open>
      <S.Controls>
        <IconButton onClick={onToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <IconPause size={18} /> : <IconPlay size={18} />}
        </IconButton>
        <IconButton onClick={onNext} aria-label="Next track">
          <IconNext size={20} />
        </IconButton>
      </S.Controls>
    </S.Player>
  );
}
