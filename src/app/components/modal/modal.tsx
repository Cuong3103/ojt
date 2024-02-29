"use client";
import React, { FC, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { InputBox } from "../input-box/input-box";
import { SearchInput } from "../input-box/search-input";
import { Cancel } from "../button/cancel";
import { Button } from "../button/button";
import { Dropdown } from "../dropdown/dropdown";

type ModalType = {
  title: string;
};

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Modal: FC<ModalType> = ({ title }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="bg-gray-100 rounded-lg max-w-md max-h-[50vh] ">
      <h2 className="flex items-center justify-between text-xl bg-[#2D3748] text-white p-2 rounded-t">
        {title}
        <IoMdCloseCircleOutline />
      </h2>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 pb-5 ">
          <div className="flex items-center">Name</div>
          <InputBox label="Name of content..." />
        </div>
        <div className="grid grid-cols-2 gap-4 pb-5 ">
          <div className="items-center">Output standard</div>
          <SearchInput />
        </div>
        <div className="grid grid-cols-2 gap-4 pb-5">
          <div className="items-center">Training time</div>
          <InputBox label="Minutes" />
        </div>
        <div className="grid grid-cols-2 gap-4 pb-5">
          <div className="items-center">Method</div>
          {/* <Toggle /> */}
        </div>
        <div className="grid grid-cols-2 gap-4 pb-5">
          <div className="items-center">Delivery type</div>
          <Dropdown
            value={selectedOption}
            options={options}
            onChange={handleDropdownChange}
            placeholder="Select an option"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button title="Create" />
          <Cancel />
        </div>
      </div>
    </div>
  );
};
