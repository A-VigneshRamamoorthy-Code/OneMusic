import styled from 'styled-components';

export const AppShell = styled.div<{ $dockPad: number }>`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 16px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  padding-bottom: ${(props) => props.$dockPad}px;

  @media (min-width: 768px) {
    padding: 24px 24px 32px;
    gap: 22px;
    padding-bottom: ${(props) => props.$dockPad}px;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    gap: 22px;
  }
`;
