"use client";

import React, { ChangeEvent, MouseEvent, useState } from "react";

interface Props {
  value?: string;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  // onClick?: (event: MouseEvent) => void;
  placeholder: string;
  [key: string]: any;
}

const SearchBar = ({value, placeholder, ...restProps}: Props) => {
    const [input, setInput] = useState(value);

    const _onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target.value || "";
      setInput(value);
    };

    console.log("onChange",value);

    const _onClicked = (event: MouseEvent) => {
        event.preventDefault();
        setInput(input);
    };

  return (
    <>
      <div className={"search relative"}>
        <label className={"search__bar flex items-center"}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"search__bar-icon absolute ml-1"}
          >
            <g id="search" clip-path="url(#clip0_184_16914)">
              <path
                id="Vector"
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#285D9A"
              />
            </g>
            <defs>
              <clipPath id="clip0_184_16914">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            type="search"
            placeholder={placeholder}
            className="input input-bordered outline-none focus:outline-none pl-8 w-full h-[35px] flex-1 text-black box-border placeholder:italic placeholder:text-slate-400 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            value={input}
            onChange={_onInputChange}
            {...restProps}
          />
        </label>
      </div>
    </>
  );
};

export default SearchBar;
