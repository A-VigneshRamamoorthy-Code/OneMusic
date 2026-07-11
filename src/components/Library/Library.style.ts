import styled from 'styled-components';
import { spin } from '../../styles/keyframes';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: var(--heading);
`;

export const HeaderAction = styled.div`
  flex: 0 0 auto;
`;

export const BatchProgress = styled.span`
  position: relative;
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;

  & > svg:first-child {
    animation: ${spin} 800ms linear infinite;
  }
`;

export const StopGlyph = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
`;

export const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 4px;
`;

export const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--fg-brand);
  padding: 4px 0;
  align-self: flex-start;
  transition: opacity var(--dur-quick);

  &:active {
    opacity: 0.7;
  }
`;

export const DetailAlbum = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--heading);
  margin-top: 4px;
`;

export const DetailCount = styled.p`
  font-size: 13px;
  color: var(--body-subtle);
`;
