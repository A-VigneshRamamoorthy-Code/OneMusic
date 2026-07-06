import type { Accent } from '../../config/themes';
import type { MsalAccount } from '../../types';

export interface SettingsProps {
  account: MsalAccount;
  folderPath: string;
  isLoading: boolean;
  status: string;
  onFolderPathChange: (value: string) => void;
  onSync: () => void;
  onRefresh: () => void;
  accents: Accent[];
  accentId: string;
  onSelectAccent: (id: string) => void;
  onSignOut: () => void;
}
