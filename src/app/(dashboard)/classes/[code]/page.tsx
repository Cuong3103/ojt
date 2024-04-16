// "use client";
// import React, { useEffect } from "react";
// import { FC } from "react";
// import { Chip } from "@/app/components/chip/chip";
// import { TfiMoreAlt } from "react-icons/tfi";
// import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
// import { FaRegCalendar } from "react-icons/fa";
// import { useState } from "react";
// import Image from "next/image";
// import { Tab } from "@/app/components/syllabus-tab/tab";
// import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";
// import { FaPen } from "react-icons/fa";
// import { FaTrashCan } from "react-icons/fa6";
// import "./viewClassDetail.css";
// import { IoIosInformationCircle } from "react-icons/io";
// import { MdOutlinePhoneInTalk } from "react-icons/md";
// import { MdOutlineEmail } from "react-icons/md";
// import { usePathname, useSearchParams } from "next/navigation";
// import { DatePicker, Space, theme } from "antd";
// import type { GetProps } from "antd";
// import dayjs from "dayjs";
// import type { Dayjs } from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import type { CellRenderInfo } from "rc-picker/es/interface";
// import { getClassByID } from "@/services/classes";
// import { Class } from "@/types/class.type";
// import {
//   convertMillisecondsToHoursAndMinutes,
//   fromTimestampToDateString,
// } from "@/utils/formatUtils";
// import { Program, User } from "@/types/models/user.model.type";
// import TrainingProgramViewDetail from "./trainingProgram/trainingProgram";
// import { getUserByUUID } from "@/services/users";
// import UpdateClass from "./updateClass/updateClass";

// type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

// dayjs.extend(customParseFormat);

// const { RangePicker } = DatePicker;

// const ViewClassDetail: FC = () => {
//   const [isEdit, setIsEdit] = useState<boolean>(false);
//   const [isExpandedGeneral, setIsExpandedGeneral] = useState(true);
//   const [isExpandedAttended, setIsExpandedAttended] = useState(true);
//   const [isExpandedTimePicker, setIsExpandedTimePicker] = useState(true);
//   const [selectedTab, setSelectedTab] = useState("Training Program");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [data, setData] = useState<Class>();
//   const [totalDays, setTotalDays] = useState<number>();
//   const [totalTimes, settotalTimes] = useState<string | undefined>(undefined);
//   const [admins, setAdmins] = useState<User[]>([]);
//   const [trainers, setTrainers] = useState<User[]>([]);

//   const router = usePathname();
//   const classId = router.split("/")[2];

//   const handleEdit = () => {
//     setIsEdit(!isEdit);

//   }
//   console.log('edit status: ', isEdit);

//   const disabledDate: RangePickerProps["disabledDate"] = (current: any) => {
//     const startDatePicker = dayjs(startDate, dateFormat);
//     const endDatePicker = dayjs(endDate, dateFormat);
//     const today = dayjs().endOf("day");
//     return (
//       current &&
//       (current < startDatePicker ||
//         (current >= startDatePicker && current <= endDatePicker) ||
//         current > endDatePicker ||
//         current > today)
//     );
//   };

//   const dateCellRender = (value: dayjs.ConfigType) => {
//     if (value && dayjs(value).isValid()) {
//       const dayOfWeek = dayjs(value).day();
//       const startDatePicker = dayjs(startDate, dateFormat);
//       const endDatePicker = dayjs(endDate, dateFormat);
//       if (
//         (dayjs(value).isSame(startDatePicker, "day") ||
//           dayjs(value).isSame(endDatePicker, "day") ||
//           (dayjs(value).isAfter(startDatePicker) &&
//             dayjs(value).isBefore(endDatePicker))) &&
//         (dayOfWeek === 1 || dayOfWeek === 4)
//       ) {
//         return (
//           <div
//             className="custom-date"
//             style={{
//               border: "1px solid white",
//               borderRadius: "50%",
//               color: "white",
//               backgroundColor: "black",
//               width: "26px",
//               height: "26px",
//               textAlign: "center",
//             }}
//           >
//             {dayjs(value).date()}
//           </div>
//         );
//       }
//     }

