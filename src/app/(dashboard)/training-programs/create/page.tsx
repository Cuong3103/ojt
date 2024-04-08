"use client";
import React, { useState } from "react";
import InputBox from "@/app/components/input-box/InputBox";
import Button from "@/app/components/button/button";
import useMutation from "@/hooks/useMutation";
import { programService } from "@/services/programs/programService";
import { Program } from "@/types/models/user.model.type";
import { time } from "console";
import useQuery from "@/hooks/useQuery";
import CreatePage from "@/app/components/CreatePage/CreatePage";
const CreateTrainingProgram = () => {
  const [loading, setLoading] = useState(false);
  const [trainingProgram, setTrainingProgram] = useState<Program[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [timeSyllabus, setTimeSyllabus] = useState(false);

  const { data: trainingProgramData } = useQuery(programService.getProgram);

  const programs = trainingProgramData?.content || [];

  const handleAddTrainingProgram = async (
    programsData: {
      name: string;
      startTime: number;
      duration: number;
      training_status: number;
      syllabusIds: any[];
    },
    onSuccess: () => void
  ) => {
    setLoading(true);
    // call API
    const { name, startTime, duration, training_status, syllabusIds } = programsData;
    const payload = {
      name: name,
      startTime: startTime,
      duration: duration,
      training_status: training_status,
      syllabusIds: syllabusIds,
    };
    try {
      const res = await programService.postTrainingProgram(payload);
      if (res.data) {
        onSuccess?.();
        setTrainingProgram((prevState) => [res.data, ...prevState]);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const _onShowCreate = (e: MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setShowCreate(true);
  };

  return (
    <>
      {showCreate ? (
        <CreatePage handleAdd={handleAddTrainingProgram} />
      ) : (
        <section className={"w-full"}>
          <h2
            className={
              "font-medium text-2xl/none tracking-[3.2px] text-white bg-primary-color w-full py-[15px] px-[15px] mt-[1px] mb-[30px]"
            }
          >
            New Training program
          </h2>
          <div className={"wrapper flex items-center px-[15px] gap-3"}>
            <h3 className="font-semibold ">Program name</h3>
            {/* FIXME: update the onChange method  */}
            <InputBox placeholder={"New Training program"} onChange={console.log("CONCHO HUNG")} />
            <Button
              className="bg-primary-color text-white h-[32px] px-[15px] rounded-lg  hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
              title="Create"
              onClick={_onShowCreate}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default CreateTrainingProgram;
