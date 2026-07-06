import styled from 'styled-components';

export const Container = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};

  @media (min-width: 768px) {
    align-items: center;
  }
`;

export const Backdrop = styled.div<{ $open: boolean }>`
  position: absolute;
  inset: 0;
  background: rgb(0 0 0 / 0.5);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: opacity var(--dur) var(--ease);
`;

export const Sheet = styled.div<{ $open: boolean }>`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px 20px calc(24px + env(safe-area-inset-bottom));
  background: var(--neutral-primary);
  border-radius: 22px 22px 0 0;
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transform: ${(props) => (props.$open ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform var(--dur-slow) var(--ease-out), opacity var(--dur);

  @media (min-width: 768px) {
    border-radius: 22px;
    transform: ${(props) => (props.$open ? 'none' : 'translateY(18px) scale(0.97)')};
    opacity: ${(props) => (props.$open ? 1 : 0)};
    transition: transform var(--dur) var(--ease-out), opacity var(--dur);
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0 8px;
  background: var(--neutral-primary);
  z-index: 1;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 900;
  color: var(--heading);
`;

export const Close = styled.button`
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

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--body-subtle);
`;

export const FullButton = styled.div`
  & > button {
    width: 100%;
  }
`;
