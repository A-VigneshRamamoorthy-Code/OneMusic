import { AlbumArt } from '../AlbumArt';
import { TrackList } from '../TrackRow';
import type { AlbumGroupProps } from './AlbumGroup.types';
import * as S from './AlbumGroup.style';

/** One album section: header (art + name + count) followed by its track rows. */
export function AlbumGroup({ album, count, artSeed, children }: AlbumGroupProps) {
  return (
    <S.Group>
      <S.Head>
        <S.Art>
          <AlbumArt seed={artSeed} />
        </S.Art>
        <S.Meta>
          <S.Title>{album}</S.Title>
          <S.Count>
            {count} track{count === 1 ? '' : 's'}
          </S.Count>
        </S.Meta>
      </S.Head>
      <TrackList>{children}</TrackList>
    </S.Group>
  );
}
