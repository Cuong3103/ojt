import React, { FC, useState } from "react";

type onOffToggleProps = {
  on: string;
  off: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
};

export const OnOffToggle: FC<onOffToggleProps> = ({
  on,
  off,
  value,
  name,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onChange(isChecked ? off : on);
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center p-[0px] border-b-0">
        <input
          type="checkbox"
          aria-label={name}
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
          value={value}
        />
        <div
          className={`slider w-[60px] h-[22px] flex items-center rounded-full py-[2px] duration-200 ${
            isChecked ? "bg-orange-600" : "bg-gray-700"
          }`}
        >
          <span
            className={`dot h-[16px] w-[16px] absolute rounded-full duration-200 ${
              isChecked
                ? "bg-gray-700 translate-x-[42px]"
                : "bg-orange-600 translate-x-[2px]"
            }`}
          ></span>{" "}
          <div
            className={`w-full h-[18px] flex items-center font-medium text-white duration-200 ${
              isChecked ? "justify-start pl-[7px] " : "justify-end pr-[7px]"
            }`}
          >
            <p className="text-[10px]"> {isChecked ? on : off} </p>
          </div>
        </div>
      </label>
    </>
  );
};
