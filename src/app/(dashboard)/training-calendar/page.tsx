"use client";
import { FC, useState } from "react";
import { TrainingCalendar } from "../../components/date-picker/date-picker-for-training-calendar";
import Button from "@/app/components/button/button";
import { IoFilterSharp } from "react-icons/io5";
import { InputSearch } from "@/app/components/input-box/search-input";
import { toast } from "react-toastify";
import { ClassAvancedSreach } from "@/app/components/advanced-search/ClassAvancedSreach";

const sesionPerDay = [
  {
    label: "Morning (8:00 -12:00 )",
  },
  {
    label: "Noon (13:00 - 17:00)",
  },
  {
    label: "Night (18:00 - 22:00)",
  },
];

const TrainingCalendarPage: FC = () => {
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectButton, setSelectButton] = useState<string>("Day");

  const handleClick = (title: string) => {
    setSelectButton(title);
  };
  const handleOpenAvancedBox = () => setIsFiltering(!isFiltering);

  const handleOpenAdvancedBox = () => setIsFiltering(!isFiltering);
  const handleNormalSearch = async (event: any) => {
    if (event.key === "Enter") {
      toast.success("HELLO");
    }
  };

  return (
    <div className="w-full">
      <div className=" navbar white-box border-2 bg-primary-color border-gray-400 h-20 w-full  text-white text-[25px] tracking-wider pl-8 flex items-center mb-4 ">
        Training Calendar
      </div>
      <div className="flex items-center gap-4 flex-grow">
        <InputSearch onKeyDown={(e) => handleNormalSearch(e)} />
        <Button
          title="Filter"
          icon={<IoFilterSharp />}
          className="btn bg-primary-color text-white hover:text-black"
          onClick={handleOpenAdvancedBox}
        />
      </div>
      <ClassAvancedSreach
        isOpenBox={isFiltering}
        handleOpenBox={handleOpenAvancedBox}
      />
      <div className="flex m-2">
        <Button
          className={
            selectButton === "Day"
              ? "bg-[#2D3748] text-white justify-center p-2"
              : "p-2"
          }
          title="Day"
          onClick={() => handleClick("Day")}
        ></Button>
        <Button
          className={
            selectButton === "Week"
              ? "bg-[#2D3748] text-white justify-center p-2"
              : "p-2"
          }
          title="Week"
          onClick={() => handleClick("Week")}
        ></Button>
      </div>
      <div className="p-4 rounded-lg border-2">
        <TrainingCalendar />
        {sesionPerDay.map((sessionsPerDay) => (
          <div className="pt-3 pb-3" key={0}>
            <div className="bg-primary-color text-white rounded-lg pl-3">
              {sessionsPerDay.label}
            </div>
            <div className="grid grid-cols-7 gap-3 rounded-lg mt-3">
              <div className="text-center text-xs bg-primary-color text-white rounded-lg">
                HCM-22_FR.BA_02
              </div>
              <div className="text-center text-xs bg-[#FF7568] text-white rounded-lg p-1">
                HCM-22_FR.BA_01
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrainingCalendarPage;
