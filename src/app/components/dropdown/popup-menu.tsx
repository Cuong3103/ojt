import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Option } from "@/types/dropdown.type";
import { UpdateUserModal } from "../user-modal/update-user-modal";

type PopupMenuProps = {
  options: Option[];
  data?: any;
  setData: Dispatch<SetStateAction<any>>;
  title: string;
};

export const PopupMenu: FC<PopupMenuProps> = ({ options, title = "", data, setData }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleOpenPopup = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  return (
    <div className="p-2 shadow menu dropdown-content z-[1] border-[1px] border-solid border-black bg-base-100 rounded-box w-52 absolute right-0">
      <h3>{title}</h3>
      <ul>
        {options.map((option: Option, index: number) => (
          <li key={index} className="flex">
            <a
              onClick={
                option.label === "Edit user" ? handleOpenPopup : undefined
              }
            >
              {option.icon}
              {option.label}
            </a>
          </li>
        ))}
      </ul>
      {showUpdateModal && data && (
        <UpdateUserModal
          userUUID={data.uuid}
          showUpdateModal={() => setShowUpdateModal(false)}
          setData={setData}
        />
      )}
    </div>
  );
};
