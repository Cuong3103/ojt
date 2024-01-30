export type SubmenuItem = {
  title: string;
};

export type MenuItem = {
  title: string;
  icon?: IconType;
  submenu?: boolean;
  submenuItems?: SubmenuItem[];
};