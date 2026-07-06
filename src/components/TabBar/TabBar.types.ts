import type { DockTab, ViewMode } from '../../types';

export interface TabBarProps {
  hasLibraryContent: boolean;
  activeTab: DockTab;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenSettings: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onHome: () => void;
}
