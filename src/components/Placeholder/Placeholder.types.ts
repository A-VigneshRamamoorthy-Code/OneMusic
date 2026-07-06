import type { ReactNode } from 'react';

export interface PlaceholderProps {
  /** Show the spinning loader instead of album art. */
  spinner?: boolean;
  /** Seed for the decorative album art (ignored when `spinner` is set). */
  artSeed?: string;
  children: ReactNode;
}
