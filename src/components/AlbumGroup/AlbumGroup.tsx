import { AlbumArt } from '../AlbumArt';
import { IconPlay } from '../Icon';
import type { AlbumGroupProps } from './AlbumGroup.types';
import * as S from './AlbumGroup.style';

/** Album card used in the 2-column grid. Tap art/title to view tracks; tap ▶ to play. */
export function AlbumGroup({ album, count, artSeed, onPlay, onToggle }: AlbumGroupProps) {
  return (
    <S.Card>
      <S.ArtWrap>
        <S.ArtBtn type="button" onClick={onToggle} aria-label={`Open ${album}`}>
          <AlbumArt seed={artSeed} />
        </S.ArtBtn>
        <S.PlayBtn type="button" onClick={onPlay} aria-label={`Play ${album}`}>
          <IconPlay size={18} />
        </S.PlayBtn>
      </S.ArtWrap>
      <S.Meta>
        <S.Title title={album}>{album}</S.Title>
        <S.Count>
          {count} track{count === 1 ? '' : 's'}
        </S.Count>
      </S.Meta>
    </S.Card>
  );
}
