export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconActive?: string;
  action: (element: HTMLElement | null) => void;
  order: number;
}
