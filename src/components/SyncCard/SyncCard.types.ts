import type { MsalAccount } from '../../types';

export interface SyncCardProps {
  account: MsalAccount;
  folderPath: string;
  isLoading: boolean;
  status: string;
  onFolderPathChange: (value: string) => void;
  onSync: () => void;
}
