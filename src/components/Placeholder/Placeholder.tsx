import { AlbumArt } from '../AlbumArt';
import type { PlaceholderProps } from './Placeholder.types';
import * as S from './Placeholder.style';

/** Centered empty / scanning state with either a spinner or decorative album art. */
export function Placeholder({ spinner = false, artSeed, children }: PlaceholderProps) {
  return (
    <S.Wrap>
      {spinner ? (
        <S.Spinner aria-hidden="true" />
      ) : artSeed ? (
        <S.Art>
          <AlbumArt seed={artSeed} />
        </S.Art>
      ) : null}
      <p>{children}</p>
    </S.Wrap>
  );
}
