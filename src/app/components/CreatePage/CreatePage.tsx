import Button from "@/app/components/button/button";
import { Chip } from "@/app/components/chip/chip";
import InputBox from "@/app/components/input-box/InputBox";
import React, { useState } from "react";

const CreatePage = ({ handleAdd }) => {

  const [data, setData] = useState({
    name: "",
    startTime: "",
    duration: "",
    training_status: 0,
  });

  const [selectedContent, setSelectedContent] = useState("");

  const [durations, setDurations] = useState<{ days: number; hours: number }[]>([]);


  const onTotalTimes = () => {
    const newTime = { days: durations.days, hours: durations.hours };
    setDurations([...durations, newTime]);
  };

  const calculateTotal = () => {
    let totalDays = 0;
    let totalHours = 0;

    durations.forEach((duration) => {
      totalDays += duration.days;
      totalHours += duration.hours;
    });

    return { totalDays, totalHours };
  };

  const { totalDays, totalHours } = calculateTotal();

  return (
    <section className={"createpage w-full"}>
      <h2
        className={
          "font-medium text-2xl/none tracking-[3.2px] text-white bg-primary-color w-full py-3 px-4  mt-[1px] mb-[10px]"
        }
      >
        Training program
      </h2>
      <div className="flex items-center gap-5 py-4 px-4 bg-primary-color w-full">
        <h2 className={"text-[32px] tracking-[0.02px] font-semibold text-white"}>{name} DevOps</h2>
        <Chip inactive="Inactive" />
      </div>
      <div className="container px-4 m-auto ">
        <div className="border-b border-black py-5">
          {/* {timeSyllabus ? `${daysTotal} days (${hoursTotal} hours)` : `...days/(...hours)`} */}
          <p>{`...days(...hours)`}</p>
          <p>
            Modified on 23/07/2022 by <strong>Warrior Tran</strong>
          </p>
        </div>
        <div className={"wrap pt-3"}>
          <h3 className="font-semibold">Content</h3>
          <div className="createpage__selectwrap flex items-center gap-2 mb-12">
            <h3 className=" createpage__selectwrap-title font-semibold">Select syllabus</h3>
            <div>
              <InputBox
                className=""
                placeholder={"Choose Syllabus"}
                value={selectedContent}
                onChange={(e) => setSelectedContent(e.target.value)}
              />
            </div>
          </div>
          <div className="createpage__buttonwrap flex items-center justify-between">
            <Button
              className="bg-primary-color text-white h-[32px] px-[15px] rounded-lg  hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
              title="Back"
            />
            <div className="createpage__buttonwrap-left flex items-center gap-2">
              <Button
                className="bg-transparent text-[#E74A3B] h-[32px] underline px-[15px] rounded-lg  hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
                title="Cancel"
              />
              <Button
                className="bg-primary-color text-white h-[32px] px-[15px] rounded-lg  hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
                title="Save"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePage;
