import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Option } from "@/types/dropdown.type";
import { SubPopupMenu } from "./sub-menu-popup";

type PopupMenuProps = {
  options: Option[];
  title?: string;
  openSubMenu?: boolean;
  onSubMenuItemClick?: (value: any) => void;
};

export const PopupMenu: FC<PopupMenuProps> = ({
  options,
  title = "",
  openSubMenu,
  onSubMenuItemClick,
}) => {
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleOpenPopup = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  return (
    <div className="z-[1000] p-2 shadow menu dropdown-content z-[1] border-[1px] border-solid border-black bg-base-100 rounded-box w-52 absolute right-0">
      <h3>{title}</h3>
      <ul>
        {options.map((option: Option, index: number) => (
          <li key={index} className="flex">
            <a onClick={option.onClick}>
              {option.icon}
              {option.label}
            </a>
            {openSubMenu && option.subOption && (
              <SubPopupMenu
                subOptions={option.subOption}
                onSubMenuItemClick={onSubMenuItemClick}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
