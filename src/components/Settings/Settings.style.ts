import styled from 'styled-components';
import { rise } from '../../styles/keyframes';

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${rise} var(--dur) var(--ease-out) both;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 900;
  color: var(--heading);
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
