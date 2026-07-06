import styled, { css } from 'styled-components';

export const Switch = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-full);
  background: var(--neutral-secondary-medium);
  border: 1px solid var(--border-default);
  align-self: flex-start;
`;

export const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
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