//     return value ? dayjs(value).date() : null;
//   };

//   const getClassList = async () => {
//     const response = await getClassByID(+classId);
//     setData(response.content as any);
//   };
//   useEffect(() => {
//     getClassList();
//   }, [classId]);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       if (data?.adminIds) {
//         setLoading(true);
//         try {
//           const responses = await Promise.all(
//             data.adminIds.map((id) => getUserByUUID(+id))
//           );
//           setAdmins(responses.map((response) => response.content || []));
//         } catch (error) {
//           console.error("Error fetching syllabuses:", error);
//         }
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, [data]);

//   useEffect(() => {
//     const fetchTrainers = async () => {
//       if (data?.trainerIds) {
//         setLoading(true);
//         try {
//           const responses = await Promise.all(
//             data.trainerIds.map((id) => getUserByUUID(+id))
//           );
//           setTrainers(responses.map((response) => response.content || []));
//         } catch (error) {
//           console.error("Error fetching syllabuses:", error);
//         }
//         setLoading(false);
//       }
//     };

//     fetchTrainers();
//   }, [data]);

//   const handleSyllabusData = (totalDays: number, totalTimes: number) => {
//     setTotalDays(totalDays);
//     settotalTimes(convertMillisecondsToHoursAndMinutes(totalTimes));
//   };

//   const toggleExpansionGeneral = () => {
//     setIsExpandedGeneral(!isExpandedGeneral);
//   };
//   const toggleExpansionAttended = () => {
//     setIsExpandedAttended(!isExpandedAttended);
//   };
//   const toggleExpansionTimePicker = () => {
//     setIsExpandedTimePicker(!isExpandedTimePicker);
//   };

//   const handleTabChange = (tabName: string) => {
//     setSelectedTab(tabName);
//   };
//   const handleRenderPage = (page: string) => {
//     if (page === "Training Program") {
//       return (
//         <TrainingProgramViewDetail
//           programId={data?.trainingProgramId}
//           onSyllabusData={handleSyllabusData}
//         />
//       );
//     } else if (page === "Attendee List") {
//       return;
//     } else if (page === "Budgets") {
//       return;
//     } else if (page === "Others") {
//       return;
//     }
//   };

//   const createDate = fromTimestampToDateString(
//     data?.createdDate && data?.createdDate / 1000
//   );

//   const startDate = fromTimestampToDateString(data?.startDate);
//   const endDate = fromTimestampToDateString(data?.endDate);
//   const dateFormat = "DD/MM/YYYY";

//   const startTime = data?.startTime.slice(0, 5);

//   const endTime = data?.endTime.slice(0, 5);

//   return (
//     <div className="view-class-detail">
//       <div className="big-label">
//         <div className="class-text">Class</div>
//         <div className="class-container">
//           <div className="class-wrapper">
//             <h1 className="fresher-label"> {data?.name}</h1>
//             <Chip
//               active={data?.classStatus}
//               style={{
//                 backgroundColor: "#B9B9B9",
//                 padding: "10px",
//                 fontSize: "16px",
//                 marginLeft: "30px",
//                 color: "#FFFFFF",
//               }}
//             />
//           </div>
//           <div>
//             <details
//               className="dropdown dropdown-end"
//               style={{ marginLeft: "300px" }}
//             >
//               <summary className="btn btn-ghost rounded-btn ">
//                 {<TfiMoreAlt fontSize={"30px"} color="white" />}
//               </summary>
//               <ul className="p-1 menu dropdown-content z-[1] bg-white w-40">
//                 <li className="text-blue-600">
//                   <a onClick={handleEdit}>
//                     <FaPen /> Edit Class
//                   </a>
//                 </li>
//               </ul>
//             </details>
//           </div>
//         </div>
//         <div className="class-code">{data?.code}</div>
//         <div
//           className="line"
//           style={{ color: "white", margin: "10px 0" }}
//         ></div>
//         <div>
//           <span className="hours">
//             {totalDays} days ({totalTimes})
//           </span>
//         </div>
//       </div>
//       <div className="div-to-giua">
//         <div className="flex">
//           <div className="general-container">
//             <div className="general-label">
//               <div className="general">
//                 <FaRegCalendar fontSize={24} color="white" />
//                 <p className="general-text">General</p>
//               </div>
//               <div onClick={toggleExpansionGeneral}>
//                 {/* <IoIosArrowDown color='white' style={{cursor:'pointer'}}/> */}
//                 {isExpandedGeneral ? (
//                   <IoIosArrowDown color="white" style={{ cursor: "pointer" }} />
//                 ) : (
//                   <IoIosArrowBack color="white" style={{ cursor: "pointer" }} />
//                 )}
//               </div>
//             </div>

