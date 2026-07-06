import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 8px;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-base);
  background: var(--neutral-primary-soft);
  background: color-mix(in srgb, var(--neutral-primary-soft) 82%, transparent);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const Mark = styled.span`
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  font-size: 20px;
  color: #fff;
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  box-shadow: var(--shadow-sm);
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Eyebrow = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg-brand);
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 900;
  line-height: 1;
  color: var(--heading);
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
