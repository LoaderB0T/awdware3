export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  action: () => void;
  order: number;
}
