import { FC } from "react";
import "./toggle.css";

export const Toggle: FC = () => {
  return (
    <label className="switch">
      <input type="checkbox" className="hidden" />
      <span className="slider"></span>
      <span className="text offline">offline</span>
      <span className="text online">online</span>
    </label>
  );
};
