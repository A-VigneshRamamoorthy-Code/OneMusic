import type { DockProps } from './Dock.types';
import * as S from './Dock.style';

/** Fixed, centered container that floats the mini-player and tab bar over content. */
export function Dock({ children }: DockProps) {
  return (
    <S.Dock>
      <S.Inner>{children}</S.Inner>
    </S.Dock>
  );
}
