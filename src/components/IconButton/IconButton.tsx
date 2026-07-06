import { forwardRef } from 'react';
import type { IconButtonProps } from './IconButton.types';
import { StyledIconButton } from './IconButton.style';

/** Circular icon-only button used across the header, player and track rows. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { tone = 'plain', size = 'md', spinning = false, active = false, type = 'button', children, ...rest },
  ref,
) {
  return (
    <StyledIconButton
      ref={ref}
      type={type}
      $tone={tone}
      $size={size}
      $spinning={spinning}
      $active={active}
      {...rest}
    >
      {children}
    </StyledIconButton>
  );
});
