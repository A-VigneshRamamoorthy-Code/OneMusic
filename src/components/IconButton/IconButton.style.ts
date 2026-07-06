import styled, { css } from 'styled-components';
import { spin } from '../../styles/keyframes';
import type { IconButtonSize, IconButtonTone } from './IconButton.types';

const sizeStyles: Record<IconButtonSize, ReturnType<typeof css>> = {
  sm: css`
    width: 34px;
    height: 34px;
  `,
  md: css`
    width: 40px;
    height: 40px;
  `,
  lg: css`
    width: 52px;
    height: 52px;
    font-size: 20px;
  `,
};

const toneStyles: Record<IconButtonTone, ReturnType<typeof css>> = {
  plain: css``,
  header: css`
    border: 1px solid var(--border-default-medium);
    background: var(--neutral-primary-soft);
    box-shadow: var(--shadow-xs);
    &:hover {
      background: var(--neutral-secondary-medium);
      border-color: var(--border-default-strong);
    }
    &:disabled {
      opacity: 0.5;
    }
  `,
  track: css`
    color: var(--body-subtle);
    &:hover {
      color: var(--heading);
      background: var(--neutral-tertiary-medium);
    }
  `,
};

export const StyledIconButton = styled.button<{
  $tone: IconButtonTone;
  $size: IconButtonSize;
  $spinning: boolean;
  $active: boolean;
}>`
  border-radius: var(--radius-full);
  display: inline-grid;
  place-items: center;
  color: var(--heading);
  font-size: 15px;
  transition: background var(--dur-quick), transform var(--dur-quick), color var(--dur-quick),
    border-color var(--dur-quick);

  &:hover {
    background: var(--neutral-secondary-medium);
  }
  &:active {
    transform: scale(0.92);
  }
  &:disabled {
    cursor: not-allowed;
  }

  & svg {
    display: block;
    ${(props) =>
      props.$spinning &&
      css`
        animation: ${spin} 800ms linear infinite;
        transform-origin: center;
      `}
  }

  ${(props) => sizeStyles[props.$size]}
  ${(props) => toneStyles[props.$tone]}
  ${(props) =>
    props.$active &&
    css`
      color: var(--fg-brand);
      &:hover {
        color: var(--fg-brand);
      }
    `}
`;
