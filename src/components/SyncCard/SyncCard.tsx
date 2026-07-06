import type { KeyboardEvent } from 'react';
import { Button } from '../Button';
import type { SyncCardProps } from './SyncCard.types';
import * as S from './SyncCard.style';

export function SyncCard({ account, folderPath, isLoading, status, onFolderPathChange, onSync }: SyncCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSync();
    }
  };

  return (
    <S.Card aria-live="polite">
      <S.Head>
        <S.Eyebrow>Folder to sync</S.Eyebrow>
        <S.AccountChip title={account.username}>{account.username}</S.AccountChip>
      </S.Head>
      <S.Row>
        <S.Field>
          <S.Prefix>My files /</S.Prefix>
          <S.Input
            type="text"
            value={folderPath}
            placeholder="Music/Melody"
            aria-label="Folder path under My files"
            onChange={(event) => onFolderPathChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </S.Field>
        <Button variant="brand" onClick={onSync} disabled={isLoading}>
          {isLoading ? 'Syncing…' : 'Sync'}
        </Button>
      </S.Row>
      <S.Hint>{status}</S.Hint>
    </S.Card>
  );
}
