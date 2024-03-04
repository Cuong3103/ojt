import React, { FC } from "react";

type Cancel = {
  onClick?: () => void;
};

export const Cancel: FC<Cancel> = ({ onClick }) => {
  const buttonTextStyle = {
    color: "#E74A3B",
    textDecoration: "underline",
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="h-8 text-sm bg-light-blue font-bold"
        style={buttonTextStyle}
      >
        Cancel
      </button>
    </div>
  );
};
