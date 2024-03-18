import { Tab } from "@/app/components/syllabus-tab/tab";
import "./other-page.css";
import { ProgressBar } from "@/app/components/progress-bar/progress-bar";
import { FcPieChart } from "react-icons/fc";
import Button from "@/app/components/button/button";
import Image from "next/image";
const OtherSyllabusPage: React.FC = () => {
  return (
    <div className="w-screen">
      <div className="p-5">
        <div className="flex gap-[50px]">
          <h1 className="title">Syllabus</h1>
          <div className="mt-[10px]">
            <ProgressBar text="Other" />
          </div>
        </div>
      </div>

      <hr className="h-[1px] bg-black shadow-sm" />

      <div className="flex items-center justify-between w-4/5 px-[20px] py-[20px]">
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Syllabus Name*</p>
          <input
            type="text"
            placeholder="C# Language Program"
            className="searchSyllabus"
          />
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Code</p>
          <span className="text-sm">NPL</span>
        </div>
        <div className="flex items-center gap-[15px]">
          <p className="font-semibold text-base">Version</p>
          <span className="text-sm opacity-50">1.0</span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] px-[20px]">
        {" "}
        <div className="w-[600px] mb-0">
          <Tab />
        </div>
        <div className="content w-4/5 flex flex-col gap-[10px] pl-[20px] ">
          <div className="chart w-full flex gap-[10px] ">
            <div className="left w-1/2">
              <Button
                className="w-full rounded-t-[10px] bg-main text-white text-base font-semibold justify-center"
                title="Time allocation"
              />
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
                        <p className="w-[98px] text-xs font-medium">
                          Test/Quiz
                        </p>
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
            <div className="right w-1/2">
              <Button
                className="w-full rounded-t-[10px] bg-main text-white text-base font-semibold justify-center"
                title="Assessment scheme"
              />
              <div className="w-full h-[310px] shadow py-[20px] rounded-b-[10px]">
                <div className="top w-full px-[16px]  flex flex-col gap-[15px]">
                  {" "}
                  <div className="w-[145px] h-[27px] flex items-center justify-between">
                    <p className="text-sm font-normal">Quiz *</p>
                    <div className="w-[47px] h-[27px] border-[1px] border-[#000000] py-[5px] px-[10px] rounded-[10px] flex items-center justify-center">
                      {" "}
                      <p className="text-sm font-normal">15%</p>
                    </div>
                  </div>
                  <div className="w-[145px] h-[27px] flex items-center justify-between">
                    <p className="text-sm font-normal">Assignment *</p>
                    <div className="w-[47px] h-[27px] border-[1px] border-[#000000] py-[5px] px-[10px] rounded-[10px] flex items-center justify-center">
                      {" "}
                      <p className="text-sm font-normal">15%</p>
                    </div>
                  </div>
                  <div className="w-[145px] h-[27px] flex items-center justify-between">
                    <p className="text-sm font-normal">Final *</p>
                    <div className="w-[47px] h-[27px] border-[1px] border-[#000000] py-[5px] px-[10px] rounded-[10px] flex items-center justify-center">
                      {" "}
                      <p className="text-sm font-normal">70%</p>
                    </div>
                  </div>
                  <hr className="h-[2px] bg-[#474747]" />
                </div>
                <div className="mid w-full h-[54px] flex items-center px-[16px]">
                  {" "}
                  <div className="w-[145px] h-[27px] flex items-center justify-between">
                    <p className="text-sm font-normal">Final Theory*</p>
                    <div className="w-[47px] h-[27px] border-[1px] border-[#000000] py-[5px] px-[10px] rounded-[10px] flex items-center justify-center">
                      {" "}
                      <p className="text-sm font-normal">40%</p>
                    </div>
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
                    <div className="w-[47px] h-[27px] border-[1px] border-[#000000] py-[5px] px-[10px] rounded-[10px] flex items-center justify-center">
                      {" "}
                      <p className="text-sm font-normal">70%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div> hahaha</div>
          <div className="w-full h-[68px] flex items-center justify-between">
            <div>
              <Button
                className="bg-main w-[110px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
                title="Previous"
              />
            </div>
            <div className="w-[292px] h-[28px] flex items-center gap-[10px]">
              <Button
                className=" w-[48px] h-[28px]  py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
                title="Cancel"
              />
              <Button
                className="bg-[#474747] w-[140px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
                title="Save as draft"
              />
              <Button
                className="bg-main w-[80px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm font-bold"
                title="Save"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherSyllabusPage;
