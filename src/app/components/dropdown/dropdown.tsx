import React, { FC } from "react";

import { Option, DropdownProps } from "@/types/dropdown.type";
import "./dropdown.css";

export const Dropdown: FC<DropdownProps> = ({
  id,
  value,
  options,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <form>
      <select
        className={` w-44 max-w-lg ${error ? "error" : ""}`}
        id={id}
        value={value}
        onChange={onChange}
      >
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
      {error && <p className="text-red-600 text-xs italic">{error}</p>}
    </form>
  );
};
