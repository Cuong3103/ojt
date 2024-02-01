import React from "react";

const Cancel = () => {
  const buttonTextStyle = {
    color: "#E74A3B",
    textDecoration: "underline", // Set text-decoration to create an underline
    // Add any additional styles as needed
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

export default Cancel;
