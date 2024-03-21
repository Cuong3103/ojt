"use client";
import React from "react";
import { FC } from "react";
import { Chip } from "@/app/components/chip/chip";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import dayjs, { Dayjs } from "dayjs";
import "./viewClassDetail.css";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, GetProps } from "antd";
import { ConfigProvider } from "antd";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;

const onChange = (
  value: DatePickerProps["value"] | RangePickerProps["value"],
  dateString: [string, string] | string
) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
  console.log("onOk: ", value);
};

const ViewClassDetail: FC = () => {
  const [isExpandedGeneral, setIsExpandedGeneral] = useState(true);
  const [isExpandedAttended, setIsExpandedAttended] = useState(true);
  const [isExpandedTimePicker, setIsExpandedTimePicker] = useState(true);

  const toggleExpansionGeneral = () => {
    setIsExpandedGeneral(!isExpandedGeneral);
  };
  const toggleExpansionAttended = () => {
    setIsExpandedAttended(!isExpandedAttended);
  };
  const toggleExpansionTimePicker = () => {
    setIsExpandedTimePicker(!isExpandedTimePicker);
  };

  return (
    <div className="div-to-nhat">
      <div className="div-to-tren">
        <div className="class-text">Class</div>
        <div className="class-container">
          <div className="class-wrapper">
            <h1 className="fresher-label"> Fresher Develop Operation</h1>
            <Chip
              active="Planning"
              style={{
                backgroundColor: "#B9B9B9",
                width: "90px",
                fontSize: "16px",
                marginLeft: "30px",
              }}
            />
          </div>
          <div>
            {/* <TfiMoreAlt fontSize={'30px'} color='white'/> */}
            <details
              className="dropdown dropdown-end"
              style={{ marginLeft: "300px" }}
            >
              <summary className="btn btn-ghost rounded-btn ">
                {<TfiMoreAlt fontSize={"30px"} color="white" />}
              </summary>
              <ul className="p-1 menu dropdown-content z-[1] bg-white w-40">
                <li className="text-blue-600">
                  <a>
                    <FaPen /> Edit Class
                  </a>
                </li>
                <li className="text-blue-600">
                  <a>
                    <FaTrashCan /> Delete Class
                  </a>
                </li>
              </ul>
            </details>
          </div>
        </div>
        <div className="class-code">HCM22_FR_DevOps_01</div>
        <div
          className="line"
          style={{ color: "white", margin: "10px 0" }}
        ></div>
        <div>
          <span className="day-number">31</span>
          <span className="day-text"> days </span>
          <span className="hours">(97 hours)</span>
        </div>
      </div>

      <div className="div-to-giua">
        <div className="flex">
          <div className="general-container">
            <div className="general-label">
              <div className="general">
                <FaRegCalendar fontSize={24} color="white" />
                <p className="general-text">General</p>
              </div>
              <div onClick={toggleExpansionGeneral}>
                {/* <IoIosArrowDown color='white' style={{cursor:'pointer'}}/> */}
                {isExpandedGeneral ? (
                  <IoIosArrowDown color="white" style={{ cursor: "pointer" }} />
                ) : (
                  <IoIosArrowBack color="white" style={{ cursor: "pointer" }} />
                )}
              </div>
            </div>

            {isExpandedGeneral && (
              <div className="general-content-wrapper">
                <div className="general-content">
                  <div className="general-icon">
                    <Image
                      src="../assets/icons/alarm.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p className="text">Class time</p>
                  </div>
                  <div className="time">09:00 - 12:00</div>
                </div>

                <div className="general-content">
                  <div className="general-icon">
                    <Image
                      src="../assets/icons/location.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p className="text">Location</p>
                  </div>
                  <div className="time">
                    F-town 2 <br />
                    F-town 1
                  </div>
                </div>

                <div className="general-content">
                  <div className="general-icon">
                    <Image
                      src="../assets/icons/trainer.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p className="text">Trainer</p>
                  </div>
                  <div className="time">
                    <div className="text-more-info">
                      Dinh Vu Quoc Trung
                      <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} style={{ cursor: "pointer" }}>
                          <IoIosInformationCircle color="#2F903F" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
                        >
                          <li>
                            <span>
                              <MdOutlinePhoneInTalk /> <span>097899084</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdOutlineEmail />
                              <span>TrungDVQ@fsoft.com.vn</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-more-info">
                      Dinh Vu Quoc Trung
                      <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} style={{ cursor: "pointer" }}>
                          <IoIosInformationCircle color="#2F903F" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
                        >
                          <li>
                            <span>
                              <MdOutlinePhoneInTalk /> <span>097899084</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdOutlineEmail />
                              <span>TrungDVQ@fsoft.com.vn</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-more-info">
                      Dinh Vu Quoc Trung
                      <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} style={{ cursor: "pointer" }}>
                          <IoIosInformationCircle color="#2F903F" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
                        >
                          <li>
                            <span>
                              <MdOutlinePhoneInTalk /> <span>097899084</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdOutlineEmail />
                              <span>TrungDVQ@fsoft.com.vn</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-more-info">
                      Dinh Vu Quoc Trung
                      <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} style={{ cursor: "pointer" }}>
                          <IoIosInformationCircle color="#2F903F" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
                        >
                          <li>
                            <span>
                              <MdOutlinePhoneInTalk /> <span>097899084</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdOutlineEmail />
                              <span>TrungDVQ@fsoft.com.vn</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="general-content">
                  <div className="general-icon">
                    <Image
                      src="../assets/icons/star.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p className="text">Admin</p>
                  </div>
                  <div className="time">
                  <div className="text-more-info">
                      Dinh Vu Quoc Trung
                      <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} style={{ cursor: "pointer" }}>
                          <IoIosInformationCircle color="#2F903F" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
                        >
                          <li>
                            <span>
                              <MdOutlinePhoneInTalk /> <span>097899084</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdOutlineEmail />
                              <span>TrungDVQ@fsoft.com.vn</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="text-more-info">
                      Dinh Vu Quoc Trung
                      <div className="dropdown dropdown-hover dropdown-top">
                        <div tabIndex={0} style={{ cursor: "pointer" }}>
                          <IoIosInformationCircle color="#2F903F" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
                        >
                          <li>
                            <span>
                              <MdOutlinePhoneInTalk /> <span>097899084</span>
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdOutlineEmail />
                              <span>TrungDVQ@fsoft.com.vn</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div className="general-content">
                  <div className="general-icon">
                    <Image
                      src="../assets/icons/starWithCircle.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <p className="text">FSU</p>
                  </div>
                  <div className="time">
                    FHM <br />
                    BAch@fsoft.com.vn
                  </div>
                </div>

                <div className="line" style={{ color: "#000" }}></div>

                <div className="general-content">
                  <div style={{ fontWeight: "bold" }} className="general-icon">
                    Created
                  </div>
                  <div className="time">25/03/2022 by DanPL</div>
                </div>

                <div className="general-content">
                  <div style={{ fontWeight: "bold" }} className="general-icon">
                    Review
                  </div>
                  <div className="time">30/03/2022 by TrungDVQ</div>
                </div>

                <div className="general-content">
                  <div style={{ fontWeight: "bold" }} className="general-icon">
                    Approve
                  </div>
                  <div className="time">02/04/2022 by VongNT</div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="time-picker-container">
            <div className="time-picker-wrapper">
              <div className="general">
                <FaRegCalendar fontSize={24} color="white" />
                <p className="general-text">Time Frame</p>
              </div>
              <div onClick={toggleExpansionTimePicker}>
                {isExpandedTimePicker ? (
                  <IoIosArrowDown color="white" style={{ cursor: "pointer" }} />
                ) : (
                  <IoIosArrowBack color="white" style={{ cursor: "pointer" }} />
                )}
              </div>
            </div>
            {isExpandedTimePicker && <div>hello</div>}
          </div> */}

          <div className="time-picker-container">
            <div className="time-picker-label">
              <div className="general">
                <FaRegCalendar fontSize={24} color="white" />
                <p className="general-text">Time Frame</p>
              </div>
              <div onClick={toggleExpansionTimePicker}>
                {/* <IoIosArrowDown color='white' style={{cursor:'pointer'}}/> */}
                {isExpandedTimePicker ? (
                  <IoIosArrowDown color="white" style={{ cursor: "pointer" }} />
                ) : (
                  <IoIosArrowBack color="white" style={{ cursor: "pointer" }} />
                )}
              </div>
            </div>

            {isExpandedTimePicker && (
              <div className="time-picker-expand">
                <div className="time-picker-expand-content">
                  <div>Date-time here</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="general-container">
          <div className="general-label">
            <div className="general">
              <Image
                src="../assets/icons/star.svg"
                alt=""
                width={24}
                height={24}
              />
              <p className="general-text">Attendee</p>
              <p className="fresher-text">Fresher</p>
            </div>
            <div onClick={toggleExpansionAttended}>
              {/* <IoIosArrowDown color='white' style={{cursor:'pointer'}}/> */}
              {isExpandedAttended ? (
                <IoIosArrowDown color="white" style={{ cursor: "pointer" }} />
              ) : (
                <IoIosArrowBack color="white" style={{ cursor: "pointer" }} />
              )}
            </div>
          </div>

          {isExpandedAttended && (
            <div className="attendee-container ">
              <div className="grid grid-cols-3 font-bold">
                <div className="planned-wrapper">
                  <div className="planned-text">Planned</div>
                  <div className="planned-text">10</div>
                </div>

                <div className="accepted-wrapper">
                  <div className="accepted-text">Accepted</div>
                  <div className="accepted-text">9</div>
                </div>

                <div className="actual-wrapper">
                  <div className="actual-text">Actual</div>
                  <div className="actual-text">9</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[30px] ml-[20px]">
        <Tab />
      </div>
      <div className="ml-[20px]">
        <div className=" white-box border-2 bg-primary-color border-gray-400 h-[95px] text-white ">
          <div
            className="items-center font-bold mt-[10px] mb-[10px]  "
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
          <div className="flex mb-[5px] ml-[20px]">
            <div style={{ fontSize: "17px" }}>
              31 days<span style={{ fontStyle: "italic" }}> (97 hours)</span> |
            </div>
            <div>Modified on 23/07/2022 by Warrior Tran</div>
          </div>
        </div>
        <div className="mt-[10px]">
          <SyllabusCard />
          <SyllabusCard />
          <SyllabusCard />
          <SyllabusCard />
          <SyllabusCard />
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
export default ViewClassDetail;
