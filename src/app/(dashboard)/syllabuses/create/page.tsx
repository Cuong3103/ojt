"use client";
import { Tab } from "@/app/components/syllabus-tab/tab";
import "./general-page.css";
import { ProgressBar } from "@/app/components/progress-bar/progress-bar";
import { FcPieChart } from "react-icons/fc";
import Button from "@/app/components/button/button";
import Image from "next/image";
import { useState } from "react";
import GeneralSyllabusPage from "./general/page";
import OutlineSyllabusPage from "./outline/page";
import OtherSyllabusPage from "./other/page";
const CreateSyllabusPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("General");
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };
  const handleRenderPage = (page: string) => {
    if (page === "General") {
      return <GeneralSyllabusPage />;
    } else if (page === "Outline") {
      return <OutlineSyllabusPage />;
    } else if (page === "Others") {
      return <OtherSyllabusPage />;
    }
  };
  return (
    <div className="w-screen">
      <div className="p-5">
        <div className="flex gap-[50px]">
          <h1 className="title">Syllabus</h1>
          <div className="mt-[10px]">
            <ProgressBar text={selectedTab} />
          </div>
        </div>
      </div>

      <hr className="h-[1px] bg-black shadow-sm" />

      <div className="flex items-center justify-between w-4/5 px-[20px] py-[20px]">
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Syllabus Name*</p>
          <input
            type="text"
            placeholder="C# Language Program"
            className="searchSyllabus"
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Code</p>
          <input
            type="text"
            placeholder="NPL"
            className="w-[28px] h-[28px] text-sm"
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Version</p>
          <input
            type="text"
            placeholder="1.0"
            className="w-[28px] h-[28px] text-sm"
          />
        </div>
      </div>

      <div className="px-[20px]">
        {" "}
        <div className="w-[600px] mb-0">
          <Tab onTabPageChange={handleTabChange} />
        </div>
        {/**=======HANDLE CHANGE PAGE ========== */}
        <div>{handleRenderPage(selectedTab)}</div>
      </div>
    </div>
  );
};

export default CreateSyllabusPage;
