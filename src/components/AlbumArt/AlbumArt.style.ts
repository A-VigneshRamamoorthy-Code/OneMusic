import styled, { css } from 'styled-components';
import { vinyl } from '../../styles/keyframes';

export const Art = styled.svg<{ $spinning: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  ${(props) =>
    props.$spinning &&
    css`
      animation: ${vinyl} 10s linear infinite;
    `}
`;
