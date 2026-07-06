import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { IconAlbum, IconClose, IconDownload, IconHome, IconSearch, IconSettings } from '../Icon';
import type { DockTab } from '../../types';
import type { TabBarProps } from './TabBar.types';
import * as S from './TabBar.style';

/**
 * Floating dock of equally sized, evenly spaced icons: Home (the songs/library view),
 * Albums, Offline, Settings and Search. A highlight pill slides to the active tab
 * (including the Settings page). Tapping Search swaps the icons for a search field.
 */
export function TabBar({
  hasLibraryContent,
  activeTab,
  onViewModeChange,
  onOpenSettings,
  searchTerm,
  onSearchChange,
  onHome,
}: TabBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Partial<Record<DockTab, HTMLButtonElement | null>>>({});

  const openSearch = () => {
    setIsSearchOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    if (searchTerm) {
      onSearchChange('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      closeSearch();
    }
  };

  // Position the sliding pill imperatively so switching tabs animates reliably (setting
  // the element's own transform/width lets the CSS transition run without a React churn).
  const positionIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const button = tabRefs.current[activeTab];
    if (!indicator || !button) {
      return;
    }
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.transform = `translateX(${button.offsetLeft}px)`;
    indicator.style.opacity = '1';
  }, [activeTab]);

  useLayoutEffect(() => {
    positionIndicator();
  }, [positionIndicator, hasLibraryContent, isSearchOpen]);

  useEffect(() => {
    window.addEventListener('resize', positionIndicator);
    return () => window.removeEventListener('resize', positionIndicator);
  }, [positionIndicator]);

  if (isSearchOpen) {
    return (
      <S.Bar>
        <S.IconBtn type="button" $fixed onClick={onHome} aria-label="Home">
          <IconHome size={26} />
        </S.IconBtn>
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
            onKeyDown={handleKeyDown}
          />
        </S.Search>
        <S.IconBtn type="button" $fixed onClick={closeSearch} aria-label="Close search">
          <IconClose size={26} />
        </S.IconBtn>
      </S.Bar>
    );
  }

  return (
    <S.Bar>
      <S.Indicator ref={indicatorRef} aria-hidden="true" />

      <S.IconBtn
        ref={(element) => {
          tabRefs.current.songs = element;
        }}
        type="button"
        $active={activeTab === 'songs'}
        aria-label="Home"
        aria-pressed={activeTab === 'songs'}
        onClick={onHome}
      >
        <IconHome size={26} />
      </S.IconBtn>

      {hasLibraryContent ? (
        <>
          <S.IconBtn
            ref={(element) => {
              tabRefs.current.albums = element;
            }}
            type="button"
            $active={activeTab === 'albums'}
            aria-label="Albums"
            aria-pressed={activeTab === 'albums'}
            onClick={() => onViewModeChange('albums')}
          >
            <IconAlbum size={26} />
          </S.IconBtn>
          <S.IconBtn
            ref={(element) => {
              tabRefs.current.downloaded = element;
            }}
            type="button"
            $active={activeTab === 'downloaded'}
            aria-label="Offline"
            aria-pressed={activeTab === 'downloaded'}
            onClick={() => onViewModeChange('downloaded')}
          >
            <IconDownload size={26} />
          </S.IconBtn>
        </>
      ) : null}

      <S.IconBtn
        ref={(element) => {
          tabRefs.current.settings = element;
        }}
        type="button"
        $active={activeTab === 'settings'}
        aria-label="Settings"
        aria-pressed={activeTab === 'settings'}
        onClick={onOpenSettings}
      >
        <IconSettings size={26} />
      </S.IconBtn>

      {hasLibraryContent ? (
        <S.IconBtn type="button" onClick={openSearch} aria-label="Search">
          <IconSearch size={26} />
        </S.IconBtn>
      ) : null}
    </S.Bar>
  );
}
