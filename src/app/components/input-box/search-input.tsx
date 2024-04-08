import { FC } from "react";

type InputSearchProps = {
  onKeyDown?: (x: any) => void;
  onChange?: (x: any) => void;
};

export const InputSearch: FC<InputSearchProps> = (props) => {
  return (
    <label className="relative " htmlFor={"input-search"}>
      <input
        id={"input-search"}
        type="text"
        className="relative ml-4 border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md py-2 px-4 pr-10 placeholder-gray-500 text-gray-900 focus:outline-none"
        placeholder="Search"
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};
