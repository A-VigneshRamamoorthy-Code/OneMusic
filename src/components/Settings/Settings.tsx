import { useEffect } from 'react';
import { Button } from '../Button';
import { IconClose, IconRefresh, IconSignOut } from '../Icon';
import { SyncCard } from '../SyncCard';
import { ThemePicker } from '../ThemePicker';
import type { SettingsProps } from './Settings.types';
import * as S from './Settings.style';

/** Slide-up settings sheet: folder sync, refresh, accent theme and sign out. */
export function Settings({
  isOpen,
  onClose,
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
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <S.Container $open={isOpen} role="dialog" aria-modal="true" aria-label="Settings" aria-hidden={!isOpen}>
      <S.Backdrop $open={isOpen} onClick={onClose} />
      <S.Sheet $open={isOpen}>
        <S.Header>
          <S.Title>Settings</S.Title>
          <S.Close type="button" onClick={onClose} aria-label="Close settings">
            <IconClose size={20} />
          </S.Close>
        </S.Header>

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
      </S.Sheet>
    </S.Container>
  );
}
