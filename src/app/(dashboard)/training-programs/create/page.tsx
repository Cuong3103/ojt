"use client";
import React, { useState } from "react";
import Button from "@/app/components/button/button";
import Link from "next/link";
import { createEnum } from "@/utils/utils";
import { CreateTrainingProgramStep2 } from "@/app/components/training-program/CreateTrainingProgramStep2";
import { toast } from "react-toastify";
const CreateTrainingProgram = () => {
  const [loading, setLoading] = useState(false);
  const [programName, setProgramName] = useState("");
  const SequenceCreateProgram = createEnum(["STEP1", "STEP2"]);

  const [currentStep, setCurrentStep] = useState<string>(
    SequenceCreateProgram.STEP1
  );

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramName(e.target.value);
  };

  const handleCreateClick = () => {
    if (programName.length <= 6) {
      setProgramName("");
      toast.error("Program name must be larger than 6 characters");
    } else {
      setCurrentStep(SequenceCreateProgram.STEP2);
    }
  };

  const renderCreateStep1 = () => {
    return (
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
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={programName}
            onChange={(e) => handleInputOnChange(e)}
          />
          <Button
            className="btn bg-primary-color text-white h-[32px] px-[15px] rounded-lg  hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
            title="Create"
            disabled={programName === "" ? true : false}
            onClick={handleCreateClick}
          />
        </div>
      </section>
    );
  };

  return (
    <div className="w-full">
      {currentStep === SequenceCreateProgram.STEP1 && renderCreateStep1()}
      {currentStep === SequenceCreateProgram.STEP2 && (
        <CreateTrainingProgramStep2
          programName={programName}
          backHandle={() => setCurrentStep(SequenceCreateProgram.STEP1)}
        />
      )}
    </div>
  );
};

export default CreateTrainingProgram;
