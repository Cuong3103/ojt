import React from "react";

const CheckboxImport = ({ id, label, checked, onChange }) => {
  return (
    <>
      <div className="custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <label className="label" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default CheckboxImport;
