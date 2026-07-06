import type { ReactNode } from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

export interface IconBaseProps extends IconProps {
  children: ReactNode;
}
