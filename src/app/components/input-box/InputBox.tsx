"use client";
import { forwardRef, useState } from "react";
import { ChangeEvent } from "react";
import { KeyboardEvent } from "react";
import "./inputbox.css";

interface Props {
  value?: string;
  className: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

function InputBox(
  { value, className, onChange, onKeyDown, placeholder, ...restProps }: Props,
  ref: any
) {
  return (
    <>
      <div className={"inputbox max-w-xs"}>
        <label className={"inputbox__form"}>
          <input
            type="text"
            placeholder={placeholder}
            className={`input input-bordered w-full h-full text-black placeholder:italic placeholder:text-slate-700 ${className}`}
            onChange={onChange}
            value={value}
            ref={ref}
            {...restProps}
          />
        </label>
      </div>
    </>
  );
}

export default forwardRef(InputBox);
