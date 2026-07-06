import styled, { css } from 'styled-components';

export const AppShell = styled.div<{ $hasTabbar: boolean; $hasMini: boolean }>`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px 16px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 24px 24px 32px;
    gap: 22px;
  }

  ${(props) =>
    props.$hasTabbar &&
    css`
      padding-bottom: 108px;
    `}
  ${(props) =>
    props.$hasMini &&
    css`
      padding-bottom: 180px;
    `}
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    gap: 22px;
  }
`;
