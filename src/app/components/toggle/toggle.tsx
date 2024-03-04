import React, { FC, useState } from "react";

type ToggleProps = {
  on: string;
  off: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
};

export const Toggle: FC<ToggleProps> = ({ on, off, value, name, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(isChecked ? off : on);
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          aria-label={name}
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
          value={value}
        />
        <span
          className={`slider mr-3 flex h-[24px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-orange-600" : "bg-gray-700"
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full duration-200 ${
              isChecked ? "bg-gray-700 translate-x-6" : "bg-orange-600"
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium text-black">
          <span className="pl-1"> {isChecked ? on : off} </span>
        </span>
      </label>
    </>
  );
};
