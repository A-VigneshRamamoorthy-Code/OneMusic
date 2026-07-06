import styled from 'styled-components';
import { spin } from '../../styles/keyframes';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px 16px;
  color: var(--body-subtle);
`;

export const Art = styled.div`
  width: 120px;
  height: 120px;
  border-radius: var(--radius-base);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid var(--brand-soft);
  border-top-color: var(--brand);
  animation: ${spin} 900ms linear infinite;
`;
