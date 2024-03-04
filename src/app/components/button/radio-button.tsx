import React, { FC } from "react";

type RadioButtonProps = {
  options: { id: string; label: string; defaultChecked?: boolean }[];
  value?: string;
  name: string;
  onChange?: (value: string) => void;
};

export const RadioButton: FC<RadioButtonProps> = ({
  options,
  value,
  name,
  onChange,
}) => {
  return (
    <div className="flex justify-center">
      {options.map((option, index) => (
        <div
          key={option.id}
          className="flex mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]"
        >
          <input
            aria-label={name}
            className="radio mr-1"
            type="radio"
            name="inlineRadioOptions"
            checked={(index === 0 && !value) || option.id === value}
            onChange={() => onChange && onChange(option.id)}
          />
          <label
            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor={`inlineRadio${index + 1}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
