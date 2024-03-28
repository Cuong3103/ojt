import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Option } from "@/types/dropdown.type";
import { UpdateUserModal } from "../user-modal/update-user-modal";

type PopupMenuProps = {
  options: Option[];
  data?: any;
  setData: Dispatch<SetStateAction<any>>;
};

export const PopupMenu: FC<PopupMenuProps> = ({ options, data, setData }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleOpenPopup = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  return (
    <>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 absolute mt-2 m-4">
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
    </>
  );
};
