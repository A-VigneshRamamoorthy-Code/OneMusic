import { AlbumArt } from '../AlbumArt';
import { Button } from '../Button';
import type { HeroProps } from './Hero.types';
import * as S from './Hero.style';

export function Hero({ authState, status, onSignIn }: HeroProps) {
  return (
    <S.Section>
      <S.Art aria-hidden="true">
        <AlbumArt seed="onemusic-hero-vinyl" />
      </S.Art>
      <S.Copy>
        <S.Eyebrow>Real music from OneDrive</S.Eyebrow>
        <S.Title>Your music, streamed straight from OneDrive.</S.Title>
        <S.Lead>
          Sign in with Microsoft, point OneMusic at a folder, and play your audio files anywhere — phone or desktop.
        </S.Lead>
        <Button variant="brand" size="lg" onClick={onSignIn}>
          Sign in with Microsoft
        </Button>
        <S.Status $error={authState === 'error'} aria-live="polite">
          {status}
        </S.Status>
      </S.Copy>
    </S.Section>
  );
}
