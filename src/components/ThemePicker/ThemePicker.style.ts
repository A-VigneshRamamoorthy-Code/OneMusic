import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Swatch = styled.button<{ $color: string; $selected: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: var(--radius-full);
  background: ${(props) => props.$color};
  display: inline-grid;
  place-items: center;
  color: #fff;
  box-shadow:
    0 0 0 2px var(--neutral-primary-soft),
    0 0 0 ${(props) => (props.$selected ? '4px' : '2px')} ${(props) => (props.$selected ? props.$color : 'transparent')};
  transition: transform var(--dur-quick) var(--ease), box-shadow var(--dur-quick) var(--ease);

  &:hover {
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.94);
  }

  & svg {
    filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.3));
    opacity: ${(props) => (props.$selected ? 1 : 0)};
    transform: ${(props) => (props.$selected ? 'scale(1)' : 'scale(0.4)')};
    transition: opacity var(--dur-quick) var(--ease), transform var(--dur-quick) var(--ease-out);
  }
`;

export const Name = styled.span`
  font-size: 13px;
  color: var(--body-subtle);
`;
