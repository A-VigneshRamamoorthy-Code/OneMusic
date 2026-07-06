import styled from 'styled-components';
import { rise } from '../../styles/keyframes';

export const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${rise} var(--dur) var(--ease-out) both;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 4px 2px;
`;

export const Art = styled.span`
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  border-radius: var(--radius-default);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Title = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: var(--heading);
`;

export const Count = styled.span`
  font-size: 12px;
  color: var(--body-subtle);
`;
