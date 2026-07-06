export interface TabBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onHome: () => void;
  onOpenSettings: () => void;
}
