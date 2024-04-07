import React, { FC } from "react";

type RadioButtonProps = {
  name: string;
  options: { id: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
};

export const RadioButton: FC<RadioButtonProps> = ({
  options,
  value,
  name,
  onChange,
}) => {
  const handleChange = (optionId: string) => {
    const selectedOption = options.find((option) => option.id === optionId);
    if (selectedOption && onChange) {
      onChange(selectedOption.id);
    }
  };

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
            checked={value === option.id}
            onChange={() => handleChange(option.id)}
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
