import React, { FC } from "react";

export const Button: FC<string> = (title) => {
  return (
    <div>
      <button className="w-20 h-8 text-white bg-main px-6 py-2 font-bold text-sm rounded-xl">
        {title}
      </button>
    </div>
  );
};
