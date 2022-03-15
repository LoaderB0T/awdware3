export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconActive?: string;
  action: () => void;
  order: number;
}
