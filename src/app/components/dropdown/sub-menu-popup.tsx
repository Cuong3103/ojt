import React, { FC } from "react";
import { Option } from "@/types/dropdown.type";

type PopupMenuProps = {
  subOptions: Option[];
  onSubMenuItemClick?: (value: any) => void;
};

export const SubPopupMenu: FC<PopupMenuProps> = ({
  subOptions,
  onSubMenuItemClick,
}) => {
  return (
    <>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 absolute mt-2 m-4">
        {subOptions.map((subOption: Option, index: number) => (
          <li key={index} className="flex">
            <a
              onClick={() =>
                onSubMenuItemClick && onSubMenuItemClick(subOption.value)
              }
            >
              {subOption.icon}
              {subOption.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
