import styled, { css } from 'styled-components';
import { eq, rise } from '../../styles/keyframes';

export const TrackList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ScanBanner = styled.div`
  font-size: 13px;
  color: var(--fg-brand);
  background: var(--brand-softer);
  border: 1px dashed var(--border-brand-subtle);
  border-radius: var(--radius-default);
  padding: 10px 12px;
`;

export const Overlay = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #fff;
  background: rgb(0 0 0 / 0.3);
  opacity: 0;
  transition: opacity var(--dur-quick);
`;

export const Play = styled.span`
  font-size: 16px;
`;

export const Eq = styled.span`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;

  & i {
    width: 3px;
    height: 100%;
    background: #fff;
    border-radius: 2px;
    transform-origin: bottom;
    animation: ${eq} 900ms var(--ease) infinite;
  }
  & i:nth-child(1) {
    animation-delay: 0ms;
  }
  & i:nth-child(2) {
    animation-delay: 150ms;
  }
  & i:nth-child(3) {
    animation-delay: 300ms;
  }
`;

export const ArtWrap = styled.span`
  position: relative;
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
  border-radius: var(--radius-default);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

export const Meta = styled.span`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Title = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Sub = styled.span`
  font-size: 12px;
  color: var(--body-subtle);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Main = styled.button`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  text-align: left;
`;

export const Actions = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding-right: 6px;
`;

export const Row = styled.li<{ $active: boolean; $row: number }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-default);
  border: 1px solid transparent;
  transition: background var(--dur-quick) var(--ease), border-color var(--dur-quick);
  animation: ${rise} var(--dur) var(--ease-out) both;
  animation-delay: calc(${(props) => props.$row} * 28ms);

  &:hover {
    background: var(--neutral-secondary-medium);
  }
  &:hover ${Overlay} {
    opacity: 1;
  }

  ${(props) =>
    props.$active &&
    css`
      background: var(--brand-softer);
      border-color: var(--border-brand-subtle);
      ${Overlay} {
        opacity: 1;
      }
    `}
`;
