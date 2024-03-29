"use client";
import "./detail.css";
import React, { FC, useState } from "react";
import { MdOutlineSnippetFolder } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Chip } from "../chip/chip";
import Image from "next/image";
import { HiOutlineLightBulb } from "react-icons/hi";

export const Detail: FC = () => {
  const [status, setStatus] = useState("Online");
  const handleButtonClick = () => {
    setStatus(status === "Online" ? "Offline" : "Online");
  };

  return (
    <div className="w-full bg-[#DFDEDE] flex items-center justify-between px-[20px] py-[5px] rounded-[10px]">
      <div className="left w-[121px] h-[22px]">
        <p className="text-sm font-medium">.NET Introduction</p>
      </div>
      <div className="right flex items-center w-[385px] h-[28px] justify-between">
        <div className="shape-1">
          <Chip active="H4SD" />
        </div>
        <div className="shape-2 w-[49px] h-[17px]">
          <p className="text-sm font-normal">30mins</p>
        </div>
        <div>
          <button
            className={`button ${status === "Online" ? "online" : "offline"}`}
            onClick={handleButtonClick}
          >
            {status}
          </button>
        </div>

        <div className="icon">
          <HiOutlineLightBulb style={{ height: "24px", width: "24px" }} />
        </div>

        <div className="icon-folder">
          <MdOutlineSnippetFolder style={{ height: "24px", width: "24px" }} />
        </div>
      </div>
    </div>
  );
};
