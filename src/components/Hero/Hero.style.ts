import styled from 'styled-components';
import { rise } from '../../styles/keyframes';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  padding: 24px 8px 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    text-align: left;
    gap: 48px;
    padding: 48px 8px 56px;
  }
`;

export const Art = styled.div`
  width: min(64vw, 240px);
  aspect-ratio: 1;
  border-radius: var(--radius-base);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  animation: ${rise} var(--dur-slow) var(--ease-out) both;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

export const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 46ch;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

export const Eyebrow = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--fg-brand);
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 900;
  line-height: 1.15;
  color: var(--heading);

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

export const Lead = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: var(--body);
`;

export const Status = styled.p<{ $error: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.$error ? 'var(--danger)' : 'var(--body-subtle)')};
`;
