import styled from 'styled-components';

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
