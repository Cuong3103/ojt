"use client";
import { forwardRef, useState } from "react";
import { ChangeEvent } from "react";
import { KeyboardEvent } from "react";
import "./inputbox.css";

interface Props {
  value?: string;
  className: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  [key: string]: any;
}

function InputBox({ value, className, onChange, onKeyDown, placeholder, ...restProps }: Props, ref: any) {
  const [input, setInput] = useState(value);

  // Check user enter key in input box
  const _onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value || "";
    setInput(value);
  };


  const _onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput(""); // Clear input box after pressing Enter key
    }
  };


  return (
    <>
      <div className={"inputbox max-w-xs"}>
        <label className={"inputbox__form"}>
          <input
            type="text"
            placeholder={placeholder}
            className={`input input-bordered w-full h-full text-black placeholder:italic placeholder:text-slate-700 ${className}`}
            onChange={_onInputChange}
            onKeyDown={_onKeyDown}
            value={input}
            ref={ref}
            {...restProps}
          />
        </label>
      </div>
    </>
  );
}

export default forwardRef(InputBox);
