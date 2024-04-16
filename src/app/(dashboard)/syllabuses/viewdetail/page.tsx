"use client";

import { Chip } from "@/app/components/chip/chip";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { MdMoreHoriz } from "react-icons/md";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
const Page: React.FC = () => {
  return (
    <div className="w-full">
      <div className="title p-[20px] flex flex-col gap-[15px] border-b-[1px] border-[#2D3748]">
        <h1 className="tracking-[5px] text-[24px] font-semibold text-[#2D3748]">
          Syllabus
        </h1>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <p className="tracking-[5px] text-[32px] font-semibold">
              C# Programming Language
            </p>
            <Chip active="Active" />
          </div>
          <MdMoreHoriz style={{ height: "48px", width: "48px" }} />
        </div>
        <p className="text-base font-semibold">NPL v4.0</p>
      </div>
      <div className="p-[20px] flex flex-col gap-[5px]">
        <div className="flex w-[148px] h-[36px] items-end">
          <div className="flex gap-[5px] items-end mr-2">
            <p className="text-[24px] font-semibold">8</p>
            <p className="text-base font-medium mb-[3px]">days</p>
          </div>
          <p className="text-sm font-medium mb-[5px]">(68 hours)</p>
        </div>
        <div className="author text-sm font-medium">
          Modified on 23/07/2022 by
          <span className="ml-[2px] font-bold">Warrior Tran</span>
        </div>
      </div>
      <div className="content px-[20px]">
        <div className="w-[600px]">
          <Tab />
        </div>
        <div className="pt-[30px] flex gap-[42px]">
          <div className="left w-[480px] h-[172px] p-[20px] rounded-[10px] flex flex-col gap-[20px] shadow-md brightness-150">
            <div className="w-full flex gap-[20px]">
              <div className="w-[162px] flex items-center gap-[10px]">
                <MdOutlineStarBorder
                  style={{ height: "24px", width: "24px" }}
                />
                <p className="text-sm font-semibold">Level</p>
              </div>
              <div className="w-[64px] h-[24px] flex items-center">
                <p className="font-medium text-sm">All Levels</p>
              </div>
            </div>
            <div className="w-full flex gap-[20px]">
              <div className="w-[162px] flex items-center gap-[10px]">
                <MdOutlinePeopleOutline
                  style={{ height: "24px", width: "24px" }}
                />
                <p className="text-sm font-semibold">Attendee number</p>
              </div>
              <div className="w-[64px] h-[24px] flex items-center">
                <p className="font-medium text-sm">20</p>
              </div>
            </div>
            <div className="w-full flex gap-[20px]">
              <div className="w-[162px] flex items-center gap-[10px]">
                <LuShieldCheck style={{ height: "24px", width: "24px" }} />
                <p className="text-sm font-semibold">Output standard</p>
              </div>
              <div className="flex gap-5px items-center">
                <Chip active="H4SD" />
                <Chip active="K6SD" />
                <Chip active="H6SD" />
              </div>
            </div>
          </div>
          <div className="right w-full h-[192px] p-[20px] rounded-[10px] flex flex-col gap-[10px] shadow-md brightness-150">
            <div className="flex items-center gap-[10px]">
              <IoSettingsOutline style={{ height: "24px", width: "24px" }} />
              <p className="font-semibold text-sm">Technical Requirement(s) </p>
            </div>
            <div className="text w-full h-[118px] px-[10px]">
              <p>
                Trainees’ PCs need to have following software installed & run
                without any issues: • Microsoft SQL Server 2005 Express •
                Microsoft Visual Studio 2017 • Microsoft Office 2007 (Visio,
                Word, PowerPoint)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
