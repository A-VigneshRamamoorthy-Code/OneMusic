import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonTone = 'plain' | 'header' | 'track';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: IconButtonTone;
  size?: IconButtonSize;
  /** Spin the inner icon (loading / downloading states). */
  spinning?: boolean;
  /** Highlight with the brand colour (e.g. a saved-offline track). */
  active?: boolean;
  children: ReactNode;
}
