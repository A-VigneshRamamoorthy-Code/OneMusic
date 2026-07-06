import styled, { css } from 'styled-components';
import { rise } from '../../styles/keyframes';

export const Switch = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  padding: 5px;
  border-radius: 22px;
  border: 1px solid var(--border-default);
  background: var(--neutral-primary-soft);
  background: color-mix(in srgb, var(--neutral-primary-soft) 66%, transparent);
  -webkit-backdrop-filter: blur(28px) saturate(1.6);
  backdrop-filter: blur(28px) saturate(1.6);
  box-shadow: var(--shadow-lg);
  animation: ${rise} var(--dur) var(--ease-out) both;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 700;
  color: var(--body);
  transition: background var(--dur-quick), color var(--dur-quick);

  ${(props) =>
    props.$active
      ? css`
          background: var(--neutral-primary-soft);
          color: var(--fg-brand);
          box-shadow: var(--shadow-xs);
        `
      : css`
          &:hover {
            color: var(--heading);
          }
        `}
`;
