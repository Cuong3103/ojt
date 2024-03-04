import React, { ChangeEvent, FC, useState } from "react";
import "./input-box.css";

type InputBoxProps = {
  label: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export const InputBox: FC<InputBoxProps> = ({
  label,
  value,
  name,
  onChange,
  error,
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
            value={value}
            onChange={onChange}
          />
          {error && <p className={"form-alert"}>{error}</p>}
        </form>
      </div>
    </>
  );
};
