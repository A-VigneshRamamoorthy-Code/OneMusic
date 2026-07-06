import type { MsalAccount } from '../../types';

export interface AppHeaderProps {
  account: MsalAccount | null;
  onSignIn: () => void;
}
