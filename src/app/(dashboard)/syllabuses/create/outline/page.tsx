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
import { Content } from "@/types/models/user.model.type";

const OutlineSyllabusPage: React.FC = () => {
  {
    /**============== Add Unit ==================== */
  }
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  console.log(contents);
  const [days, setDays] = useState<string[]>([]);

  const handleAddDay = () => {
    setDays((prevDays) => [...prevDays, "New Day"]);
  };

  return (
    <div className="w-screen">
      <div className="p-5">
        <div className="flex gap-[50px]">
          <h1 className="title">Syllabus</h1>
          <div className="mt-[10px]">
            <ProgressBar text="Outline" />
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
          <span className="text-sm">NPL</span>
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Version</p>
          <p className="text-sm opacity-50">1.0</p>
        </div>
      </div>

      <div className="px-[20px]">
        {" "}
        <div className="w-[600px] mb-0">
          <Tab />
        </div>
        <div className=" flex gap-[20px]">
          {/*"Container Body Content"*/}
          <div className="left w-4/5">
            <hr className="h-[2px] bg-[#8B8B8B]" />
            <div className="w-full">
              {days.map((day, index) => (
                <details key={index} className="w-full">
                  <summary className="py-[10px] px-[16px] bg-main flex items-center gap-[10px]">
                    <p className="text-white text-base font-semibold">{`Day ${
                      index + 1
                    }`}</p>
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
                    <li className="flex flex-col gap-[10px] syllabus-detail">
                      <div className="header-syllabus flex w-full h-[46px] justify-between">
                        <div className="hs-left flex gap-[34px]">
                          <div className="unit">
                            <p className="font-semibold text-black text-base">
                              Unit 6
                            </p>
                          </div>
                          <div className="flex">
                            <div className="h-[46px]">
                              <p className="font-semibold text-black text-base mb-[5px]">
                                .Java
                              </p>
                              <p className="text-xs font-medium">12hrs</p>
                            </div>
                            <div className="ml-1">
                              {" "}
                              <MdOutlineEdit
                                style={{ height: "18px", width: "18px" }}
                              />
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
                        {" "}
                        {contents.map((content, index) => (
                          <Detail
                            key={index}
                            name={content.name}
                            outputStandard={content.outputStandard}
                            delivery={content.deliveryType}
                            trainingTime={content.trainingTime}
                            status={content.method}
                          />
                        ))}
                        {/* <Detail
                        name="Hung ne"
                        outputStandard="HPH9"
                        delivery="Guide/Review"
                        trainingTime={20}
                        status="Offline"
                      /> */}
                        <button onClick={() => setShowAddContentModal(true)}>
                          {<IoAddCircleOutline className="w-[24px] h-[24px]" />}
                        </button>
                        {showAddContentModal && (
                          <AddContentForm
                            showAddContentModal={() =>
                              setShowAddContentModal(false)
                            }
                            setContents={setContents}
                          />
                        )}
                      </div>
                    </li>
                    <li className="syllabus-detail">
                      <div className="header-syllabus  w-full h-[46px] justify-between flex items-center">
                        <div className="hs-left flex gap-[34px] items-center">
                          <div className="unit">
                            <p className="font-semibold text-black text-base">
                              Unit 7
                            </p>
                          </div>
                          <div className="flex gap-[20px]">
                            <div className="">
                              <input
                                type="text"
                                placeholder="Unit name"
                                className="w-[174px] h-[36px] border-[1px] border-[#8B8B8B] rounded-[6px] p-[10px] placeholder-black"
                                id=""
                              />
                            </div>
                            <Button
                              className="w-[97px] h-[36px] bg-main px-[25px] py-[2px] rounded-[8px] flex items-center justify-center text-white"
                              title="Create"
                            />
                          </div>
                        </div>
                        <div className="hs-right">
                          <IoIosArrowDropdown
                            style={{ height: "20px", width: "20px" }}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="syllabus-detail">
                      <div className="header-syllabus  w-full h-[46px] justify-between flex items-center">
                        <Button
                          className="px-[10px] py-[7px] rounded-[10px] bg-[#474747] text-white text-sm font-bold"
                          title="Add unit"
                          icon={<IoAddCircleOutline />}
                        />
                      </div>
                    </li>
                  </ul>
                </details>
              ))}
              {/*"Dropdown day 1"*/}

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
        {/*====="Footer"=========*/}
        <div className="w-full h-[68px] flex items-center justify-between">
          <div>
            <Button
              className="bg-main w-[110px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
              title="Previous"
            />
          </div>
          <div className="w-[292px] h-[28px] flex items-center gap-[10px]">
            <Button
              className=" w-[48px] h-[28px]  py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
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
    </div>
  );
};

export default OutlineSyllabusPage;
