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
import { toast } from "react-toastify";
import Link from "next/link";
import {
  createContentAPI,
  createSyllabusAPI,
  createUnitAPI,
} from "@/services/syllabuses/syllabusService";
import { MockResponse } from "@/app/services/mock-response.service";
const CreateSyllabusPage: React.FC = () => {
  // ======== Create Full Syllabus ============
  const [syllabusName, setSyllabusName] = useState("");
  const [code, setCode] = useState("");
  const [version, setVersion] = useState("");
  const [createSyllabus, setCreateSyllabus] = useState({
    title: {
      syllabusName: "",
      code: "",
      version: "",
    },
    general: {
      level: "",
      attendeeNumber: "",
      technicalRequirements: "",
    },
    outline: {
      days: [],
      units: [],
      content: [],
    },
    other: {
      quiz: "",
      assignment: "",
      final: "",
      finalTheory: "",
      gpa: "",
    },
  });
  const updateFormData = (data: any) => {
    setCreateSyllabus((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  //============= Create Syllabus ===========
  // Hàm đổi từ index sang value
  function mapIndexToValue(indexArray: number[], valueArray: any[]) {
    return indexArray.map((index) => valueArray[index]);
  }
  const handleCreateSyllabus = async (
    data: any,
    syllabusName: string,
    code: string,
    version: string
  ) => {
    const newData = {
      ...data,
      syllabusName: syllabusName,
      code: code,
      version: version,
    };
    console.log(newData);
    let syllabusResponse: any;
    const syllabus = {
      name: syllabusName,
      code: code,
      attendee: data.attendeeNumber,
      description: data.technicalRequirements,
      isApproved: true,
      isActive: true,
      version: version,
    };

    syllabusResponse = await createSyllabusAPI(syllabus as any);

    if (syllabusResponse.statusCode === 200) {
      const syllabusId = syllabusResponse.content.id; // Lấy ID của syllabus mới tạo
      console.log("SyllabusID New", syllabusId);
      //====== Loop Unit======
      const units = newData.units;
      const unitIds: string[] = [];
      for (const unit of units) {
        const unitData = {
          syllabusId: syllabusId,
          name: unit.unitName,
          dayNumber: unit.dayId,
        };

        const unitResponse = await createUnitAPI(unitData);

        if (unitResponse.statusCode === 200) {
          const unitIdAPI = unitResponse.content.id;
          unitIds.push(unitIdAPI); // Thêm unitIdAPI vào mảng unitIds
          console.log(unitIds);
        }
      }

      const contents = newData.content;
      const unitIdsOfContents = mapIndexToValue(
        contents.map((content) => content.unitId - 1),
        unitIds
      );
      console.log(unitIdsOfContents);

      //========= Loop Contents ==========
      for (let i = 0; i < contents.length; i++) {
        const content = contents[i];
        const contentData = {
          unitId: unitIdsOfContents[i], // Sử dụng chỉ số i để lấy unitId tương ứng
          dayId: content.dayId,
          outputStandard: content.outputStandard,
          name: content.name,
          trainingTime: 12,
          deliveryType: content.deliveryType,
          trainingFormat: content.method,
          duration: content.trainingTime,
        };
        const contentResponse = await createContentAPI(contentData);
      }
    } else {
      syllabusResponse = new MockResponse(201, syllabus);
      toast.success("Create Syllabus successfully (mocked)");
    }
  };

  // ========= Change Tab ==================
  const [selectedTab, setSelectedTab] = useState("General");
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };
  const handleRenderPage = (page: string) => {
    if (page === "General") {
      return <GeneralSyllabusPage generalFormData={updateFormData} />;
    } else if (page === "Outline") {
      return <OutlineSyllabusPage outlineFormData={updateFormData} />;
    } else if (page === "Others") {
      return <OtherSyllabusPage otherFormData={updateFormData} />;
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
            onChange={(e) => {
              setSyllabusName(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Code</p>
          <input
            type="text"
            placeholder="NPL"
            className="w-[28px] h-[28px] text-sm"
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Version</p>
          <input
            type="text"
            placeholder="1.0"
            className="w-[28px] h-[28px] text-sm"
            onChange={(e) => {
              setVersion(e.target.value);
            }}
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
        <Link href={"/syllabuses"}>
          <Button
            title="Done"
            className="bg-red-400 text-white"
            onClick={() =>
              handleCreateSyllabus(createSyllabus, syllabusName, code, version)
            }
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateSyllabusPage;
