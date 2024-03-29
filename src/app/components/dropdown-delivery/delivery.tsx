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

export const Delivery: FC = () => {
  const [type, setType] = useState("Select one");
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
        className="w-[315px] h-[36px] px-[10px] flex items-center justify-between shadow-sm shadow-slate-500 rounded-[5px] bg-white"
        onClick={handleShowRadio}
      >
        {" "}
        <p className="font-medium text-sm">{type}</p>
        <RiArrowDropDownLine style={{ height: "24px", width: "24px" }} />
      </button>

      {showRadio && (
        <div className="flex flex-col pb-[10px] gap-[5px] bg-white shadow-md z-10">
          <div
            className="flex items-center px-[16px] gap-[10px] cursor-pointer"
            onClick={() => handleSetType("Assignment/Lab")}
          >
            <MdOutlineAssignment />
            <p className="text-[#2C5282] font-medium text-xs">
              {" "}
              Assignment/Lab
            </p>
          </div>

          <div
            className="flex items-center px-[16px] gap-[10px] cursor-pointer"
            onClick={() => handleSetType("Concept/Lecture")}
          >
            {" "}
            <HiOutlineLightBulb />
            <p className="text-[#2C5282] font-medium text-xs">
              Concept/Lecture
            </p>
          </div>

          <div
            className="flex items-center px-[16px] gap-[10px] cursor-pointer"
            onClick={() => handleSetType("Guide/Review")}
          >
            {" "}
            <FaRegHandPaper />
            <p className="text-[#2C5282] font-medium text-xs"> Guide/Review</p>
          </div>

          <div
            className="flex items-center px-[16px] gap-[10px] cursor-pointer"
            onClick={() => handleSetType("Test/Quiz")}
          >
            {" "}
            <MdOutlineFactCheck />
            <p className="text-[#2C5282] font-medium text-xs">Test/Quiz</p>
          </div>

          <div
            className="flex items-center px-[16px] gap-[10px] cursor-pointer"
            onClick={() => handleSetType("Exam")}
          >
            {" "}
            <PiExam />
            <p className="text-[#2C5282] font-medium text-xs">Exam</p>
          </div>

          <div
            className="flex items-center px-[16px] gap-[10px] cursor-pointer"
            onClick={() => handleSetType("Seminar/Workshop")}
          >
            {" "}
            <MdOutlineGroups />
            <p className="text-[#2C5282] font-medium text-xs">
              Seminar/Workshop
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
