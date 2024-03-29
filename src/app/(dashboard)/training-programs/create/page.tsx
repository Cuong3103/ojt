"use client";
import React, { useState } from "react";
import InputBox from "@/app/components/input-box/InputBox";
import Button from "@/app/components/button/button";
const CreateTrainingProgram = () => {
  const [loading, setLoading] = useState(false);
  


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
        <InputBox className="" placeholder={"New Training program"} />
        <Button
          className="bg-primary-color text-white h-[32px] px-[15px] rounded-lg  hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
          title="Create"
        />
      </div>
    </section>
  );
};

export default CreateTrainingProgram;
