import styled from 'styled-components';
import { rise } from '../../styles/keyframes';

export const Card = styled.section`
  background: var(--neutral-primary-soft);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-xs);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${rise} var(--dur) var(--ease-out) both;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const Eyebrow = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--fg-brand);
`;

export const AccountChip = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--fg-brand);
  background: var(--brand-softer);
  border: 1px solid var(--border-brand-subtle);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  max-width: 52%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
`;

export const Field = styled.div`
  flex: 1 1 200px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--neutral-secondary-medium);
  border: 1px solid var(--border-default-medium);
  border-radius: var(--radius-default);
  padding: 0 12px;
  transition: border-color var(--dur-quick), box-shadow var(--dur-quick);

  &:focus-within {
    border-color: var(--border-brand);
    box-shadow: 0 0 0 1px var(--brand);
  }
`;

export const Prefix = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: var(--body);
  white-space: nowrap;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: none;
  border: 0;
  padding: 11px 0;
  font-size: 14px;
  color: var(--heading);

  &:focus-visible {
    box-shadow: none;
  }
`;

export const Hint = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: var(--body-subtle);
`;
