import styled, { css } from 'styled-components';
import { sheen, spin } from '../../styles/keyframes';

export const Container = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: stretch;
  justify-content: center;
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};
`;

export const Backdrop = styled.div<{ $open: boolean; $dragging: boolean }>`
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.45);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: ${(props) => (props.$dragging ? 'none' : 'opacity var(--dur) var(--ease)')};
`;

/** Full-screen, draggable sheet. Dragging anywhere that isn't an interactive control dismisses it. */
export const Sheet = styled.div<{ $open: boolean; $dragging: boolean }>`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  touch-action: none;
  padding: calc(8px + env(safe-area-inset-top)) 22px calc(24px + env(safe-area-inset-bottom));
  background:
    radial-gradient(130% 62% at 50% -6%, var(--brand-soft), transparent 62%),
    linear-gradient(180deg, var(--neutral-primary-soft), var(--neutral-primary) 46%);
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  transform: ${(props) => (props.$open ? 'translateY(0)' : 'translateY(100%)')};
  transition: ${(props) => (props.$dragging ? 'none' : 'transform var(--dur-slow) var(--ease-out)')};

  &:active {
    cursor: grabbing;
  }

  @media (min-width: 768px) {
    max-width: 620px;
  }
`;

export const TopBar = styled.div`
  width: 100%;
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 8px;
`;

export const Grip = styled.button`
  grid-column: 2;
  justify-self: center;
  width: 44px;
  height: 5px;
  border-radius: 999px;
  background: var(--gray);
`;

export const Close = styled.button`
  grid-column: 1;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: inline-grid;
  place-items: center;
  color: var(--heading);
  background: var(--neutral-secondary-medium);
  transition: background var(--dur-quick), transform var(--dur-quick);

  &:hover {
    background: var(--neutral-tertiary-medium);
  }
  &:active {
    transform: scale(0.92);
  }
`;

export const Body = styled.div`
  flex: 1 1 auto;
  width: 100%;
  max-width: 460px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 3.2vh, 26px);
`;

export const ArtWrap = styled.div<{ $playing: boolean }>`
  position: relative;
  width: min(72vw, 340px);
  max-height: 42vh;
  aspect-ratio: 1;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: var(--shadow-2xl), 0 26px 64px -22px rgb(250 45 72 / 0.5);

  &::after {
    content: '';
    position: absolute;
    inset: -35%;
    background: conic-gradient(
      from 0deg,
      transparent 0turn,
      rgb(255 255 255 / 0.16) 0.14turn,
      transparent 0.34turn
    );
    opacity: ${(props) => (props.$playing ? 1 : 0)};
    transition: opacity var(--dur) var(--ease);
    pointer-events: none;
    ${(props) =>
      props.$playing &&
      css`
        animation: ${sheen} 7s linear infinite;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

export const Meta = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 100%;
`;

export const Eyebrow = styled.p`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-brand);
`;

export const Title = styled.h2`
  font-size: clamp(22px, 6vw, 30px);
  font-weight: 900;
  line-height: 1.15;
  color: var(--heading);
  overflow-wrap: anywhere;
`;

export const Sub = styled.p`
  font-size: 15px;
  color: var(--body-subtle);
  overflow-wrap: anywhere;
`;

export const Scrubber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Range = styled.input`
  width: 100%;
  height: 6px;
  accent-color: var(--brand);
  touch-action: none;
  cursor: pointer;
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
  gap: clamp(18px, 6vw, 30px);
`;

export const PlayButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: var(--radius-full);
  display: inline-grid;
  place-items: center;
  font-size: 24px;
  color: #fff;
  background: linear-gradient(180deg, var(--brand), var(--brand-strong));
  box-shadow: var(--shadow-lg), 0 10px 28px -6px rgb(250 45 72 / 0.55);
  transition: transform var(--dur-quick) var(--ease);

  &:active {
    transform: scale(0.94);
  }
`;

export const Volume = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  color: var(--body-subtle);

  & input {
    width: 100%;
    height: 6px;
    accent-color: var(--brand);
    touch-action: none;
    cursor: pointer;
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
