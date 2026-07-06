import type { ReactNode } from 'react';

export interface AlbumGroupProps {
  album: string;
  count: number;
  artSeed: string;
  children: ReactNode;
}
