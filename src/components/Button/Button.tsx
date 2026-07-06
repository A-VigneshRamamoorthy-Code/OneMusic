import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';
import { StyledButton } from './Button.style';

/** Themed button with brand / secondary / ghost variants and sm / md / lg sizes. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'brand', size = 'md', type = 'button', children, ...rest },
  ref,
) {
  return (
    <StyledButton ref={ref} type={type} $variant={variant} $size={size} {...rest}>
      {children}
    </StyledButton>
  );
});
