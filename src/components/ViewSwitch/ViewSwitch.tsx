import { IconAlbum, IconDownload, IconList } from '../Icon';
import type { ViewSwitchProps } from './ViewSwitch.types';
import * as S from './ViewSwitch.style';

export function ViewSwitch({ viewMode, downloadedCount, onChange }: ViewSwitchProps) {
  return (
    <S.Switch role="tablist" aria-label="Library views">
      <S.Tab role="tab" type="button" aria-selected={viewMode === 'songs'} $active={viewMode === 'songs'} onClick={() => onChange('songs')}>
        <IconList size={16} />
        <span>Songs</span>
      </S.Tab>
      <S.Tab role="tab" type="button" aria-selected={viewMode === 'albums'} $active={viewMode === 'albums'} onClick={() => onChange('albums')}>
        <IconAlbum size={16} />
        <span>Albums</span>
      </S.Tab>
      <S.Tab role="tab" type="button" aria-selected={viewMode === 'downloaded'} $active={viewMode === 'downloaded'} onClick={() => onChange('downloaded')}>
        <IconDownload size={16} />
        <span>Offline{downloadedCount ? ` · ${downloadedCount}` : ''}</span>
      </S.Tab>
    </S.Switch>
  );
}
