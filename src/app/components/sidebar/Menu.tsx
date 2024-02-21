"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { MdOutlineFilterNone } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MenuItemProps } from "@/types/menu-item-props.type";
import { MenuItem, SubmenuItem } from "@/types/menu.type";
import { redirect } from "next/navigation";

export const Menu: FC<MenuItemProps> = ({ index, item, openSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const handleMenuButtonOnClick = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const renderSubmenu = () => {
    return (
      <span className="transition-[height] duration-1000 ease-out flex flex-col">
        {openSidebar &&
          item.submenu &&
          openSubmenu &&
          item.submenuItems?.map((submenu: SubmenuItem, index: number) => (
            <Link
              href={submenu.path}
              key={index}
              className="bg-secondary-sidebar rounded-full hover:bg-blue-400 px-10 py-2"
            >
              {submenu.title}
            </Link>
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
              <Link href={submenu.path}>{submenu.title}</Link>
            </li>
          ))}
      </ul>
    );
  };

  const renderButtonMenu = () => (
    <button
      className={`btn bg-transparent hover:rounded-full cursor-pointer ${
        openSidebar ? "w-64" : "dropdown dropdown-right"
      }`}
      onClick={() => handleMenuButtonOnClick()}
    >
      {openSubmenu && item.submenu && renderTooltip(item)}
      <span className="text-2xl cursor-pointer">
        {item.icon ? item.icon({}) : <MdOutlineFilterNone />}
      </span>
      <span
        className={`flex-1 text-md duration-750 ${!openSidebar && "hidden"}`}
      >
        {item.title}
      </span>
      {openSidebar && item.submenu && (
        <>
          <span className="text-md cursor-pointer">
            <RiArrowDropDownLine className={`${openSubmenu && "rotate-180"}`} />
          </span>
        </>
      )}
    </button>
  );

  const renderConditionallyWrapperBasedOnItem = (item: MenuItem) => {
    if (item.submenu || !item.path) {
      return renderButtonMenu();
    } else if (item.path) {
      return <Link href={item.path}>{renderButtonMenu()}</Link>;
    }
  };

  return (
    <>
      <div
        key={index}
        className="flex m-auto justify-start items-center gap-x-4 rounded-md h-14"
      >
        {renderConditionallyWrapperBasedOnItem(item)}
      </div>
      {renderSubmenu()}
    </>
  );
};
