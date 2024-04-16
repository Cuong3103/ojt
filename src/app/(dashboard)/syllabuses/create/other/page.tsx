"use client"
import Button from "@/app/components/button/button";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type OtherProps = {
  otherFormData: Dispatch<SetStateAction<any>>;
};
const OtherSyllabusPage: React.FC<OtherProps> = ({ otherFormData }) => {
  const [formData, setFormData] = useState({
    quiz: "",
    assignment: "",
    final: "",
    finalTheory: "",
    gpa: "",
  });
  const handleSaveOtherForm = () => {
    const updateOtherForm = {
      quiz: quiz,
      assignment: assignment,
      final: final,
      finalTheory: finalTheory,
      gpa: gpa,
    };
    setFormData(updateOtherForm);
    otherFormData(updateOtherForm);
    toast.success("Save Other Data successfully");
  };
  const [quiz, setQuiz] = useState("");
  const [assignment, setAssignment] = useState("");
  const [final, setFinal] = useState("");
  const [finalTheory, setFinalTheory] = useState("");
  const [gpa, setGpa] = useState("");
  return (
    <div className="w-full">
      <div className="content w-[942px] flex flex-col gap-[10px] pt-[10px] pl-[20px] ">
        <div className="chart w-full flex gap-[10px] ">
          <div className="left w-[435px]">
            <button className="w-full py-[5px] rounded-t-[10px] bg-main text-white text-base font-semibold justify-center">
              Time allocation
            </button>
            <div className="w-full h-[310px] shadow flex items-center rounded-b-[10px]">
              <div className="w-full h-[209.15px] px-[16px] flex items-center gap-[20px]">
                <div className="w-[208.86px] h-[209.15px] flex items-center">
                  <Image
                    src="../assets/icons/pieChart.svg"
                    alt="lecture"
                    width={208.86}
                    height={209.15}
                  />
                </div>

                <div className="w-[179px] h-[135px] flex flex-col gap-[15px]">
                  <div className="note flex items-center gap-[5px]">
                    <div className="w-[13.92px] h-[13.94px]">
                      <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-[#F4BE37] rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="w-[98px] text-xs font-medium">
                        Assignment/Lab
                      </p>
                      <p className="text-xs font-medium">(54%)</p>
                    </div>
                  </div>
                  <div className="note flex items-center gap-[5px]">
                    <div className="w-[13.92px] h-[13.94px]">
                      <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-[#FF9F40] rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="w-[98px] text-xs font-medium">
                        Concept/Lecture
                      </p>
                      <p className="text-xs font-medium">(29%)</p>
                    </div>
                  </div>
                  <div className="note flex items-center gap-[5px]">
                    <div className="w-[13.92px] h-[13.94px]">
                      <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-[#0D2535] rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="w-[98px] text-xs font-medium">
                        Guide/Review
                      </p>
                      <p className="text-xs font-medium">(9%)</p>
                    </div>
                  </div>
                  <div className="note flex items-center gap-[5px]">
                    <div className="w-[13.92px] h-[13.94px]">
                      <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-[#5388D8] rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="w-[98px] text-xs font-medium">Test/Quiz</p>
                      <p className="text-xs font-medium">(1%)</p>
                    </div>
                  </div>
                  <div className="note flex items-center gap-[5px]">
                    <div className="w-[13.92px] h-[13.94px]">
                      <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-[#206EE5] rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <p className="w-[98px] text-xs font-medium">Exam</p>
                      <p className="text-xs font-medium">(6%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right w-[497px]">
            <button className="w-full py-[5px] rounded-t-[10px] bg-main text-white text-base font-semibold justify-center">
              Assessment scheme
            </button>

            <div className="w-full h-[310px] shadow py-[20px] rounded-b-[10px]">
              <div className="top w-full px-[16px]  flex flex-col gap-[15px]">
                {" "}
                <div className="w-[145px] h-[27px] flex items-center justify-between">
                  <p className="text-sm font-normal">Quiz *</p>
                  <input
                    type="text"
                    className="w-[47px] h-[27px] border-[1px] border-[#000000]   px-[5px] rounded-[10px] flex items-center justify-center  text-sm font-normal"
                    placeholder="15%"
                    onChange={(e) => {
                      setQuiz(e.target.value);
                    }}
                  />
                </div>
                <div className="w-[145px] h-[27px] flex items-center justify-between">
                  <p className="text-sm font-normal">Assignment *</p>
                  <input
                    type="text"
                    className="w-[47px] h-[27px] border-[1px] border-[#000000] px-[5px] rounded-[10px] flex items-center justify-center  text-sm font-normal"
                    placeholder="15%"
                    onChange={(e) => {
                      setAssignment(e.target.value);
                    }}
                  />
                </div>
                <div className="w-[145px] h-[27px] flex items-center justify-between">
                  <p className="text-sm font-normal">Final *</p>
                  <input
                    type="text"
                    className="w-[47px] h-[27px] border-[1px] border-[#000000] px-[5px] rounded-[10px] flex items-center justify-center  text-sm font-normal"
                    placeholder="15%"
                    onChange={(e) => {
                      setFinal(e.target.value);
                    }}
                  />
                </div>
                <hr className="h-[2px] bg-[#474747]" />
              </div>
              <div className="mid w-full h-[54px] flex items-center px-[16px]">
                {" "}
                <div className="w-[145px] h-[27px] flex items-center justify-between">
                  <p className="text-sm font-normal">Final Theory*</p>
                  <input
                    type="text"
                    className="w-[47px] h-[27px] border-[1px] border-[#000000] px-[5px] rounded-[10px] flex items-center justify-center  text-sm font-normal"
                    placeholder="70%"
                    onChange={(e) => {
                      setFinalTheory(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="bot w-full px-[16px]  flex flex-col gap-[15px]">
                {" "}
                <hr className="h-[2px] bg-[#474747]" />
                <div>
                  <p className="text-sm font-bold">Passing criteria</p>
                </div>
                <div className="w-[145px] h-[27px] flex items-center justify-between">
                  <p className="text-sm font-normal">GPA*</p>
                  <input
                    type="text"
                    className="w-[47px] h-[27px] border-[1px] border-[#000000] px-[5px] rounded-[10px] flex items-center justify-center  text-sm font-normal"
                    placeholder="70%"
                    onChange={(e) => {
                      setGpa(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div> hahaha</div>
      </div>
      <div className="w-full h-[68px] flex items-center justify-between">
        <div>
          <Button
            className="bg-main w-[110px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
            title="Previous"
          />
        </div>
        <div className="w-[292px] h-[28px] flex items-center gap-[10px]">
          <Button
            className=" w-[48px] h-[28px] px-[0px] py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
            title="Cancel"
          />
          <Button
            className="bg-[#474747] w-[140px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
            title="Save as draft"
          />
          <Button
            className="bg-main w-[80px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
            title="Save"
            onClick={handleSaveOtherForm}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherSyllabusPage;
