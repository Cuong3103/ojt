"use client";
import "./outline-page.css";
import { ProgressBar } from "@/app/components/progress-bar/progress-bar";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { FcPieChart } from "react-icons/fc";
import { CiCircleMinus } from "react-icons/ci";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { Detail } from "@/app/components/syllabus-detail/detail";
import Button from "@/app/components/button/button";
import { IoAddCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import { AddContentForm } from "@/app/components/syllabus-modal/outline-form/add-content-modal";
import { toast } from "react-toastify";

type Day = {
  id: number;
};
type Unit = {
  dayId: number;
  id: number;
  unitName: string;
};
type Content = {
  dayId: number;
  unitId: number;
  id: number;
  name: string;
  outputStandard: string;
  trainingTime: number;
  deliveryType: string;
  method: string;
};
const OutlineSyllabusPage: React.FC = () => {
  {
    /**============== Add Unit ==================== */
  }
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);

  // Khởi tạo state cho days, units và contents
  const [days, setDays] = useState<Day[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  // Đặt biến là int thì cho phép tạo lần đầu còn true false chỉ check đã tạo hoặc chưa tạo
  const [numUnitsAdded, setNumUnitsAdded] = useState(0);
  const [contents, setContents] = useState<Content[]>([]);
  const [unitName, setUnitName] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(0);
  //================ ADD DAY =================
  const handleAddDay = () => {
    const newDayId = days.length + 1;
    setDays((prevDays) => [...prevDays, { id: newDayId }]);
  };
  //================ ADD UNIT =================
  const handleAddUnit = (dayId: number) => {
    return () => {
      if (numUnitsAdded === 0) {
        const newUnitId = units.length + 1;
        const newUnit: Unit = { id: newUnitId, dayId: dayId, unitName: "" };
        setShowAddUnit(true); // Hiển thị form thêm đơn vị mới
        setUnits([...units, newUnit]);
        setNumUnitsAdded(numUnitsAdded + 1);
      } else {
        toast.error(
          "Please complete creating the current unit before adding another one"
        );
      }
    };
  };
  //================ CREATE UNIT =================
  const handleCreateUnit = (
    dayId: number,
    unitId: number,
    unitName: string
  ) => {
    // kiểm tra đã nhập tên unit chưa
    if (unitName === "" || unitName.length <= 3) {
      toast.error(
        "Please enter a unit name with more than 3 characters before creating"
      );
      return;
    }
    // kiểm tra unit đã tồn tại chưa
    const existingUnit = units.find(
      (unit) => unit.dayId === dayId && unit.id === unitId
    );

    if (!existingUnit) {
      const newUnit = {
        dayId: dayId,
        id: unitId,
        unitName: unitName,
      };
      setUnits([...units, newUnit]);
      setNumUnitsAdded(numUnitsAdded + 1);
    } else {
      // Nếu đơn vị đã tồn tại, cập nhật tên đơn vị
      setUnits(
        units.map((unit) =>
          unit.id === unitId ? { ...unit, unitName: unitName } : unit
        )
      );
      setUnitName("");
      setNumUnitsAdded(0);
    }
  };
  //================ Create Content ================
  const handleCreateContent = (
    selectedDayId: number,
    selectedUnitId: number
  ) => {
    setShowAddContentModal(true); // Hiển thị modal
    setSelectedDay(selectedDayId); // Lưu `dayId` được chọn vào state hoặc biến
    setSelectedUnit(selectedUnitId);
  };

  // Hàm thêm nội dung mới cho một unit cụ thể

  return (
    <div className="w-full">
      <div className=" flex gap-[20px]">
        {/*"Container Body Content"*/}
        <div className="left w-4/5">
          <hr className="h-[2px] bg-[#8B8B8B]" />
          <div className="w-full">
            {/*"Dropdown day 1"*/}
            {days.map((day) => {
              return (
                <details key={day.id} className="w-full">
                  <summary className="py-[10px] px-[16px] bg-main flex items-center gap-[10px]">
                    <p className="text-white text-base font-semibold">{`Day ${day.id}`}</p>
                    <div>
                      <CiCircleMinus
                        style={{
                          color: "#E74A3B",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                  </summary>

                  <ul className="syllabus-list py-[10px] shadow bg-base-100 w-full left-0 top-11">
                    {/**==========Add Name Unit ==========*/}

                    {units
                      .filter((unit) => unit.dayId === day.id) // Lọc ra các đơn vị có dayId tương ứng
                      .map((unit) => (
                        <li
                          key={unit.id}
                          className="syllabus-detail flex flex-col"
                        >
                          {/**======================= Add Name Unit ======================= */}
                          {showAddUnit && !unit.unitName && (
                            <div className="header-syllabus  w-full h-[46px] justify-between flex items-center">
                              <div className="hs-left flex gap-[34px] items-center">
                                <div className="unit">
                                  <p className="font-semibold text-black text-base">
                                    {`unit ${unit.id}`}
                                  </p>
                                </div>
                                <div className="flex gap-[20px]">
                                  <div className="">
                                    <input
                                      type="text"
                                      placeholder="Unit name"
                                      onChange={(e) => {
                                        const newValue = e.target.value;
                                        setUnitName(newValue);
                                      }}
                                      className="w-[174px] h-[36px] border-[1px] border-[#8B8B8B] rounded-[6px] p-[10px] placeholder-black"
                                      id=""
                                    />
                                  </div>
                                  <Button
                                    className="w-[97px] h-[36px] bg-main px-[25px] py-[2px] rounded-[8px] flex items-center justify-center text-white"
                                    title="Create"
                                    onClick={() =>
                                      handleCreateUnit(
                                        day.id,
                                        unit.id,
                                        unitName
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="hs-right">
                                <IoIosArrowDropdown
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {/**===================== Created Name Unit =======================*/}
                          {unit.unitName && (
                            <div className="w-full flex flex-col gap-[10px]">
                              {/**Created Name Unit */}
                              <div className="header-syllabus flex w-full justify-between">
                                <div className="hs-left flex gap-[34px]">
                                  <div className="unit">
                                    <p className="font-semibold text-black text-base">
                                      {`unit ${unit.id}`}
                                    </p>
                                  </div>
                                  <div className="flex">
                                    <div className="h-[46px]">
                                      <p className="font-semibold text-black text-base mb-[5px]">
                                        {unit.unitName}
                                      </p>
                                      <p className="text-xs font-medium">
                                        12hrs
                                      </p>
                                    </div>
                                    <div className="ml-1">
                                      {" "}
                                      <MdOutlineEdit
                                        style={{
                                          height: "18px",
                                          width: "18px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="hs-right">
                                  <IoIosArrowDropdown
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="body-syllabus w-full h-max flex flex-col gap-[5px]">
                                {/**=========Render Content ========*/}
                                {contents
                                  .filter(
                                    (content) =>
                                      content.unitId === unit.id &&
                                      content.dayId === day.id
                                  )
                                  .map((content) => (
                                    <Detail
                                      key={content.id}
                                      name={content.name}
                                      outputStandard={content.outputStandard}
                                      delivery={content.deliveryType}
                                      trainingTime={content.trainingTime}
                                      status={content.method}
                                    />
                                  ))}
                                <button
                                  onClick={() =>
                                    handleCreateContent(day.id, unit.id)
                                  }
                                >
                                  {
                                    <IoAddCircleOutline className="w-[24px] h-[24px]" />
                                  }
                                </button>
                                {showAddContentModal && (
                                  <AddContentForm
                                    showAddContentModal={() =>
                                      setShowAddContentModal(false)
                                    }
                                    setContents={setContents}
                                    dayId={selectedDay}
                                    unitId={selectedUnit}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </li>
                      ))}

                    <li className="syllabus-detail">
                      <div className="header-syllabus  w-full h-[46px] justify-between flex items-center">
                        <Button
                          className="px-[10px] py-[7px] rounded-[10px] bg-[#474747] text-white text-sm font-bold"
                          title="Add unit"
                          icon={<IoAddCircleOutline />}
                          onClick={handleAddUnit(day.id)}
                        />
                      </div>
                    </li>
                  </ul>
                </details>
              );
            })}

            <div className="w-full pl-[16px] mt-[20px]">
              <Button
                className="w-[106px] h-[38px] py-[7px] px-[10px] bg-main rounded-[10px] text-white"
                title="Add day"
                icon={<IoAddCircleOutline />}
                onClick={handleAddDay}
              />
            </div>
          </div>
        </div>
        <div className="right w-1/5">
          <div className=" h-[34px] text-white font-semibold bg-main rounded-t-[10px] flex items-center justify-center">
            {" "}
            Time allocation
          </div>
          <div className="w-full h-[409px] p-[10px] flex flex-col gap-[20px] shadow ">
            <div className="flex justify-center w-full">
              <Image
                src="../assets/icons/pieChart.svg"
                alt="lecture"
                width={119}
                height={119}
              />
            </div>
            {/*"===========Note=========="*/}
            <div className="w-[152px] flex flex-col gap-[15px]">
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
      <div className="w-full h-[68px] flex items-center justify-between">
        <div>
          <Button
            className="bg-main w-[110px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
            title="Previous"
          />
        </div>
        <div className="w-[292px] h-[28px] flex items-center gap-[10px]">
          <Button
            className=" w-[48px] h-[28px] px-[0px] py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
            title="Cancel"
          />
          <Button
            className="bg-[#474747] w-[140px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
            title="Save as draft"
          />
          <Button
            className="bg-main w-[80px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
            title="Save"
          />
        </div>
      </div>
    </div>
  );
};

export default OutlineSyllabusPage;
