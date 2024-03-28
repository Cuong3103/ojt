import React, { ChangeEvent, FC, useState } from "react";
import "./input-box.css";

type InputBoxProps = {
  label: string;
  value?: string;
  defaultValue?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean;
};

export const InputBox: FC<InputBoxProps> = ({
  label,
  value,
  defaultValue,
  name,
  onChange,
  error,
  readOnly = false,
}) => {
  return (
    <>
      <div className="inputbox">
        <form className="inputbox__form">
          <input
            type="text"
            placeholder={label}
            aria-label={name}
            className={`input input-bordered w-full max-w-xs ${
              error ? "error" : ""
            }`}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
          {error && <p className={"form-alert"}>{error}</p>}
        </form>
      </div>
    </>
  );
};
