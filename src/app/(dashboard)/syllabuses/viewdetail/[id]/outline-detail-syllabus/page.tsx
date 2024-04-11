import { Detail } from "@/app/components/syllabus-detail/detail";
import "./outline-detail-page.css";
import {
  getContentByID,
  getUnitByID,
} from "@/services/syllabuses/syllabusService";
import { Unit } from "@/types/models/unit.model.type";
import { Content } from "@/types/models/user.model.type";
import { useEffect, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { FcPieChart } from "react-icons/fc";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import Button from "@/app/components/button/button";

type OutlineProps = {
  unitId: number[];
};
const OutlineDetailSyllabus: React.FC<OutlineProps> = ({ unitId }) => {
  const [UnitById, setUnitById] = useState<Unit[]>([]);
  const [ContentId, setContentId] = useState<Content[]>([]);
  const [ContentById, setContentById] = useState<Content[]>([]);
  let unitCount = 1; // biến đếm tăng unit

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
        setUnitById(currentUnit);
        const contentIds = currentUnit.flatMap((unit) => unit.contentIds);
        setContentId(contentIds);
      } catch (error) {
        console.error("Error fetching Unit:", error);
      }
    };
    fetchUnitByID();
  }, [unitId]);

  // ============= API Content ===========
  const getCurrentContent = async (ids?: number[]) => {
    if (!ids || ids.length === 0)
      throw new Error("IDs Contents are not correct");
    // Tạo một mảng chứa các promises cho mỗi cuộc gọi getContentByID
    const promises = ids.map(async (id) => {
      const response = await getContentByID(id);
      return response.content;
    });

    // Đợi tất cả các promises được giải quyết
    const contents = await Promise.all(promises);
    return contents;
  };

  useEffect(() => {
    const fetchContentByID = async () => {
      try {
        // Lấy dữ liệu cho các contentId từ API
        const currentContents = await getCurrentContent(ContentId);
        setContentById(currentContents);
      } catch (error) {
        console.error("Error fetching Content:", error);
      }
    };
    fetchContentByID();
  }, [ContentId]); // Đảm bảo useEffect được gọi lại khi contentId thay đổi

  //============== Convert Millisecond to Hour Total Duration========
  const calculateTotalDuration = (unitId: number) => {
    const totalMilliseconds = ContentById.filter(
      (content) => content.unitId === unitId
    ).reduce((total, content) => total + content.duration, 0);
    const totalHours = totalMilliseconds / 3600000;
    const roundedTotalHours = totalHours.toFixed(1); //rounded
    return parseFloat(roundedTotalHours);
  };

  return (
    <div className=" flex gap-[20px]">
      <div className="left w-4/5 h-[500px] overflow-y-auto">
        {UnitById.filter(
          (unit, index, self) =>
            index === self.findIndex((u) => u.dayNumber === unit.dayNumber)
        )
          .sort((a, b) => a.dayNumber - b.dayNumber)
          .map((filteredUnit) => (
            <details className="w-full" key={filteredUnit.id}>
              <summary className="py-[10px] px-[16px] bg-main flex items-center gap-[10px]">
                <p className="text-white text-base font-semibold">
                  Day {filteredUnit.dayNumber}
                </p>
              </summary>
              <ul className="syllabus-list shadow bg-base-100 w-full left-0 top-11">
                {UnitById.filter(
                  (unit) => unit.dayNumber === filteredUnit.dayNumber
                )
                  .sort((a, b) => a.id - b.id)
                  .map((unit, index) => {
                    const totalDuration = calculateTotalDuration(unit.id);
                    return (
                      <li
                        className="flex flex-col gap-[10px] syllabus-detail"
                        key={`${unit.id}-${index}`}
                      >
                        <div className="header-syllabus flex w-full h-[46px] justify-between">
                          <div className="hs-left flex gap-[34px]">
                            <div className="unit">
                              <p className="font-semibold text-black text-base">
                                Unit {unitCount++}
                              </p>
                            </div>
                            <div className="flex">
                              <div className="h-[46px]">
                                <p className="font-semibold text-black text-base mb-[5px]">
                                  {unit.name}
                                </p>
                                <p className="text-xs font-medium">
                                  {totalDuration}hrs
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="hs-right">
                            <IoIosArrowDropdown
                              style={{ height: "20px", width: "20px" }}
                            />
                          </div>
                        </div>
                        <div className="body-syllabus w-full flex flex-col gap-[5px]">
                          {ContentById.filter(
                            (content) => content.unitId === unit.id
                          ).length > 0 ? (
                            // Hiển thị nội dung khi có dữ liệu
                            ContentById.filter(
                              (content) => content.unitId === unit.id
                            ).map((content) => (
                              <Detail
                                key={content.id}
                                name={content.name}
                                outputStandard="HPH9"
                                delivery={content.deliveryType}
                                status={content.trainingFormat}
                                trainingTime={content.duration}
                              />
                            ))
                          ) : (
                            <p>Will Update Soon...</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </details>
          ))}
      </div>

      <div className="right w-1/5">
        <div className=" h-[34px] text-white font-semibold bg-main rounded-t-[10px] flex items-center justify-center">
          {" "}
          Time allocation
        </div>
        <div className="w-full h-[409px] p-[10px] shadow ">
          <div className="flex justify-center w-full">
            <FcPieChart className="w-[119px] h-[119px]" />
          </div>
          {/*"===========Note=========="*/}
          <div className="w-[152px] h-[240px] flex flex-col gap-[15px]">
            <div className="note flex gap-[5px]">
              <div className="w-[13.92px] h-[13.94px]">
                <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-orange-300 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-medium">Assignment/Lab</p>
                <p className="text-xs font-medium">(54%)</p>
              </div>
            </div>
            <div className="note flex gap-[5px]">
              <div className="w-[13.92px] h-[13.94px]">
                <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-red-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-medium">Concept/Lecture</p>
                <p className="text-xs font-medium">(29%)</p>
              </div>
            </div>
            <div className="note flex gap-[5px]">
              <div className="w-[13.92px] h-[13.94px]">
                <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-amber-300 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-medium">Guide/Review</p>
                <p className="text-xs font-medium">(9%)</p>
              </div>
            </div>
            <div className="note flex gap-[5px]">
              <div className="w-[13.92px] h-[13.94px]">
                <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-cyan-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-medium">Test/Quiz</p>
                <p className="text-xs font-medium">(1%)</p>
              </div>
            </div>
            <div className="note flex gap-[5px]">
              <div className="w-[13.92px] h-[13.94px]">
                <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-green-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-xs font-medium">Exam</p>
                <p className="text-xs font-medium">(6%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlineDetailSyllabus;
