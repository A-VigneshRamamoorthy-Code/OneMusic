import type { ChangeEvent } from 'react';
import type { Accent } from '../../config/themes';
import type { MsalAccount } from '../../types';

export interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
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

export type SettingsChangeEvent = ChangeEvent<HTMLInputElement>;
