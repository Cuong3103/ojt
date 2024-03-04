import React, { FC } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Cancel } from "../button/cancel";
import { Button } from "../button/button";

type ModalType = {
  title: string;
  fields: { id: string; label: string; component: JSX.Element }[];
  buttonTitle: string;
  showModal?: () => void;
  handleSubmit?: () => void;
};

export const Modal: FC<ModalType> = ({
  title,
  fields,
  buttonTitle,
  showModal,
  handleSubmit,
}) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
        onClick={showModal}
      />
      <div className="bg-gray-100 rounded-lg max-w-md fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 shadow-lg">
        <h2 className="flex items-center justify-between text-xl bg-[#2D3748] text-white p-2 rounded-t">
          {title}
          <button onClick={showModal}>
            <IoMdCloseCircleOutline />
          </button>
        </h2>

        <div className="p-6">
          {fields.map((field) => (
            <div key={field.id} className="grid grid-cols-2 gap-4 pb-5">
              <div className="items-center">{field.label}</div>
              {field.component}
            </div>
          ))}

          <div className="flex justify-center space-x-4">
            <Button title={buttonTitle} handleClick={handleSubmit} />
            <Cancel onClick={showModal} />
          </div>
        </div>
      </div>
    </>
  );
};
