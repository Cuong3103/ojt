import { FC, useState } from "react";
import { FaAddressBook, FaRegHandPaper } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import {
  MdOutlineAssignment,
  MdOutlineFactCheck,
  MdOutlineGroups,
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiExam } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { Chip } from "../chip/chip";

export const OutputStandard: FC = () => {
  const [type, setType] = useState("Select");
  const [showRadio, setShowRadio] = useState(false);

  const handleSetType = (value: string) => {
    setShowRadio(false);
    setType(value);
    console.log(value);
  };
  const handleShowRadio = () => {
    setShowRadio(!showRadio);
  };

  return (
    <div className="w-full flex flex-col gap-[10px]">
      <button
        className="w-[315px] h-[36px] px-[10px] flex items-center gap-[10px] shadow-sm shadow-slate-500 rounded-[5px] bg-white"
        onClick={handleShowRadio}
      >
        {" "}
        <IoSearchSharp style={{ height: "24px", width: "24px" }} />
        <Chip active={type} />
      </button>

      {showRadio && (
        <div className="flex flex-col pb-[10px] gap-[1px] bg-white shadow-md z-10">
          <div className="grid grid-cols-3">
            <div
              className="flex items-center px-[16px] pb-[5px] cursor-pointer"
              onClick={() => handleSetType("H4SD")}
            >
              <Chip active="H4SD" />
            </div>
            <div
              className="flex items-center px-[16px] pb-[5px] cursor-pointer"
              onClick={() => handleSetType("K5SD")}
            >
              <Chip active="K5SD" />
            </div>
            <div
              className="flex items-center px-[16px] pb-[5px] cursor-pointer"
              onClick={() => handleSetType("P3SD")}
            >
              <Chip active="P3KH" />
            </div>
            <div
              className="flex items-center px-[16px] pb-[5px] cursor-pointer"
              onClick={() => handleSetType("G9SD")}
            >
              <Chip active="T5NV" />
            </div>
            <div
              className="flex items-center px-[16px] pb-[5px] cursor-pointer"
              onClick={() => handleSetType("H4SD")}
            >
              <Chip active="H9PH" />
            </div>
            <div
              className="flex items-center px-[16px] pb-[5px] cursor-pointer"
              onClick={() => handleSetType("K5SD")}
            >
              <Chip active="N8NT" />
            </div>
            <div
              className="flex items-center px-[16px] cursor-pointer"
              onClick={() => handleSetType("P3SD")}
            >
              <Chip active="D3PV" />
            </div>
            <div
              className="flex items-center px-[16px] cursor-pointer"
              onClick={() => handleSetType("G9SD")}
            >
              <Chip active="K4TK" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
