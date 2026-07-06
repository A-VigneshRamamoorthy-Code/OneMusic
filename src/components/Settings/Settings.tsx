import { Button } from '../Button';
import { IconRefresh, IconSignOut } from '../Icon';
import { SyncCard } from '../SyncCard';
import { ThemePicker } from '../ThemePicker';
import type { SettingsProps } from './Settings.types';
import * as S from './Settings.style';

/** Inline Settings page (shown in the main column): folder sync, refresh, accent theme and sign out. */
export function Settings({
  account,
  folderPath,
  isLoading,
  status,
  onFolderPathChange,
  onSync,
  onRefresh,
  accents,
  accentId,
  onSelectAccent,
  onSignOut,
}: SettingsProps) {
  return (
    <S.Page aria-label="Settings">
      <S.Head>
        <S.Title>Settings</S.Title>
      </S.Head>

      <S.Section>
        <S.SectionTitle>Music folder</S.SectionTitle>
        <SyncCard
          account={account}
          folderPath={folderPath}
          isLoading={isLoading}
          status={status}
          onFolderPathChange={onFolderPathChange}
          onSync={onSync}
        />
        <S.FullButton>
          <Button variant="secondary" onClick={onRefresh} disabled={isLoading}>
            <IconRefresh size={16} /> {isLoading ? 'Refreshing…' : 'Refresh library'}
          </Button>
        </S.FullButton>
      </S.Section>

      <S.Section>
        <S.SectionTitle>Appearance</S.SectionTitle>
        <ThemePicker accents={accents} accentId={accentId} onSelect={onSelectAccent} />
      </S.Section>

      <S.Section>
        <S.SectionTitle>Account</S.SectionTitle>
        <S.FullButton>
          <Button variant="secondary" onClick={onSignOut}>
            <IconSignOut size={16} /> Sign out
          </Button>
        </S.FullButton>
      </S.Section>
    </S.Page>
  );
}
