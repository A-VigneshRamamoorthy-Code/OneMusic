import styled, { css } from 'styled-components';
import { breathe } from '../../styles/keyframes';

export const Art = styled.svg<{ $playing: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: center;
  will-change: transform;
  ${(props) =>
    props.$playing &&
    css`
      animation: ${breathe} 4.5s ease-in-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