//             {isExpandedGeneral && (
//               <div className="general-content-wrapper">
//                 <div className="general-content">
//                   <div className="general-icon">
//                     <Image
//                       src="../assets/icons/alarm.svg"
//                       alt=""
//                       width={24}
//                       height={24}
//                     />
//                     <p className="text">Class time</p>
//                   </div>
//                   <div className="time">
//                     {startTime} - {endTime}
//                   </div>
//                 </div>

//                 <div className="general-content">
//                   <div className="general-icon">
//                     <Image
//                       src="../assets/icons/location.svg"
//                       alt=""
//                       width={24}
//                       height={24}
//                     />
//                     <p className="text">Location</p>
//                   </div>
//                   <div className="time">{data?.location}</div>
//                 </div>

//                 <div className="general-content">
//                   <div className="general-icon">
//                     <Image
//                       src="../assets/icons/trainer.svg"
//                       alt=""
//                       width={24}
//                       height={24}
//                     />
//                     <p className="text">Trainer</p>
//                   </div>
//                   <div className="time">
//                     {trainers.length > 0 &&
//                       trainers.map((trainer) => (
//                         <div className="text-more-info">
//                           {trainer.firstName + " " + trainer.lastName}

//                           <div className="dropdown dropdown-hover dropdown-top">
//                             <div tabIndex={0} style={{ cursor: "pointer" }}>
//                               <IoIosInformationCircle color="#2F903F" />
//                             </div>
//                             <ul
//                               tabIndex={0}
//                               className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
//                             >
//                               <li>
//                                 <span>
//                                   <MdOutlinePhoneInTalk />{" "}
//                                   <span>{trainer.phone}</span>
//                                 </span>
//                               </li>
//                               <li>
//                                 <span>
//                                   <MdOutlineEmail />
//                                   <span>{trainer.email}</span>
//                                 </span>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>

//                 <div className="general-content">
//                   <div className="general-icon">
//                     <Image
//                       src="../assets/icons/star.svg"
//                       alt=""
//                       width={24}
//                       height={24}
//                     />
//                     <p className="text">Admin</p>
//                   </div>
//                   <div className="time">
//                     {admins.length > 0 &&
//                       admins.map((admin) => (
//                         <div className="text-more-info">
//                           {admin.firstName + " " + admin.lastName}
//                           <div className="dropdown dropdown-hover dropdown-top">
//                             <div tabIndex={0} style={{ cursor: "pointer" }}>
//                               <IoIosInformationCircle color="#2F903F" />
//                             </div>
//                             <ul
//                               tabIndex={0}
//                               className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-55"
//                             >
//                               <li>
//                                 <span>
//                                   <MdOutlinePhoneInTalk />{" "}
//                                   <span>{admin.phone}</span>
//                                 </span>
//                               </li>
//                               <li>
//                                 <span>
//                                   <MdOutlineEmail />
//                                   <span>{admin.email}</span>
//                                 </span>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>

//                 <div className="general-content">
//                   <div className="general-icon">
//                     <Image
//                       src="../assets/icons/starWithCircle.svg"
//                       alt=""
//                       width={24}
//                       height={24}
//                     />
//                     <p className="text">FSU</p>
//                   </div>
//                   <div className="time">{data?.fsu}</div>
//                 </div>

//                 <div className="line" style={{ color: "#000" }}></div>

//                 <div className="general-content">
//                   <div style={{ fontWeight: "bold" }} className="general-icon">
//                     Created
//                   </div>
//                   <div className="time">
//                     {createDate} by {data?.createBy}
//                   </div>
//                 </div>

