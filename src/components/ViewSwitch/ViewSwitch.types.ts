import type { ViewMode } from '../../types';

export interface ViewSwitchProps {
  viewMode: ViewMode;
  downloadedCount: number;
  onChange: (mode: ViewMode) => void;
}
