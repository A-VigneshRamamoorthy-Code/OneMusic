import styled from 'styled-components';
import { spin } from '../../styles/keyframes';

export const Container = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const Backdrop = styled.div<{ $open: boolean; $dragging: boolean }>`
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(6px);
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: ${(props) => (props.$dragging ? 'none' : 'opacity var(--dur) var(--ease)')};
`;

export const Sheet = styled.div<{ $open: boolean; $dragging: boolean }>`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  max-height: 94vh;
  overflow: auto;
  padding: 12px 20px calc(28px + env(safe-area-inset-bottom));
  background: var(--neutral-primary);
  border-radius: 22px 22px 0 0;
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  transform: ${(props) => (props.$open ? 'translateY(0)' : 'translateY(100%)')};
  transition: ${(props) => (props.$dragging ? 'none' : 'transform var(--dur-slow) var(--ease-out)')};

  @media (min-width: 768px) {
    border-radius: 24px;
    max-height: 90vh;
    transform: ${(props) => (props.$open ? 'none' : 'translateY(24px) scale(0.96)')};
    opacity: ${(props) => (props.$open ? 1 : 0)};
    transition: ${(props) =>
      props.$dragging ? 'none' : 'transform var(--dur) var(--ease-out), opacity var(--dur)'};
  }
`;

export const Handle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  touch-action: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const Grip = styled.button`
  width: 44px;
  height: 5px;
  border-radius: 999px;
  background: var(--gray);
  margin: 4px 0 6px;
`;

export const ArtWrap = styled.div`
  width: min(74vw, 320px);
  aspect-ratio: 1;
  border-radius: var(--radius-base);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
`;

export const Meta = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 100%;
`;

export const Eyebrow = styled.p`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--fg-brand);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 900;
  line-height: 1.2;
  color: var(--heading);
  overflow-wrap: anywhere;
`;

export const Sub = styled.p`
  font-size: 14px;
  color: var(--body-subtle);
`;

export const Scrubber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Range = styled.input`
  width: 100%;
  height: 4px;
  accent-color: var(--brand);
`;

export const Times = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--body-subtle);
`;

export const Transport = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const PlayButton = styled.button`
  width: 66px;
  height: 66px;
  border-radius: var(--radius-full);
  display: inline-grid;
  place-items: center;
  font-size: 24px;
  color: #fff;
  background: linear-gradient(180deg, var(--brand), var(--brand-strong));
  box-shadow: var(--shadow-lg), 0 8px 24px -6px rgb(250 45 72 / 0.5);
  transition: transform var(--dur-quick) var(--ease);

  &:active {
    transform: scale(0.94);
  }
`;

export const Volume = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  font-size: 14px;
  color: var(--body-subtle);

  & input {
    width: 100%;
    height: 4px;
    accent-color: var(--brand);
  }
`;

export const Foot = styled.div`
  display: flex;
  justify-content: center;
`;

export const Spinning = styled.span`
  display: inline-grid;
  place-items: center;

  & svg {
    animation: ${spin} 800ms linear infinite;
    transform-origin: center;
  }
`;
