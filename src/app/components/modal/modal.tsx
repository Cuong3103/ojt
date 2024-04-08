import React, { FC } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../button/button";
import { Cancel } from "../button/cancel";

type ModalType = {
  title: string;
  fields: { id: string; label?: string; component: JSX.Element }[];
  buttonTitle: string;
  showModal?: () => void;
  handleSubmit?: () => void;
};

export const Modal: FC<ModalType> = ({ title, fields, buttonTitle, showModal, handleSubmit }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={showModal} />
      <div className="bg-gray-100 rounded-lg max-w-md fixed items-center top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[100] shadow-lg">
        <div className="flex items-center justify-between bg-[#2D3748] text-white px-4 h-[44px]">
          <h2 className="text-xl rounded-t text-center">{title}</h2>
          <button onClick={showModal} className="w-6 h-6">
            <IoMdCloseCircleOutline className="w-full h-full" />
          </button>
        </div>
        <div className="p-6">
          {fields.map((field) => (
            <>
              <div key={field.id} className="grid grid-cols-2 gap-4 pb-5">
                {field.label && <div className="items-center">{field.label}</div>}
                {field.component}
              </div>
            </>
          ))}

          <div className="flex items-center justify-center space-x-4">
            <Button title={buttonTitle} onClick={handleSubmit} className="h-full btn bg-primary-color text-white" />
            <Cancel onClick={showModal} />
          </div>
        </div>
      </div>
    </>
  );
};