//                 <div className="general-content">
//                   <div style={{ fontWeight: "bold" }} className="general-icon">
//                     Review
//                   </div>
//                   <div className="time"></div>
//                 </div>

//                 <div className="general-content">
//                   <div style={{ fontWeight: "bold" }} className="general-icon">
//                     Approve
//                   </div>
//                   <div className="time"></div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="time-picker-container">
//             <div className="time-picker-label">
//               <div className="general">
//                 <FaRegCalendar fontSize={24} color="white" />
//                 <p className="general-text">Time Frame</p>
//                 <div className="time-text">
//                   {/* <RangePicker
//                     defaultValue={[
//                       dayjs(parsedStartDate, dateFormat),
//                       dayjs(parsedEndDate, dateFormat),
//                     ]}
//                     // cellRender={dateCellRender}
//                     // disabledDate={disabledDate}
//                     style={{ color: "black" }}
//                     allowClear={false}
//                   /> */}
//                   <Space>
//                     <RangePicker
//                       defaultValue={[
//                         dayjs(startDate, dateFormat).isValid()
//                           ? dayjs(startDate, dateFormat)
//                           : null,
//                         dayjs(endDate, dateFormat).isValid()
//                           ? dayjs(endDate, dateFormat)
//                           : null,
//                       ]}
//                       format={dateFormat}
//                       style={{ color: "black" }}
//                       allowClear={false}
//                     />
//                   </Space>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="general-container">
//           <div className="general-label">
//             <div className="general">
//               <Image
//                 src="../assets/icons/star.svg"
//                 alt=""
//                 width={24}
//                 height={24}
//               />
//               <p className="general-text">Attendee</p>
//               <p className="fresher-text">{data?.attendee}</p>
//             </div>
//             <div onClick={toggleExpansionAttended}>
//               {isExpandedAttended ? (
//                 <IoIosArrowDown color="white" style={{ cursor: "pointer" }} />
//               ) : (
//                 <IoIosArrowBack color="white" style={{ cursor: "pointer" }} />
//               )}
//             </div>
//           </div>

//           {isExpandedAttended && (
//             <div className="attendee-container ">
//               <div className="grid grid-cols-3 font-bold">
//                 <div className="planned-wrapper">
//                   <div className="planned-text">Planned</div>
//                   <div className="planned-text">{data?.attendeePlanned}</div>
//                 </div>

//                 <div className="accepted-wrapper">
//                   <div className="accepted-text">Accepted</div>
//                   <div className="accepted-text">{data?.attendeeAccepted}</div>
//                 </div>

//                 <div className="actual-wrapper">
//                   <div className="actual-text">Actual</div>
//                   <div className="actual-text">{data?.attendeeActual}</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-[30px] ml-[20px]">
//         <div className="">
//           <Tab
//             onTabPageChange={handleTabChange}
//             tabLabels={[
//               "Training Program",
//               "Attendee List",
//               "Budgets",
//               "Others",
//             ]}
//           />
//         </div>
//         {/**=======HANDLE CHANGE PAGE ========== */}
//         <div>{handleRenderPage(selectedTab)}</div>
//       </div>
//       {isEdit &&
//         <UpdateClass/>
//       }

//     </div>

//   );
// };
// export default ViewClassDetail;

