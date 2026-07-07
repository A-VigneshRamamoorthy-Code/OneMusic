import { memo } from 'react';
import { AlbumArt } from '../AlbumArt';
import { IconButton } from '../IconButton';
import { IconCheck, IconDownload, IconPlay, IconSpinner } from '../Icon';
import type { TrackRowProps } from './TrackRow.types';
import * as S from './TrackRow.style';

function TrackRowInner({
  track,
  index,
  isActive,
  isActivePlaying,
  isDownloaded,
  isDownloading,
  onSelect,
  onDownload,
  onRemoveDownload,
}: TrackRowProps) {
  return (
    <S.Row $active={isActive} $row={index % 12}>
      <S.Main type="button" onClick={() => onSelect(track)}>
        <S.ArtWrap>
          <AlbumArt seed={track.id} playing={isActivePlaying} />
          <S.Overlay aria-hidden="true">
            {isActivePlaying ? (
              <S.Eq>
                <i />
                <i />
                <i />
              </S.Eq>
            ) : (
              <S.Play>
                <IconPlay size={18} />
              </S.Play>
            )}
          </S.Overlay>
        </S.ArtWrap>
        <S.Meta>
          <S.Title>{track.title}</S.Title>
          <S.Sub>
            {track.artist} • {track.album}
          </S.Sub>
        </S.Meta>
      </S.Main>
      <S.Actions>
        {isDownloaded ? (
          <IconButton tone="track" size="sm" active onClick={() => onRemoveDownload(track)} aria-label="Remove download" title="Saved offline — tap to remove">
            <IconCheck size={16} />
          </IconButton>
        ) : isDownloading ? (
          <IconButton tone="track" size="sm" spinning disabled aria-label="Downloading" title="Downloading…">
            <IconSpinner size={16} />
          </IconButton>
        ) : (
          <IconButton tone="track" size="sm" onClick={() => onDownload(track)} aria-label="Download for offline" title="Download for offline">
            <IconDownload size={16} />
          </IconButton>
        )}
      </S.Actions>
    </S.Row>
  );
}

export const TrackRow = memo(TrackRowInner);
