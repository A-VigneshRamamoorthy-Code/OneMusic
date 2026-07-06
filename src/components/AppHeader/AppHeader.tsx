import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { IconFolder, IconMusic, IconRefresh, IconSignOut } from '../Icon';
import type { AppHeaderProps } from './AppHeader.types';
import * as S from './AppHeader.style';

export function AppHeader({
  account,
  isLoading,
  isSyncOpen,
  onToggleSync,
  onRefresh,
  onSignOut,
  onSignIn,
}: AppHeaderProps) {
  return (
    <S.Header>
      <S.Brand>
        <S.Mark aria-hidden="true">
          <IconMusic size={22} />
        </S.Mark>
        <S.BrandText>
          <S.Eyebrow>Microsoft OneDrive</S.Eyebrow>
          <S.Title>OneMusic</S.Title>
        </S.BrandText>
      </S.Brand>
      <S.Actions>
        {account ? (
          <>
            <IconButton tone="header" onClick={onToggleSync} aria-pressed={isSyncOpen} aria-label="Folder to sync" title="Folder to sync">
              <IconFolder size={18} />
            </IconButton>
            <IconButton tone="header" onClick={onRefresh} disabled={isLoading} spinning={isLoading} aria-label="Refresh library" title="Refresh library">
              <IconRefresh size={18} />
            </IconButton>
            <IconButton tone="header" onClick={onSignOut} aria-label="Sign out" title="Sign out">
              <IconSignOut size={18} />
            </IconButton>
          </>
        ) : (
          <Button variant="brand" onClick={onSignIn}>
            Sign in
          </Button>
        )}
      </S.Actions>
    </S.Header>
  );
}
