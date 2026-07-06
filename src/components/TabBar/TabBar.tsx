import { useRef } from 'react';
import { IconHome, IconMic, IconSearch } from '../Icon';
import type { TabBarProps } from './TabBar.types';
import * as S from './TabBar.style';

/** Floating bottom bar: Home, library search, and a mic that focuses the search. */
export function TabBar({ searchTerm, onSearchChange, onHome }: TabBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusSearch = () => {
    inputRef.current?.focus();
  };

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
          ref={inputRef}
          type="search"
          value={searchTerm}
          placeholder="Songs, artists, albums…"
          aria-label="Search your library"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </S.Search>
      <S.RoundButton type="button" onClick={focusSearch} aria-label="Search by voice">
        <IconMic size={20} />
      </S.RoundButton>
    </S.Bar>
  );
}
