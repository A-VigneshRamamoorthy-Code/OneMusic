import { IconHome, IconSearch, IconSettings } from '../Icon';
import type { TabBarProps } from './TabBar.types';
import * as S from './TabBar.style';

/** Floating bottom bar: Home, library search, and Settings. */
export function TabBar({ searchTerm, onSearchChange, onHome, onOpenSettings }: TabBarProps) {
  return (
    <S.Bar>
      <S.RoundButton type="button" onClick={onHome} aria-label="Home">
        <IconHome size={20} />
      </S.RoundButton>
      <S.Search>
        <S.SearchIcon aria-hidden="true">
          <IconSearch size={18} />
        </S.SearchIcon>
        <S.Input
          type="search"
          value={searchTerm}
          placeholder="Songs, artists, albums…"
          aria-label="Search your library"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </S.Search>
      <S.RoundButton type="button" onClick={onOpenSettings} aria-label="Settings">
        <IconSettings size={20} />
      </S.RoundButton>
    </S.Bar>
  );
}
