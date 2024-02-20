"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { MdOutlineFilterNone } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MenuItemProps } from "@/types/menu-item-props.type";
import { MenuItem, SubmenuItem } from "@/types/menu.type";

export const Menu: FC<MenuItemProps> = ({ index, item, openSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const renderSubmenu = () => {
    return (
      <span className="transition-[height] duration-1000 ease-out flex flex-col">
        {openSidebar &&
          item.submenu &&
          openSubmenu &&
          item.submenuItems?.map((submenu: SubmenuItem, index: number) => (
            <span
              key={index}
              className="cursor-pointer bg-secondary-sidebar rounded-full hover:bg-blue-400 px-10 py-2"
            >
              <Link href={submenu.path}>{submenu.title}</Link>
            </span>
          ))}
      </span>
    );
  };

  const renderTooltip = (menuItem: MenuItem) => {
    return (
      <ul
        tabIndex={0}
        className={`${
          openSidebar && "hidden"
        } dropdown-content z-[1] menu p-2 ml-10 shadow bg-base-100 rounded-box w-52`}
      >
        {menuItem.submenuItems &&
          menuItem.submenuItems?.map((submenu, index) => (
            <li key={index}>
              <button>{submenu.title}</button>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <>
      <div
        key={index}
        className="flex m-auto justify-start  items-center gap-x-4 rounded-md h-14"
      >
        <button
          className={`btn bg-transparent hover:rounded-full cursor-pointer ${
            openSidebar ? "w-64" : "dropdown dropdown-right"
          }`}
          onClick={() => setOpenSubmenu(!openSubmenu)}
        >
          {openSubmenu && item.submenu && renderTooltip(item)}
          <span className="text-2xl cursor-pointer">
            {item.icon ? item.icon({}) : <MdOutlineFilterNone />}
          </span>
          <span
            className={`flex-1 text-md duration-750 ${
              !openSidebar && "hidden"
            }`}
          >
            {item.title}
          </span>

          {openSidebar && item.submenu && (
            <>
              <span className="text-md cursor-pointer">
                <RiArrowDropDownLine
                  className={`${openSubmenu && "rotate-180"}`}
                />
              </span>
            </>
          )}
        </button>
      </div>
      {renderSubmenu()}
    </>
  );
};
