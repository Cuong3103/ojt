"use client";
import "./detail.css";
import React, { FC, useState } from "react";
import { MdOutlineSnippetFolder } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";

export const Detail: FC = () => {
  const [status, setStatus] = useState("Online");
  const handleButtonClick = () => {
    setStatus(status === "Online" ? "Offline" : "Online");
  };

  return (
    <div>
      <footer className="footer  p-2 bg-stone-200 text-base-content w-50 h-10 rounded-lg">
        <p>.NET Introduction</p>
        <div className="body">
          <div className="bad-1">
            <span
              id="badge-dismiss-dark"
              className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              H4SD
            </span>
          </div>
          <div className="bad-2">
            <span>30mins</span>
          </div>

          <div>
            <button
              className={`button ${status === "Online" ? "online" : "offline"}`}
              onClick={handleButtonClick}
            >
              {status}
            </button>
          </div>

          <div className="icon-person">
            <BsFillPersonLinesFill />
          </div>

          <div className="icon-folder">
            <MdOutlineSnippetFolder />
          </div>
        </div>
      </footer>
    </div>
  );
};