"use client";
import React, { ChangeEvent, useEffect } from "react";
import { FC } from "react";
import { Chip } from "@/app/components/chip/chip";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { FaPen } from "react-icons/fa";
import "./viewClassDetail.css";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { Button } from "@/app/components/button/button";
import { usePathname, useSearchParams } from "next/navigation";
import { DatePicker, Space, theme } from "antd";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getClassByID } from "@/services/classes";
import { Class } from "@/types/class.type";
import {
  convertMillisecondsToHoursAndMinutes,
  fromTimestampToDateString,
} from "@/utils/formatUtils";
import { Program, User } from "@/types/models/user.model.type";
import TrainingProgramViewDetail from "./trainingProgram/trainingProgram";
import { getUserByUUID } from "@/services/users";
import UpdateClass from "./updateClass/updateClass";
import Link from "next/link";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const ViewClassDetail: FC = () => {
  const [isExpandedGeneral, setIsExpandedGeneral] = useState(true);
  const [isExpandedAttended, setIsExpandedAttended] = useState(true);
  const [isExpandedTimePicker, setIsExpandedTimePicker] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Training Program");
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Class>();
  const [totalDays, setTotalDays] = useState<number>();
  const [totalTimes, settotalTimes] = useState<string | undefined>(undefined);
  const [admins, setAdmins] = useState<User[]>([]);
  const [trainers, setTrainers] = useState<User[]>([]);

  const router = usePathname();
  const classId = router.split("/")[2];


  const disabledDate: RangePickerProps["disabledDate"] = (current: any) => {
    const startDatePicker = dayjs(startDate, dateFormat);
    const endDatePicker = dayjs(endDate, dateFormat);
    const today = dayjs().endOf("day");
    return (
      current &&
      (current < startDatePicker ||
        (current >= startDatePicker && current <= endDatePicker) ||
        current > endDatePicker ||
        current > today)
    );
  };

  const dateCellRender = (value: dayjs.ConfigType) => {
    if (value && dayjs(value).isValid()) {
      const dayOfWeek = dayjs(value).day();
      const startDatePicker = dayjs(startDate, dateFormat);
      const endDatePicker = dayjs(endDate, dateFormat);
      if (
        (dayjs(value).isSame(startDatePicker, "day") ||
          dayjs(value).isSame(endDatePicker, "day") ||
          (dayjs(value).isAfter(startDatePicker) &&
            dayjs(value).isBefore(endDatePicker))) &&
        (dayOfWeek === 1 || dayOfWeek === 4)
      ) {
        return (
          <div
            className="custom-date"
            style={{
              border: "1px solid white",
              borderRadius: "50%",
              color: "white",
              backgroundColor: "black",
              width: "26px",
              height: "26px",
              textAlign: "center",
            }}
          >
            {dayjs(value).date()}
          </div>
        );
      }
    }

    return value ? dayjs(value).date() : null;
  };

  const getClassList = async () => {
    const response = await getClassByID(+classId);
    setData(response.content as any);
  };
  useEffect(() => {
    getClassList();
  }, [classId]);

  useEffect(() => {
    const fetchAdmins = async () => {
      if (data?.adminIds) {
        setLoading(true);
        try {
          const responses = await Promise.all(
            data.adminIds.map((id) => getUserByUUID(+id))
          );
          setAdmins(responses.map((response) => response.content || []));
        } catch (error) {
          console.error("Error fetching syllabuses:", error);
        }
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [data]);

  useEffect(() => {
    const fetchTrainers = async () => {
      if (data?.trainerIds) {
        setLoading(true);
        try {
          const responses = await Promise.all(
            data.trainerIds.map((id) => getUserByUUID(+id))
          );
          setTrainers(responses.map((response) => response.content || []));
        } catch (error) {
          console.error("Error fetching syllabuses:", error);
        }
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [data]);

  const handleSyllabusData = (totalDays: number, totalTimes: number) => {
    setTotalDays(totalDays);
    settotalTimes(convertMillisecondsToHoursAndMinutes(totalTimes));
  };

  const toggleExpansionGeneral = () => {
    setIsExpandedGeneral(!isExpandedGeneral);
  };
  const toggleExpansionAttended = () => {
    setIsExpandedAttended(!isExpandedAttended);
  };
  const toggleExpansionTimePicker = () => {
    setIsExpandedTimePicker(!isExpandedTimePicker);
  };

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };
  const handleRenderPage = (page: string) => {
    if (page === "Training Program") {
      return (
        <TrainingProgramViewDetail
          programId={data?.trainingProgramId}
          onSyllabusData={handleSyllabusData}
        />
      );
    } else if (page === "Attendee List") {
      return;
    } else if (page === "Budgets") {
      return;
    } else if (page === "Others") {
      return;
    }
  };

  const createDate = fromTimestampToDateString(
    data?.createdDate && data?.createdDate / 1000
  );

  const startDate = fromTimestampToDateString(data?.startDate);
  const endDate = fromTimestampToDateString(data?.endDate);
  const dateFormat = "DD/MM/YYYY";

  const startTime = data?.startTime.slice(0, 5);

  const endTime = data?.endTime.slice(0, 5);

  return (
    <div className="view-class-detail">
      <div className="big-label">
        <div className="class-text">Class</div>
        <div className="class-container">
          <div className="class-wrapper">
            
              <h1 className="fresher-label"> {data?.name}</h1>
            

            <Chip
              active={data?.classStatus}
              style={{
                backgroundColor: "#B9B9B9",
                padding: "10px",
                fontSize: "16px",
                marginLeft: "30px",
                color: "#FFFFFF",
              }}
            />
          </div>
          <div>
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
              </ul>
            </details>
          </div>
        </div>
        <div className="class-code">{data?.code}</div>
        <div
          className="line"
          style={{ color: "white", margin: "10px 0" }}
        ></div>
        <div>
          <span className="hours">
            {totalDays} days ({totalTimes})
          </span>
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
                  <div className="time">
                    {startTime} - {endTime}
                  </div>
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
                  <div className="time">{data?.location}</div>
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
                    {trainers.length > 0 &&
                      trainers.map((trainer) => (
                        <div className="text-more-info" key={0}>
                          {trainer.firstName + " " + trainer.lastName}

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
                                  <MdOutlinePhoneInTalk />{" "}
                                  <span>{trainer.phone}</span>
                                </span>
                              </li>
                              <li>
                                <span>
                                  <MdOutlineEmail />
                                  <span>{trainer.email}</span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
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
                    {admins.length > 0 &&
                      admins.map((admin) => (
                        <div className="text-more-info" key={0}>
                          {admin.firstName + " " + admin.lastName}
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
                                  <MdOutlinePhoneInTalk />{" "}
                                  <span>{admin.phone}</span>
                                </span>
                              </li>
                              <li>
                                <span>
                                  <MdOutlineEmail />
                                  <span>{admin.email}</span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
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
                  <div className="time">{data?.fsu}</div>
                </div>

                <div className="line" style={{ color: "#000" }}></div>

                <div className="general-content">
                  <div style={{ fontWeight: "bold" }} className="general-icon">
                    Created
                  </div>
                  <div className="time">
                    {createDate} by {data?.createBy}
                  </div>
                </div>

                <div className="general-content">
                  <div style={{ fontWeight: "bold" }} className="general-icon">
                    Review
                  </div>
                  <div className="time"></div>
                </div>

                <div className="general-content">
                  <div style={{ fontWeight: "bold" }} className="general-icon">
                    Approve
                  </div>
                  <div className="time"></div>
                </div>
              </div>
            )}
          </div>

          <div className="time-picker-container">
            <div className="time-picker-label">
              <div className="general">
                <FaRegCalendar fontSize={24} color="white" />
                <p className="general-text">Time Frame</p>
                <span className="time-text">{startDate} - {endDate  }</span> 
                <div className="time-text">
                  {/* <RangePicker
                    defaultValue={[
                      dayjs(startDate, dateFormat),
                      dayjs(endDate, dateFormat),
                    ]}
                    // cellRender={dateCellRender}
                    // disabledDate={disabledDate}
                    style={{ color: "black" }}
                    allowClear={false}
                  /> */}
                </div>
              </div>
            </div>
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
              <p className="fresher-text">{data?.attendee}</p>
            </div>
            <div onClick={toggleExpansionAttended}>
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
                  <div className="planned-text">{data?.attendeePlanned}</div>
                </div>

                <div className="accepted-wrapper">
                  <div className="accepted-text">Accepted</div>
                  <div className="accepted-text">{data?.attendeeAccepted}</div>
                </div>

                <div className="actual-wrapper">
                  <div className="actual-text">Actual</div>
                  <div className="actual-text">{data?.attendeeActual}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[30px] ml-[20px]">
        <div className="">
          <Tab
            onTabPageChange={handleTabChange}
            tabLabels={[
              "Training Program",
              "Attendee List",
              "Budgets",
              "Others",
            ]}
          />
        </div>
        {/**=======HANDLE CHANGE PAGE ========== */}
        <div>{handleRenderPage(selectedTab)}</div>
      </div>
    </div>
  );
};
export default ViewClassDetail;
