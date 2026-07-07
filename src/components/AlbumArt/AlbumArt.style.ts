import styled, { css } from 'styled-components';
import { breathe, vinyl } from '../../styles/keyframes';

export const Art = styled.svg<{ $playing: boolean; $variant: 'row' | 'player' }>`
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: center;

  ${(props) =>
    props.$playing &&
    props.$variant === 'player' &&
    css`
      will-change: transform;
      animation: ${vinyl} 4s linear infinite;
    `}

  ${(props) =>
    props.$playing &&
    props.$variant === 'row' &&
    css`
      will-change: transform;
      animation: ${breathe} 4.5s ease-in-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
