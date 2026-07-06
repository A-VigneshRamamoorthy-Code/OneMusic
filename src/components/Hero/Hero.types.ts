import type { AuthState } from '../../types';

export interface HeroProps {
  authState: AuthState;
  status: string;
  onSignIn: () => void;
}
