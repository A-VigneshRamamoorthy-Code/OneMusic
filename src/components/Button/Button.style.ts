import styled, { css } from 'styled-components';
import type { ButtonSize, ButtonVariant } from './Button.types';

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  brand: css`
    background: linear-gradient(180deg, var(--brand), var(--brand-strong));
    color: #fff;
    &:hover {
      box-shadow: var(--shadow-sm), 0 4px 16px -4px rgb(250 45 72 / 0.4);
    }
  `,
  secondary: css`
    background: var(--neutral-primary-soft);
    border-color: var(--border-default-medium);
    color: var(--heading);
    &:hover {
      background: var(--neutral-secondary-medium);
      border-color: var(--border-default-strong);
    }
  `,
  ghost: css`
    background: transparent;
    box-shadow: none;
    color: var(--heading);
    &:hover {
      background: var(--neutral-secondary-medium);
    }
  `,
};

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  md: css``,
  lg: css`
    padding: 13px 24px;
    font-size: 15px;
  `,
  sm: css`
    padding: 8px 14px;
    font-size: 13px;
    gap: 6px;
  `,
};

export const StyledButton = styled.button<{ $variant: ButtonVariant; $size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-default);
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  color: var(--heading);
  border: 1px solid transparent;
  box-shadow: var(--shadow-xs), inset var(--color-1-400) 0 6px 0 -5px, var(--color-1-700) 0 4px 10px -5px;
  transition: transform var(--dur-quick) var(--ease), background var(--dur-quick) var(--ease),
    box-shadow var(--dur-quick) var(--ease), opacity var(--dur-quick);

  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  ${(props) => variantStyles[props.$variant]}
  ${(props) => sizeStyles[props.$size]}
`;
