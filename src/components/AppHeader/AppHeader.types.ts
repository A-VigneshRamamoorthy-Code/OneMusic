import type { MsalAccount } from '../../types';

export interface AppHeaderProps {
  account: MsalAccount | null;
  isLoading: boolean;
  isSyncOpen: boolean;
  onToggleSync: () => void;
  onRefresh: () => void;
  onSignOut: () => void;
  onSignIn: () => void;
}
