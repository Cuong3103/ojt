"use client";
import { useEffect, useState } from "react";
import { Chip } from "@/app/components/chip/chip";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { MdMoreHoriz } from "react-icons/md";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { getSyllabusByID } from "@/services/syllabuses/syllabusService";
import { Syllabus } from "@/types/syllabus.type";
import { useParams } from "next/navigation";
import { convertToCamelCase } from "@/utils/formatUtils";
import { toast } from "react-toastify";
import parser from "html-react-parser";

const Page: React.FC = () => {
  const syllabusId = useParams().id;

  const [currentSyllabus, setCurrentSyllabus] = useState<Syllabus | null>(null);

  const formatVersion = (version: string) => {
    version = version.replace("i", "v.");
    return version + ".0";
  };

  const fetchCurrentSyllabus = async () => {
    try {
      const response = await getSyllabusByID(parseInt(syllabusId as string));
      const foundSyllabus = convertToCamelCase(response.data);
      foundSyllabus.publishStatus = syllabusStatus(foundSyllabus);
      foundSyllabus.version = formatVersion(foundSyllabus.version);
      setCurrentSyllabus(foundSyllabus);
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  const syllabusStatus = (syllabus: Syllabus) => {
    console.log(syllabus);
    if (syllabus.deletedAt !== null) {
      return <Chip inactive="Inactive" />;
    } else if (syllabus.version === "i1" || syllabus.version === "i2") {
      return <Chip active="Active" />;
    } else if (syllabus.version === "i3") {
      return <Chip draft="Draft" />;
    }
  };

  useEffect(() => {
    fetchCurrentSyllabus();
  }, []);

  return (
    currentSyllabus && (
      <div className="w-full">
        <div className="title p-[20px] flex flex-col gap-[15px] border-b-[1px] border-[#2D3748]">
          <h1 className="tracking-[5px] text-[24px] font-semibold text-[#2D3748]">
            Syllabus
          </h1>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-[20px]">
              <p className="tracking-[5px] text-[32px] font-semibold">
                {currentSyllabus.topicName}
              </p>
              <div>{currentSyllabus.publishStatus}</div>
            </div>
            <MdMoreHoriz style={{ height: "48px", width: "48px" }} />
          </div>
          <div className="flex gap-2">
            <p className="text-base font-semibold">
              {currentSyllabus.topicCode}
            </p>
            <p className="text-base font-semibold">{currentSyllabus.version}</p>
          </div>
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
            Modified on {currentSyllabus.createdAt} by
            <span className="ml-[2px] font-bold">
              {currentSyllabus.createdBy &&
              currentSyllabus.createdBy.includes("@")
                ? currentSyllabus.createdBy.split("@")[0]
                : ""}
            </span>
          </div>
        </div>
        <div className="content px-[20px]">
          <div className="w-[600px]">
            <Tab
              onTabPageChange={function (tabName: string): void {
                throw new Error("Function not implemented.");
              }}
            />
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
                  <p className="font-medium text-sm">
                    {currentSyllabus.level?.toLocaleUpperCase()}
                  </p>
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
                  <p className="font-medium text-sm">
                    {currentSyllabus.amountAttendees}
                  </p>
                </div>
              </div>
              <div className="w-full flex gap-[20px]">
                <div className="w-[162px] flex items-center gap-[10px]">
                  <LuShieldCheck style={{ height: "24px", width: "24px" }} />
                  <p className="text-sm font-semibold">Output standard</p>
                </div>
              </div>
            </div>
            <div className="right w-full h-[192px] p-[20px] rounded-[10px] flex flex-col gap-[10px] shadow-md brightness-150">
              <div className="flex items-center gap-[10px]">
                <IoSettingsOutline style={{ height: "24px", width: "24px" }} />
                <p className="font-semibold text-sm">
                  Technical Requirement(s){" "}
                </p>
              </div>
              <div className="text w-full h-[118px] px-[10px] overflow-auto">
                <p>{currentSyllabus.technicalRequirements}</p>
              </div>
            </div>
          </div>
          <div className="mt-5  rounded-[10px] flex flex-col gap-[10px] h-full shadow-md brightness-150 p-5">
            <div className="flex items-center gap-[10px]">
              <IoSettingsOutline style={{ height: "24px", width: "24px" }} />
              <p className="font-semibold text-sm">Course Objectives </p>
            </div>
            <div className="text w-full h-32 px-[10px] overflow-auto">
              <div>{parser(currentSyllabus.courseObjectives)}</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Page;
