import React, { FC } from "react";

import { Option, DropdownProps } from "@/types/dropdown.type";
import "./dropdown.css";

export const Dropdown: FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder,
}) => {
  return (
    <select value={value} onChange={onChange}>
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
