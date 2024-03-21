"use client";
import { FC } from "react";
import { Chip } from "@/app/components/chip/chip";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import { useState } from "react";
import { MdStarBorderPurple500 } from "react-icons/md";
import { MdOutlineHomeWork } from "react-icons/md";
import Image from "next/image";
import { DatePicker } from "@/app/components/date-picker/date-picker";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";

const CreateClassDetailPage: FC = () => {
  const [isExpandedGeneral, setIsExpandedGeneral] = useState(false);
  const [isExpandedTimeFrame, setIsExpandedTimeFrame] = useState(false);
  const [isExpandedAttended, setIsExpandedAttended] = useState(false);
  const [inputValue, setInputValue] = useState({ from: "--:--", to: "--:--" });

  const toggleExpansionGeneral = () => {
    setIsExpandedGeneral(!isExpandedGeneral);
  };

  const toggleExpansionAttended = () => {
    setIsExpandedAttended(!isExpandedAttended);
  };

  const toggleExpansionTimeFrame = () => {
    setIsExpandedTimeFrame(!isExpandedTimeFrame);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <div>
      <div className=" white-box border-2 bg-primary-color border-gray-400 h-60 text-white pl-8">
        <div className="mt-7 text-[30px]">
          <div style={{ letterSpacing: "0.3em" }}>Class</div>

          <div
            className="flex items-center  text-[35px] gap-5 mt-6 "
            style={{ marginBottom: "2px" }}
          >
            <div className="font-bold" style={{ letterSpacing: "0.3em" }}>
              Fresher Develop Operation
            </div>

            <Chip
              active="Planning"
              style={{
                backgroundColor: "#B9B9B9",
                width: "90px",
                fontSize: "16px",
              }}
            />
            <TfiMoreAlt style={{ marginLeft: "300px" }} />
          </div>
        </div>
        <hr
          style={{
            borderTop: "1px solid white",
            margin: "16px 0",
            width: "58%",
          }}
        />
        <div
          style={{
            fontSize: "17px",
            marginLeft: "30px",
            letterSpacing: "0.2em",
          }}
        >
          days<span style={{ fontStyle: "italic" }}> ( hours)</span> |
        </div>
      </div>

      <div className=" mt-[30px] ml-[20px] flex">
        <div>
          <div className=" bg-gray-400 p-2 rounded-lg  w-[373px] ">
            <div
              className=" flex  items-center cursor-pointer text-white ml-[20px] mr-[20px] "
              onClick={toggleExpansionGeneral}
            >
              <FaRegCalendar className=" w-[24px] h-[24px]" />
              <span className="ml-[10px] font-bold">General</span>
              <div className="ml-auto">
                {isExpandedGeneral ? <IoIosArrowDown /> : <IoIosArrowBack />}
              </div>
            </div>
          </div>
          {/* thông tin của General */}
          <div className="">
            {isExpandedGeneral && (
              <div className="rounded-lg w-[373px] h-[410px] bg-white border border-gray-800 ">
                <div className=" flex  w-[318px] h-[33px] mt-[20px] ml-[25px] items-center ">
                  <div className="flex items-center">
                    <Image
                      src="../assets/icons/alarm.svg"
                      alt=""
                      width={25}
                      height={24}
                    />
                    <span className="ml-[10px] font-bold">Time</span>
                  </div>
                  <div className="flex ml-[40px]">
                    <div>
                      <label htmlFor="inputFrom">from</label>
                      <input
                        type="text"
                        id="inputFrom"
                        name="from"
                        value={inputValue.from}
                        onChange={handleInputChange}
                        style={{
                          width: "59px",
                          height: "27px",
                          borderWidth: "2px",
                          borderRadius: "0px",
                          borderColor: "#DDDDDD",
                          marginLeft: "10px",
                        }}
                        className="border "
                      />
                    </div>
                    <div className="ml-[15px]">
                      <label htmlFor="inputTo">to</label>
                      <input
                        type="text"
                        id="inputTo"
                        name="to"
                        value={inputValue.to}
                        onChange={handleInputChange}
                        style={{
                          width: "50px",
                          height: "27px",
                          borderWidth: "2px",
                          borderRadius: "0px",
                          borderColor: "#DDDDDD",
                          marginLeft: "10px",
                        }}
                        className="border"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex ml-[25px] mt-[15px] ">
                  <MdOutlineHomeWork className="w-[24px] h-[24px]" />
                  <span className="ml-[10px]">Location</span>
                </div>
                <div className="flex ml-[25px] mt-[15px]">
                  <Image
                    src="../assets/icons/lecture.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="ml-[10px]">Trainer</span>
                </div>
                <div className="flex items-center ml-[25px] mt-[15px]">
                  <Image
                    src="../assets/icons/grade.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="font-bold ml-[10px]">Admin</span>
                  <select className="bg-transparent border-2 outline-none ml-[40px] w-[190px] h-[27px]">
                    <option>select</option>
                  </select>
                </div>
                <div>
                  <select className="bg-transparent border-2 outline-none ml-[150px] w-[190px] h-[27px] mt-[15px]">
                    <option>contact point</option>
                  </select>
                </div>
                <div className="flex items-center ml-[25px] mt-[15px]">
                  <Image
                    src="../assets/icons/supplier.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="font-bold ml-[10px] ">FSU</span>
                  <select className="bg-transparent border-2 outline-none ml-[60px] w-[190px] h-[27px]">
                    <option>select</option>
                  </select>
                </div>
                <hr
                  className="mt-[15px] ml-[20px] mr-[30px]"
                  style={{ borderTop: "1px solid black" }}
                />
                <div className="mt-[15px] ml-[25px]">
                  <span>Created</span>
                </div>
                <div className="mt-[15px] ml-[25px]">
                  <span>Review</span>
                </div>
                <div className="mt-[15px] mb-[20px] ml-[25px]">
                  <span>App</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className=" bg-gray-400 rounded-lg text-white mt-[30px] p-2 w-[373px] ">
              <div
                className=" flex justify-between items-center cursor-pointer ml-[20px] mr-[20px] "
                onClick={toggleExpansionAttended}
              >
                <MdStarBorderPurple500 className="w-[24px] h-[24px]" />

                <span className="font-bold" style={{ marginRight: "59%" }}>
                  Attended
                </span>
                {isExpandedAttended ? <IoIosArrowDown /> : <IoIosArrowBack />}
              </div>
            </div>
            {isExpandedAttended && (
              <div className=" text-white text-center">
                <div className="grid grid-cols-3 font-bold">
                  {/* Cột Planned */}
                  <div
                    className="bg-[#2D3748] p-2  "
                    style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    <div className="mt-[10px]  ">Planned</div>
                    <input
                      type="string"
                      defaultValue=""
                      placeholder=""
                      className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px] "
                    />
                  </div>
                  {/* Cột Accepted */}
                  <div className=" p-2 border  bg-blue-600">
                    <div className="mt-[10px]">Accepted </div>
                    <input
                      type="string"
                      defaultValue=""
                      placeholder=""
                      className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px]"
                    />
                  </div>
                  {/* Cột Actual */}
                  <div
                    className=" p-2 border  bg-gray-400 text-black"
                    style={{
                      borderBottomRightRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div className="mt-[10px]">Actual</div>
                    <input
                      type="string"
                      defaultValue=""
                      placeholder=""
                      className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className=" bg-gray-400 p-2 rounded-lg  text-white ml-[20px] w-[746px] ">
            <div
              className=" flex justify-between items-center cursor-pointer ml-[20px] mr-[20px] "
              onClick={toggleExpansionTimeFrame}
            >
              <FaRegCalendar className="w-[24px] h-[24px]" />
              <span className="font-bold" style={{ marginRight: "50%" }}>
                Time Frame
              </span>
              <div>
                <span style={{ marginRight: "10px" }}>25-Apr-22</span>
                <span style={{ marginRight: "10px" }}>to</span>
                <span>21-Fuly-22</span>
              </div>

              {isExpandedTimeFrame ? <IoIosArrowDown /> : <IoIosArrowBack />}
            </div>
          </div>
          {isExpandedTimeFrame && <div>{/* <DatePicker /> */}</div>}
        </div>
      </div>
      <div className="mt-[30px] ml-[20px]">
        <Tab />
      </div>
      <div className="ml-[20px]">
        <div className=" white-box border-2 bg-primary-color border-gray-400 h-[95px] text-white ">
          <div
            className="  items-center font-bold  "
            style={{ letterSpacing: "0.3em" }}
          >
            <span className="ml-[20px] text-[25px] ">DevOps Foundation</span>
            <button className="ml-[20px] ">
              <Image
                src="../assets/icons/create.svg"
                alt=""
                width={30}
                height={30}
                className="bg-white rounded-lg "
              />
            </button>
          </div>
          <div className="flex">
            <div style={{ fontSize: "17px", marginLeft: "30px" }}>
              31 days<span style={{ fontStyle: "italic" }}> (97 hours)</span> |
            </div>
            <div className="ml-[10px]">
              Modified on 23/07/2022 by Warrior Tran
            </div>
          </div>
        </div>
        <div className="mt-[10px]">
          <SyllabusCard />
        </div>
        <div
          className=" white-box border-2 bg-primary-color h-[16px] mt-[10px]"
          style={{
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        ></div>
      </div>
    </div>
  );
};
export default CreateClassDetailPage;
