export type SubmenuItem = {
  title: string;
  path: Url;
};

export type MenuItem = {
  title: string;
  icon?: IconType;
  submenu?: boolean;
  submenuItems?: SubmenuItem[];
};
