"use client";
import { useEffect, useState } from "react";
import { Chip } from "@/app/components/chip/chip";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { MdMoreHoriz } from "react-icons/md";
import {
  getSyllabusByID,
  getUnitByID,
} from "@/services/syllabuses/syllabusService";
import { Syllabus } from "@/types/syllabus.type";
import { usePathname } from "next/navigation";
import { fromTimestampToDateString } from "@/utils/formatUtils";
import GeneralDetailSyllabus from "./general-detail-syllabus/page";
import OutlineDetailSyllabus from "./outline-detail-syllabus/page";
import { Unit } from "@/types/models/unit.model.type";

const Page: React.FC = () => {
  const router = usePathname();
  const syllabusId = router.split("/")[3];
  const [syllabusById, setSyllabusById] = useState<Syllabus>({});
  const unitId = syllabusById.unitIds;
  const [unitDayById, setUnitDayById] = useState<Unit[]>([]);
  console.log(unitDayById);
  //gọi thêm api unit để tính ngày và số duration
  //============ API Syllabus =========
  const getCurrentSyllabus = async (id?: number) => {
    if (!id) throw new Error("ID is not correct");
    const response = await getSyllabusByID(id);
    return response.content;
  };

  useEffect(() => {
    const fetchSyllabusByID = async () => {
      try {
        const currentSyllabus = await getCurrentSyllabus(+syllabusId);
        setSyllabusById(currentSyllabus);
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };
    fetchSyllabusByID();
  }, [syllabusId]);
  // ============= API Unit ===========
  const getCurrentUnit = async (ids?: number[]) => {
    if (!ids || ids.length === 0) throw new Error("IDs Unit are not correct");

    // Tạo một mảng chứa các promises cho mỗi cuộc gọi getUnitByID
    const promises = ids.map(async (id) => {
      const response = await getUnitByID(id);
      return response.content;
    });

    // Đợi tất cả các promises được giải quyết
    const units = await Promise.all(promises);
    return units;
  };

  useEffect(() => {
    const fetchUnitByID = async () => {
      try {
        if (!unitId) return;
        const currentUnit = await getCurrentUnit(unitId);
        setUnitDayById(currentUnit);
      } catch (error) {
        console.error("Error fetching Unit:", error);
      }
    };
    fetchUnitByID();
  }, [unitId]);

  //============= Syllabus Status ==================
  const syllabusStatus = (syllabus: any) => {
    if (syllabus.isActive === false) {
      return <Chip inactive="Inactive" />;
    } else if (syllabus.isActive === true && syllabus.isApproved === false) {
      return <Chip draft="Draft" />;
    } else {
      return <Chip active="Active" />;
    }
  };

  // ============= Render Page ===============
  const [selectedTab, setSelectedTab] = useState("General");
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };
  const handleRenderPage = (page: string) => {
    if (page === "General") {
      return <GeneralDetailSyllabus data={syllabusById} />;
    } else if (page === "Outline") {
      return <OutlineDetailSyllabus unitId={unitId} />;
    }
    // } else if (page === "Others") {
    //   return <OtherSyllabusPage />;
    // }
  };

  // ======= Convert Millisecond =========
  const millisecondsToHours = (milliseconds: number) => {
    const hours = milliseconds / 3600000;
    const roundedTotalHours = hours.toFixed(1); //rounded
    return parseFloat(roundedTotalHours);
  };

  const getMaxDayNumber = (units: Unit[]) => {
    if (units.length === 0) return 0; // Trả về 0 nếu mảng rỗng

    // Sử dụng Math.max và spread operator để truyền giá trị của các dayNumber vào hàm Math.max
    const maxDayNumber = Math.max(...units.map((unit) => unit.dayNumber));

    return maxDayNumber;
  };
  return (
    syllabusById && (
      <div className="w-full">
        <div className="title p-[20px] flex flex-col gap-[15px] border-b-[1px] border-[#2D3748]">
          <h1 className="tracking-[5px] text-[24px] font-semibold text-[#2D3748]">
            Syllabus
          </h1>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-[20px]">
              <p className="tracking-[5px] text-[32px] font-semibold">
                {syllabusById.name}
              </p>
              <div>{syllabusStatus(syllabusById)}</div>
            </div>
            <MdMoreHoriz style={{ height: "48px", width: "48px" }} />
          </div>
          <p className="text-base font-semibold">{syllabusById.code}</p>
        </div>
        <div className="p-[20px] flex flex-col gap-[5px]">
          <div className="flex w-[148px] h-[36px] items-end">
            <div className="flex gap-[5px] items-end mr-2">
              <p className="text-[24px] font-semibold">
                {getMaxDayNumber(unitDayById)}
              </p>
              <p className="text-base font-medium mb-[3px]">days</p>
            </div>
            <p className="text-sm font-medium mb-[5px]">
              {millisecondsToHours(syllabusById.duration)}hours
            </p>
          </div>
          <div className="author text-sm font-medium">
            Modified on {fromTimestampToDateString(syllabusById.createdDate)} by
            <span className="ml-[2px] font-bold">
              {syllabusById.createBy && syllabusById.createBy.includes("@")
                ? syllabusById.createBy.split("@")[0]
                : ""}
            </span>
          </div>
        </div>
        <div className="content px-[20px]">
          <div className="w-[600px]">
            <Tab onTabPageChange={handleTabChange} />
          </div>
          <div>{handleRenderPage(selectedTab)}</div>
        </div>
      </div>
    )
  );
};

export default Page;
