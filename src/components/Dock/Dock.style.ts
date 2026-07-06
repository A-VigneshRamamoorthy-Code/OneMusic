import styled from 'styled-components';

export const Dock = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  padding: 0 12px calc(12px + env(safe-area-inset-bottom));
  pointer-events: none;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > * {
    pointer-events: auto;
  }
`;
