"use client";
import { ChangeEvent, FC, useEffect } from "react";
import { Chip } from "@/app/components/chip/chip";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaRegCalendar } from "react-icons/fa";
import { useState } from "react";
import { MdStarBorderPurple500 } from "react-icons/md";
import { MdOutlineHomeWork } from "react-icons/md";
import Image from "next/image";
import { Tab } from "@/app/components/syllabus-tab/tab";
import { Button } from "@/app/components/button/button";
import { ConfigProvider, DatePicker, TimePicker, Select } from "antd";
import dayjs from "dayjs";
import {
  convertDateToTimestamp,
  convertMillisecondsToHoursAndMinutes,
  fromDateToTimestamp,
  fromTimestampToDateString,
} from "@/utils/formatUtils";
import type { GetProps, SelectProps } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ClassBody } from "@/types/class.type";
import { createClass } from "@/services/classes";
import { Dropdown } from "@/app/components/dropdown/dropdown";
import { Program, User } from "@/types/models/user.model.type";
import { fetchUserList } from "@/services/users";
import { toast } from "react-toastify";
import Link from "next/link";
import TrainingProgram from "./trainingProgram/trainingProgram";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

type ClassDetailPageProps = {
  className: string;
  handleBack: () => void;
};

const CreateClassDetailPage: FC<ClassDetailPageProps> = ({
  className,
  handleBack,
}) => {
  const [isExpandedGeneral, setIsExpandedGeneral] = useState(true);
  const [isExpandedTimeFrame, setIsExpandedTimeFrame] = useState(false);
  const [isExpandedAttended, setIsExpandedAttended] = useState(true);
  const [errors, setErrors] = useState({
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    location: "",
    trainer: "",
    admin: "",
    fsu: "",
    attendee: "",
    actualAttendee: "",
    plannedAttendee: "",
    acceptedAttendee: "",
    trainingProgram: "",
    daysPerWeek: "",
  });
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [trainers, setTrainers] = useState<User[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  const [classAdmins, setClassAdmins] = useState<User[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<string>("");
  const [selectedFSU, setSelectedFSU] = useState<string>("");
  const [selectedAttendee, setSelectedAttendee] = useState<string>("");
  const [attendeeActual, setAttendeeActual] = useState<string>("");
  const [attendeePlanned, setAttendeePlanned] = useState<string>("");
  const [attendeeAccepted, setAttendeeAccepted] = useState<string>("");
  const [user, setUser] = useState<User[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState("Training Program");
  const [totalDays, setTotalDays] = useState<number>();
  const [totalTimes, settotalTimes] = useState<string | undefined>(undefined);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [selectedTime, setSelectedTime] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const [selectedDateRange, setSelectedDateRange] = useState<[string, string]>([
    "",
    "",
  ]);

  const router = useRouter();

  const formatUserList = (users: User[]) =>
    users.map((user) => ({
      ...user,
      fullName: [user.firstName, user.lastName].join(" "),
      dob: fromTimestampToDateString(user.dob),
      gender: user.gender ? "male" : "female",
    }));

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUserList();

        const classAdminUsers = (response.content as User[]).filter(
          (user: User) => user.userRoleId === 2
        );
        setClassAdmins(formatUserList(classAdminUsers) as any);

        const trainerUsers = (response.content as User[]).filter(
          (user: User) => user.userRoleId === 3
        );
        setTrainers(formatUserList(trainerUsers) as any);

        setUser(formatUserList(response.content) as any);
      } catch (error) {
        console.error("Error fetching user rùi:", error);
      }
    };
    getUsers();
  }, []);

  const extractNumber = (duration: string | undefined): number | undefined => {
    const match = duration?.match(/\d+/);
    return match ? parseInt(match[0]) : undefined;
  };

  const handleInputAttendeeActual = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAttendeeActual(value);
  };

  const handleInputAttendeePlanned = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAttendeePlanned(value);
  };

  const handleInputAttendeeAccepted = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAttendeeAccepted(value);
  };

  const handleSelectLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLocation(value);
  };

  const handleSelectTrainer = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTrainer(value);
  };

  const handleSelectAdmin = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAdmin(value);
  };

  const handleSelectFSU = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFSU(value);
  };

  const handleSelectAttendee = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAttendee(value);
  };

  const parseTime = (timeString: string): Date => {
    const time = new Date();
    const [hours, minutes] = timeString.split(":").map(Number);
    time.setHours(hours, minutes, 0, 0);
    return time;
  };

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const startTime = parseTime(selectedTime[0]?.format("HH:mm") ?? "");
  const endTime = parseTime(selectedTime[1]?.format("HH:mm") ?? "");
  const hourPerDay: number =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const startTimeBody = selectedTime[0]?.format("HH:mm") ?? "";
  const endTimeBody = selectedTime[1]?.format("HH:mm") ?? "";

  const startDate = parseDate(selectedDateRange[0]);
  const endDate = parseDate(selectedDateRange[1]);
  const totalWeeks: number =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7);

  const startDateBody = convertDateToTimestamp(selectedDateRange[0]);
  const endDateBody = convertDateToTimestamp(selectedDateRange[1]);

  const totalHours = extractNumber(totalTimes);

  const totalSlots = totalHours && hourPerDay && totalHours / hourPerDay;

  const daysPerWeek = totalSlots && totalWeeks && totalSlots / totalWeeks;

  const daysOfWeek: SelectProps["options"] = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const handleChange = (value: string[]) => {
    if (daysPerWeek && value.length <= daysPerWeek) {
      setSelectedDays(value);
      console.log(`selected: ${value}`);
    } else {
      toast.info("You can only select up to " + daysPerWeek + " days.");
    }
  };

  const handleTimeChange = (
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null]
  ) => {
    setSelectedTime(value);
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDateRange(dateStrings);
  };
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 100);
  };

  const generateClassCode = (location: string): string => {
    const words = location.split(" ");
    const locationCode = words
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    const currentYear = new Date().getFullYear().toString().slice(-2);
    let incrementalNumber = generateRandomNumber();
    return `${locationCode}_${currentYear}_${incrementalNumber}`;
  };

  const body = {
    classDTO: {
      name: className,
      code: "",
      duration: totalHours,
      classStatus: 0,
      location: selectedLocation,
      fsu: selectedFSU,
      startDate: startDateBody,
      endDate: endDateBody,
      startTime: startTimeBody,
      endTime: endTimeBody,
      status: 0,
      trainerIds: [selectedTrainer],
      adminIds: [selectedAdmin],
      attendee: selectedAttendee,
      attendeePlanned: +attendeePlanned,
      attendeeAccepted: +attendeeAccepted,
      attendeeActual: +attendeeActual,
      trainingProgramId: selectedProgramId,
    },
    weekDays: selectedDays,
  };
  console.log("body:", body);

  const handleCreateClass = async (body: ClassBody, status: number) => {
    body.classDTO.status = status;
    console.log("status:", status);

    if (!validateFields()) {
      toast.error("Form is invalid, displaying errors...");
      return;
    }

    try {
      let classCode = generateClassCode(body.classDTO.location);
      body.classDTO.code = classCode;

      const response = await createClass(body);
      console.log("Create class response:", response);

      if (response?.statusCode === 200) {
        toast.success("Create class success");
        router.push("/classes");
      } else {
        toast.error(
          `Failed to create class. Please try again. ${response?.message}`
        );
      }
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error(`Error creating class: ${error}`);
    }
  };

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };
  const handleRenderPage = (page: string) => {
    if (page === "Training Program") {
      return (
        <TrainingProgram
          onProgramSelect={handleProgramSelection}
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

  const handleProgramSelection = (programId: number) => {
    setSelectedProgramId(programId);
  };

  const handleSyllabusData = (totalDays: number, totalTimes: number) => {
    setTotalDays(totalDays);
    settotalTimes(convertMillisecondsToHoursAndMinutes(totalTimes));
  };

  const validateFields = () => {
    let newErrors = { ...errors };
    let isValid = true;

    if (!selectedLocation) {
      newErrors.location = "Location is required";
      isValid = false;
    } else {
      newErrors.location = "";
    }

    if (!selectedTrainer) {
      newErrors.trainer = "Trainer is required";
      isValid = false;
    } else {
      newErrors.trainer = "";
    }

    if (!selectedAdmin) {
      newErrors.admin = "Admin is required";
      isValid = false;
    } else {
      newErrors.admin = "";
    }

    // FSU validation
    if (!selectedFSU) {
      newErrors.fsu = "FSU is required";
      isValid = false;
    } else {
      newErrors.fsu = "";
    }

    // Attendee validation
    if (!selectedAttendee) {
      newErrors.attendee = "Attendee is required";
      isValid = false;
    } else {
      newErrors.attendee = "";
    }

    // Actual Attendee validation
    if (!attendeeActual) {
      newErrors.actualAttendee = "Actual attendee number is required";
      isValid = false;
    } else {
      newErrors.actualAttendee = "";
    }

    // Planned Attendee validation
    if (!attendeePlanned) {
      newErrors.plannedAttendee = "Planned attendee number is required";
      isValid = false;
    } else {
      newErrors.plannedAttendee = "";
    }

    // Accepted Attendee validation
    if (!attendeeAccepted) {
      newErrors.acceptedAttendee = "Accepted attendee number is required";
      isValid = false;
    } else {
      newErrors.acceptedAttendee = "";
    }

    // Start Time validation
    if (!selectedTime[0]) {
      newErrors.startTime = "Start time is required";
      isValid = false;
    } else {
      newErrors.startTime = "";
    }

    // End Time validation
    if (!selectedTime[1]) {
      newErrors.endTime = "End time is required";
      isValid = false;
    } else {
      newErrors.endTime = "";
    }

    // Start Date validation
    if (!selectedDateRange[0]) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    } else {
      newErrors.startDate = "";
    }

    // End Date validation
    if (!selectedDateRange[1]) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else {
      newErrors.endDate = "";
    }

    if (selectedProgramId === 0) {
      newErrors.trainingProgram = "Training Program is required";
      isValid = false;
    } else {
      newErrors.trainingProgram = "";
    }

    if (!Number.isInteger(daysPerWeek)) {
      newErrors.daysPerWeek =
        "The number of sessions per week is not valid, please check the time and date again!";
      isValid = false;
    } else {
      newErrors.daysPerWeek = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  //------------------------------------------------------------------------------------------------

  const formatDuration = (days: number | null, hours: number | null) => {
    let label = "Label";

    if (days !== null && hours !== null) {
      label = `${days}days(${hours}hour)`;
    } else if (days !== null && hours === null) {
      label = `${days}days`;
    }
    return label;
  };

  const toggleExpansionGeneral = () => {
    setIsExpandedGeneral(!isExpandedGeneral);
  };

  const toggleExpansionAttended = () => {
    setIsExpandedAttended(!isExpandedAttended);
  };

  const toggleExpansionTimeFrame = () => {
    setIsExpandedTimeFrame(!isExpandedTimeFrame);
  };

  return (
    <div>
      <div className=" white-box border-2 bg-primary-color border-gray-400 h-60 text-white pl-8">
        <div className="mt-7 text-[30px]">
          <div style={{ letterSpacing: "0.3em" }}>Class</div>

          <div
            className="flex items-center  text-[35px] gap-5 mt-6 mr-[30px]"
            style={{ marginBottom: "2px" }}
          >
            <div className="font-bold" style={{ letterSpacing: "0.3em" }}>
              {className}
            </div>

            <Chip
              active="Planning"
              style={{
                backgroundColor: "#B9B9B9",
                width: "90px",
                fontSize: "16px",
              }}
            />
            <button className="ml-auto">
              <Image
                src="../assets/icons/more_horizontal.svg"
                alt=""
                width={48}
                height={48}
              />
            </button>
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
          {!totalDays && !totalTimes ? (
            <span>...days (...hours)</span>
          ) : (
            <span>
              {totalDays} days ({totalTimes})
            </span>
          )}
          <span style={{ fontStyle: "" }}> | </span>
        </div>
      </div>

      <div className=" mt-[30px] ml-[20px] flex">
        <div>
          <div className=" bg-[#8B8B8B]  p-2 rounded-lg ">
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
          <div>
            {isExpandedGeneral && (
              <div className="rounded-lg bg-white border  ">
                <div className=" flex mt-[20px] justify-between items-center px-[20px] ">
                  <div className="flex items-center">
                    <Image
                      src="../assets/icons/alarm.svg"
                      alt=""
                      width={25}
                      height={24}
                    />
                    <span className="ml-[10px] w-[100px] font-bold">Time</span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-[200px]">
                      <TimePicker.RangePicker
                        value={selectedTime}
                        onChange={handleTimeChange}
                        format="HH:mm"
                        separator
                        allowClear={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[5px] mb-[5px]">
                  {errors.startTime && errors.endTime && (
                    <div className=" text-red-500 mt-[5px] mr-[10px] text-sm text-right">
                      Start Time and End Time is required
                    </div>
                  )}
                </div>

                <div className="flex items-center ml-[25px] mt-[15px]">
                  <MdOutlineHomeWork className="w-[24px] h-[24px]" />
                  <span className="font-bold ml-[10px] w-[100px]">
                    Location
                  </span>
                  <Dropdown
                    value={!selectedLocation ? "" : selectedLocation}
                    options={[
                      { value: "Ho Chi Minh", label: "Ho Chi Minh" },
                      { value: "Ha Noi", label: "Ha Noi" },
                      { value: "Da Nang", label: "Da Nang" },
                    ]}
                    placeholder="select"
                    onChange={handleSelectLocation}
                  />
                </div>
                <div className="mt-[5px] mb-[5px]">
                  {errors.location && (
                    <div className=" text-red-500 mt-[5px] mr-[10px] text-sm text-right">
                      {errors.location}
                    </div>
                  )}
                </div>

                <div className="flex items-center ml-[25px] mt-[15px]">
                  <Image
                    src="../assets/icons/lecture.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="font-bold ml-[10px] w-[100px] ">
                    Trainer
                  </span>
                  <Dropdown
                    value={!selectedTrainer ? "" : selectedTrainer}
                    options={trainers
                      .slice() // Tạo bản sao của mảng để không ảnh hưởng đến mảng gốc
                      .sort((a, b) =>
                        a.fullName && b.fullName
                          ? a?.fullName.localeCompare(b.fullName)
                          : 0
                      ) // Sắp xếp mảng theo fullName
                      .map((t) => ({ value: t.id, label: t.fullName }))}
                    placeholder="select"
                    onChange={handleSelectTrainer}
                  />
                </div>
                <div className="mt-[5px] mb-[5px]">
                  {errors.trainer && (
                    <div className=" text-red-500 mt-[5px] mr-[10px] text-sm text-right">
                      {errors.trainer}
                    </div>
                  )}
                </div>
                <div className="flex items-center ml-[25px] mt-[15px]">
                  <Image
                    src="../assets/icons/grade.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="font-bold ml-[10px] w-[100px] ">Admin</span>
                  <Dropdown
                    value={!selectedAdmin ? "" : selectedAdmin}
                    options={classAdmins
                      .slice() // Tạo bản sao của mảng để không ảnh hưởng đến mảng gốc
                      .sort((a, b) =>
                        a.fullName && b.fullName
                          ? a?.fullName.localeCompare(b.fullName)
                          : 0
                      ) // Sắp xếp mảng theo fullName
                      .map((cA) => ({ value: cA.id, label: cA.fullName }))}
                    placeholder="select"
                    onChange={handleSelectAdmin}
                  />
                </div>
                <div className="mt-[5px] mb-[5px]">
                  {errors.admin && (
                    <div className=" text-red-500 mt-[5px] mr-[10px] text-sm text-right">
                      {errors.admin}
                    </div>
                  )}
                </div>
                <div className="flex items-center ml-[25px] mt-[15px] ">
                  <Image
                    src="../assets/icons/supplier.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="font-bold ml-[10px] w-[100px] ">FSU</span>
                  <Dropdown
                    value={!selectedFSU ? "" : selectedFSU}
                    options={[
                      { value: "FSU 1", label: "FSU 1" },
                      { value: "FSU 2", label: "FSU 2" },
                      { value: "FSU 3", label: "FSU 3" },
                    ]}
                    placeholder="select"
                    onChange={handleSelectFSU}
                  />
                </div>
                <div className="mb-[10px] mt-[5px]">
                  {errors.fsu && (
                    <div className=" text-red-500 mr-[10px] text-sm text-right">
                      {errors.fsu}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className=" bg-[#8B8B8B]  rounded-lg text-white mt-[30px] p-2 w-[373px] flex items-center cursor-pointer  ">
              <div className="ml-[20px] ">
                <div className="flex">
                  <div>
                    <MdStarBorderPurple500 className="w-[24px] h-[24px]" />
                  </div>
                  <div className="ml-[10px]">
                    <span className="font-bold" style={{ marginRight: "59%" }}>
                      Attended
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-[10px]">
                <Dropdown
                  value={!selectedAttendee ? "" : selectedAttendee}
                  options={[
                    { value: "Fresher", label: "Fresher" },
                    { value: "Intern", label: "Intern" },
                    {
                      value: "Online fee-fresher  ",
                      label: "Online fee-fresher",
                    },
                    {
                      value: "Offline fee-fresher",
                      label: "Offline fee-fresher",
                    },
                  ]}
                  placeholder="select"
                  onChange={handleSelectAttendee}
                />
              </div>
              <div
                className="ml-auto mr-[20px]"
                onClick={toggleExpansionAttended}
              >
                {isExpandedAttended ? <IoIosArrowDown /> : <IoIosArrowBack />}
              </div>
            </div>
            <div className="">
              {errors.attendee && (
                <div className=" text-red-500 mr-[10px] text-sm text-right">
                  {errors.attendee}
                </div>
              )}
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
                      onChange={handleInputAttendeePlanned}
                    />
                    <div className="">
                      {errors.plannedAttendee && (
                        <div className=" text-red-500 mr-[10px] text-sm text-right">
                          {errors.plannedAttendee}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cột Accepted */}
                  <div className=" p-2 border  bg-blue-600">
                    <div className="mt-[10px]">Accepted </div>
                    <input
                      type="string"
                      defaultValue=""
                      placeholder=""
                      className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px]"
                      onChange={handleInputAttendeeAccepted}
                    />
                    <div className="">
                      {errors.acceptedAttendee && (
                        <div className=" text-yellow-500 mr-[10px] text-sm text-right">
                          {errors.acceptedAttendee}
                        </div>
                      )}
                    </div>
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
                      onChange={handleInputAttendeeActual}
                    />
                    <div className="">
                      {errors.actualAttendee && (
                        <div className=" text-black-500 mr-[10px] text-sm text-right">
                          {errors.actualAttendee}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <div className=" bg-[#8B8B8B]  rounded-lg  text-white ml-[20px] w-[746px] ">
            <label className=" flex items-center cursor-pointer ml-[20px] mr-[20px] border-y-0 ">
              <FaRegCalendar className="w-[24px] h-[24px]" />
              <span className="font-bold ml-[10px]">Time Frame</span>
              <div className="ml-auto">
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        /* here is your component tokens: */
                        cellWidth: 40,
                      },
                    },
                  }}
                >
                  <RangePicker
                    onChange={handleDateChange}
                    suffixIcon={null}
                    disabledDate={disabledDate}
                    placeholder={["--/--/----", "--/--/----"]}
                    format="DD/MM/YYYY"
                  />
                </ConfigProvider>
              </div>
            </label>
          </div>
          <div className="mt-[5px] mb-[5px]">
            {errors.startDate && errors.endDate && (
              <div className=" text-red-500 mt-[5px] mr-[10px] text-sm text-right">
                Start Date and End Date is required
              </div>
            )}
          </div>

          <div className="ml-[20px] mt-[20px]">
            Vui lòng chọn{" "}
            <span className="font-bold">
              {!daysPerWeek ? "..." : daysPerWeek}
            </span>{" "}
            buổi trong tuần
          </div>
          <div className=" ml-[20px]">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              value={selectedDays}
              onChange={handleChange}
              options={daysOfWeek}
            />
          </div>
          <div className="">
            {errors.daysPerWeek && (
              <div className=" text-red-500 mr-[10px] text-sm text-right">
                {errors.daysPerWeek}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[30px] ml-[20px]">
        {" "}
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
        <div>{handleRenderPage(selectedTab)}</div>
      </div>

      <div className="w-full mt-[10px] flex justify-between">
        <Button
          className="ml-[20px] py-[4px] rounded-[8px] shadow text-white text-sm bg-[#2D3748]"
          title="Back"
          onClick={handleBack}
        />
        <div className="flex items-center gap-[10px] mr-[20px] mb-[20px] font-bold">
          <Link
            className=" py-[4px] rounded-[8px] underline text-[#E74A3B] text-sm"
            href={"/classes"}
          >
            Cancel
          </Link>
          <Button
            className="bg-[#474747] py-[4px] rounded-[8px] shadow text-white text-sm"
            title="Save as draft"
            onClick={() => handleCreateClass(body, 1)}
          />
          <Button
            className="py-[4px] rounded-[8px] shadow text-white text-sm bg-[#2D3748]"
            title="Save"
            onClick={() => handleCreateClass(body, 0)}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateClassDetailPage;
