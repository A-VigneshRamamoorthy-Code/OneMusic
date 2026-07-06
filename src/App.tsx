import { useCallback, useMemo, useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { AppHeader } from './components/AppHeader';
import { Dock } from './components/Dock';
import { Hero } from './components/Hero';
import { Library } from './components/Library';
import { MiniPlayer } from './components/MiniPlayer';
import { NowPlaying } from './components/NowPlaying';
import { SyncCard } from './components/SyncCard';
import { TabBar } from './components/TabBar';
import { useAuth } from './hooks/useAuth';
import { useDownloads } from './hooks/useDownloads';
import { useLibrary } from './hooks/useLibrary';
import { useMediaSession } from './hooks/useMediaSession';
import { useNowPlayingSheet } from './hooks/useNowPlayingSheet';
import { usePlayer } from './hooks/usePlayer';
import type { Track } from './types';
import * as S from './App.style';

export default function App() {
  const [status, setStatus] = useState('Sign in with Microsoft to browse your OneDrive music library.');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  const auth = useAuth({ setStatus, setIsLoading });
  const downloads = useDownloads({ ensureAccessToken: auth.ensureAccessToken, setStatus });
  const library = useLibrary({
    account: auth.account,
    ensureAccessToken: auth.ensureAccessToken,
    setStatus,
    setIsLoading,
    downloadedTracks: downloads.downloadedTracks,
    setActiveTrackId,
  });
  const player = usePlayer({
    ensureAccessToken: auth.ensureAccessToken,
    orderedTracks: library.orderedTracks,
    activeTrackId,
    setActiveTrackId,
    setStatus,
  });
  const sheet = useNowPlayingSheet();

  const activeTrack = useMemo<Track | null>(
    () =>
      library.tracks.find((track) => track.id === activeTrackId) ||
      downloads.downloadedTracks.find((track) => track.id === activeTrackId) ||
      null,
    [activeTrackId, library.tracks, downloads.downloadedTracks],
  );

  useMediaSession({
    activeTrack,
    isPlaying: player.isPlaying,
    playNext: player.playNext,
    playPrevious: player.playPrevious,
    resume: player.resume,
    pause: player.pause,
    seek: player.seek,
  });

  const handleSignOut = useCallback(async () => {
    library.reset();
    player.reset();
    await auth.signOut();
  }, [auth, library, player]);

  const handleHome = useCallback(() => {
    library.setViewMode('songs');
    sheet.close();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [library, sheet]);

  const { account } = auth;
  const hasLibraryContent = library.tracks.length > 0 || downloads.downloadedTracks.length > 0;
  const showDock = Boolean(account) && (Boolean(activeTrack) || hasLibraryContent);

  return (
    <>
      <GlobalStyle />
      <S.AppShell $hasTabbar={Boolean(account) && hasLibraryContent} $hasMini={Boolean(activeTrack)}>
        <AppHeader
          account={account}
          isLoading={isLoading}
          isSyncOpen={library.isSyncOpen}
          onToggleSync={() => library.setSyncOpen((open) => !open)}
          onRefresh={library.refresh}
          onSignOut={handleSignOut}
          onSignIn={auth.signIn}
        />

        <S.Main>
          {!account ? (
            <Hero authState={auth.authState} status={status} onSignIn={auth.signIn} />
          ) : (
            <>
              {library.isSyncOpen ? (
                <SyncCard
                  account={account}
                  folderPath={library.folderPath}
                  isLoading={isLoading}
                  status={status}
                  onFolderPathChange={library.setFolderPath}
                  onSync={library.sync}
                />
              ) : null}
              <Library
                isLoading={isLoading}
                viewMode={library.viewMode}
                onViewModeChange={library.setViewMode}
                tracks={library.tracks}
                visibleTracks={library.visibleTracks}
                albumGroups={library.albumGroups}
                visibleDownloaded={library.visibleDownloaded}
                downloadedTracks={downloads.downloadedTracks}
                folderPath={library.folderPath}
                activeTrackId={activeTrackId}
                isPlaying={player.isPlaying}
                isDownloaded={downloads.isDownloaded}
                isDownloading={downloads.isDownloading}
                onSelect={player.playTrack}
                onDownload={downloads.downloadTrack}
                onRemoveDownload={downloads.removeDownload}
              />
            </>
          )}
        </S.Main>

        {showDock ? (
          <Dock>
            {activeTrack ? (
              <MiniPlayer
                track={activeTrack}
                isPlaying={player.isPlaying}
                progress={player.progress}
                duration={player.duration}
                onOpen={sheet.open}
                onToggle={player.togglePlayback}
                onNext={player.playNext}
              />
            ) : null}
            {hasLibraryContent ? (
              <TabBar searchTerm={library.searchTerm} onSearchChange={library.setSearchTerm} onHome={handleHome} />
            ) : null}
          </Dock>
        ) : null}

        {activeTrack ? (
          <NowPlaying
            track={activeTrack}
            isOpen={sheet.isOpen}
            isDragging={sheet.isDragging}
            dragY={sheet.dragY}
            isPlaying={player.isPlaying}
            progress={player.progress}
            duration={player.duration}
            volume={player.volume}
            isDownloaded={downloads.isDownloaded(activeTrack.id)}
            isDownloading={downloads.isDownloading(activeTrack.id)}
            onClose={sheet.close}
            onSeek={player.seek}
            onToggle={player.togglePlayback}
            onNext={player.playNext}
            onPrevious={player.playPrevious}
            onVolumeChange={player.changeVolume}
            onDownload={() => downloads.downloadTrack(activeTrack)}
            onRemoveDownload={() => downloads.removeDownload(activeTrack)}
            onPointerDown={sheet.handlePointerDown}
            onPointerMove={sheet.handlePointerMove}
            onPointerUp={sheet.handlePointerUp}
          />
        ) : null}

        <audio
          ref={player.audioRef}
          preload="metadata"
          onLoadedMetadata={player.handleTimeUpdate}
          onTimeUpdate={player.handleTimeUpdate}
          onEnded={player.playNext}
          onPause={player.handlePause}
          onPlay={player.handlePlay}
        />
      </S.AppShell>
    </>
  );
}
