import { FC } from "react";
import "./input-box.css";

type label = {
  label: string;
};

export const InputBox: FC<label> = ({ label }) => {
  return (
    <>
      <div className={"inputbox"}>
        <form className={"inputbox__form"}>
          <input
            type="text"
            placeholder={label}
            className="input input-bordered w-full max-w-xs"
          />
          <div className={"form-alert"}>This field is required</div>
        </form>
      </div>
    </>
  );
};
