"use client";

import { Menu } from "./Menu";
import { MenuItem, menuItems } from "./menu-items.config";

export const MenuList = ({ openSidebar }: { openSidebar: boolean }) => {
  return (
    <section className={`${openSidebar ? "mt-20" : "mt-60"} flex flex-col`}>
      {menuItems.map((item, index) => (
        <Menu key={index} index={index} item={item} openSidebar={openSidebar} />
      ))}
    </section>
  );
};
