import React, { FC } from "react";

export const Cancel: FC = () => {
  const buttonTextStyle = {
    color: "#E74A3B",
    textDecoration: "underline",
  };

  return (
    <div>
      <button
        className="h-8 text-sm bg-light-blue font-bold"
        style={buttonTextStyle}
      >
        Cancel
      </button>
    </div>
  );
};
