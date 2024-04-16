"use client";
import "./detail.css";
import React, { FC, useState } from "react";
import {
  MdOutlineAssignment,
  MdOutlineFactCheck,
  MdOutlineGroups,
  MdOutlineSnippetFolder,
} from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Chip } from "../chip/chip";
import Image from "next/image";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiExam } from "react-icons/pi";
import { FaRegHandPaper } from "react-icons/fa";

type DetailProps = {
  name: string;
  outputStandard: string;
  trainingTime: number;
  status: string;
  delivery: string;
};

export const Detail: FC<DetailProps> = ({
  name,
  outputStandard,
  trainingTime,
  status,
  delivery,
}) => {
  const handleSetDelivery = (value: string) => {
    if (value === "Assignment/Lab") {
      return <MdOutlineAssignment style={{ height: "24px", width: "24px" }} />;
    } else if (value === "Concept/Lecture") {
      return <HiOutlineLightBulb style={{ height: "24px", width: "24px" }} />;
    } else if (value === "Guide/Review") {
      return <FaRegHandPaper style={{ height: "24px", width: "24px" }} />;
    } else if (value === "Test/Quiz") {
      return <MdOutlineFactCheck style={{ height: "24px", width: "24px" }} />;
    } else if (value === "Exam") {
      return <PiExam style={{ height: "24px", width: "24px" }} />;
    } else if (value === "Seminar/Workshop") {
      return <MdOutlineGroups style={{ height: "24px", width: "24px" }} />;
    }
  };
  return (
    <div className="w-full bg-[#DFDEDE] flex items-center justify-between px-[20px] py-[5px] rounded-[10px]">
      <div className="left w-[121px] h-[22px]">
        <p className="text-sm font-medium">{name}</p>
      </div>
      <div className="right flex items-center w-[385px] h-[28px] justify-between">
        <div className="shape-1">
          <Chip active={outputStandard} />
        </div>
        <div className="w-[49px] h-[28px] flex items-center">
          <p className="text-sm font-normal">{trainingTime}mins</p>
        </div>
        <div>
          <button
            className={`button ${status === "Online" ? "Online" : "Offline"}`}
          >
            {status === "Online" ? "Online" : "Offline"}
          </button>
        </div>

        <div className="icon">{handleSetDelivery(delivery)}</div>

        <div className="icon-folder">
          <MdOutlineSnippetFolder style={{ height: "24px", width: "24px" }} />
        </div>
      </div>
    </div>
  );
};
