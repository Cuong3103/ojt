import React, { FC } from "react";
import { ReactNode } from "react";

type ButtonProps = {
  title: string;
  icon?: ReactNode;
  handleClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ title, icon, handleClick }) => {
  return (
    <div>
      <button
        className="flex items-center min-w-20 h-8 text-white bg-primary-color px-6 py-2 font-bold text-sm rounded-xl"
        onClick={handleClick}
      >
        {icon && <div className="mr-2">{icon}</div>}
        {title}
      </button>
    </div>
  );
};
