import type { ReactNode } from 'react';
import { AlbumGroup, AlbumGroups } from '../AlbumGroup';
import { Placeholder } from '../Placeholder';
import { ScanBanner, TrackList, TrackRow } from '../TrackRow';
import { ViewSwitch } from '../ViewSwitch';
import { folderLabel } from '../../utils/tracks';
import type { Track } from '../../types';
import type { LibraryProps } from './Library.types';
import * as S from './Library.style';

export function Library({
  isLoading,
  viewMode,
  onViewModeChange,
  tracks,
  visibleTracks,
  albumGroups,
  visibleDownloaded,
  downloadedTracks,
  folderPath,
  activeTrackId,
  isPlaying,
  isDownloaded,
  isDownloading,
  onSelect,
  onDownload,
  onRemoveDownload,
}: LibraryProps) {
  const renderRow = (track: Track, index: number) => (
    <TrackRow
      key={track.id}
      track={track}
      index={index}
      isActive={activeTrackId === track.id}
      isPlaying={isPlaying}
      isDownloaded={isDownloaded(track.id)}
      isDownloading={isDownloading(track.id)}
      onSelect={onSelect}
      onDownload={onDownload}
      onRemoveDownload={onRemoveDownload}
    />
  );

  const scanBanner = <>Still scanning {folderLabel(folderPath)} — tap any track to play now.</>;
  const emptyMessage = <>No tracks yet. Enter a folder under “My files” and hit Sync.</>;
  const scanningMessage = <>Scanning {folderLabel(folderPath)} for audio files…</>;
  const hasLibrary = tracks.length > 0 || downloadedTracks.length > 0;

  const title = isLoading
    ? 'Scanning…'
    : viewMode === 'downloaded'
      ? 'Offline'
      : tracks.length
        ? `${tracks.length} track${tracks.length === 1 ? '' : 's'}`
        : 'Your library';

  let content: ReactNode;
  if (viewMode === 'downloaded') {
    content =
      visibleDownloaded.length > 0 ? (
        <TrackList>{visibleDownloaded.map(renderRow)}</TrackList>
      ) : (
        <Placeholder artSeed="offline-empty">
          No downloaded music yet. Tap the download icon on any track to save it for offline — it stays available after
          you close the tab.
        </Placeholder>
      );
  } else if (viewMode === 'albums') {
    content =
      albumGroups.length > 0 ? (
        <AlbumGroups>
          {isLoading ? <ScanBanner>{scanBanner}</ScanBanner> : null}
          {albumGroups.map((group) => (
            <AlbumGroup key={group.album} album={group.album} count={group.tracks.length} artSeed={group.tracks[0].id}>
              {group.tracks.map(renderRow)}
            </AlbumGroup>
          ))}
        </AlbumGroups>
      ) : isLoading ? (
        <Placeholder spinner>{scanningMessage}</Placeholder>
      ) : (
        <Placeholder artSeed="empty-state">{emptyMessage}</Placeholder>
      );
  } else {
    content =
      visibleTracks.length > 0 ? (
        <TrackList>
          {isLoading ? <ScanBanner as="li">{scanBanner}</ScanBanner> : null}
          {visibleTracks.map(renderRow)}
        </TrackList>
      ) : isLoading ? (
        <Placeholder spinner>{scanningMessage}</Placeholder>
      ) : (
        <Placeholder artSeed="empty-state">{emptyMessage}</Placeholder>
      );
  }

  return (
    <S.Section>
      <S.Head>
        <S.Title>{title}</S.Title>
      </S.Head>
      {hasLibrary ? (
        <ViewSwitch viewMode={viewMode} downloadedCount={downloadedTracks.length} onChange={onViewModeChange} />
      ) : null}
      {content}
    </S.Section>
  );
}
