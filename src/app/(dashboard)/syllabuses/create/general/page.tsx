import Button from "@/app/components/button/button";
import Image from "next/image";

const GeneralSyllabusPage: React.FC = () => {
  return (
    <>
      <div className=" flex gap-[20px]">
        <div className="left w-4/5">
          <hr className="h-[2px] bg-[#8B8B8B]" />
          <div className="p-[10px]">
            {/*"============Level==================="*/}
            <div className="mt-[10px] flex items-center gap-[39px]">
              <span className="font-semibold text-base">Level</span>
              <select className=" rounded-[5px] shadow px-[10px] py-[5px] w-[270px]">
                <option value="1">Auto Detect</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            {/*"===========Attendee number============"*/}
            <div className="mt-[10px] flex items-center gap-[41px]">
              <span className="font-semibold text-base">Attendee number</span>
              <input
                className="attendee border-[1px] border-[#8B8B8B] p-[10px] rounded-[6px] w-[173px]"
                type="text"
                placeholder="20"
              />
            </div>
            {/*"============Technical Requirement(s)==="*/}
            <div className="mt-[10px]">
              <p className="font-semibold text-base">
                Technical Requirement(s)
              </p>
              <textarea
                className="border-[1px] border-black w-full h-[138px] p-[10px]"
                placeholder="Trainees' PCs need to have the following software installed & run without any issues: 
        • Microsoft SQL Server 2005 Express (in which the trainees can create & manipulate on their own database)
        • Microsoft Visual Studio 2017
        • Microsoft Office 2007 (Visual, Word, PowerPoint)"
                id=""
                cols={parseInt("30")}
                rows={parseInt("10")}
              ></textarea>
            </div>
            {/*"============Course Objectives=========="*/}
            <div>
              <p className="font-semibold text-base">Course Objectives</p>
            </div>
          </div>
        </div>
        <div className="right w-1/5">
          <div className=" h-[34px] text-white font-semibold bg-main rounded-t-[10px] flex items-center justify-center">
            {" "}
            Time allocation
          </div>
          <div className="w-full h-[409px] p-[10px] shadow flex flex-col gap-[20px] ">
            <div className="flex justify-center w-full">
              <Image
                src="../assets/icons/pieChart.svg"
                alt="lecture"
                width={119}
                height={119}
              />
            </div>
            {/*"===========Note=========="*/}
            <div className="w-[152px] h-[240px] flex flex-col gap-[15px]">
              <div className="note flex gap-[5px]">
                <div className="w-[13.92px] h-[13.94px]">
                  <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-orange-300 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium">Assignment/Lab</p>
                  <p className="text-xs font-medium">(54%)</p>
                </div>
              </div>
              <div className="note flex gap-[5px]">
                <div className="w-[13.92px] h-[13.94px]">
                  <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium">Concept/Lecture</p>
                  <p className="text-xs font-medium">(29%)</p>
                </div>
              </div>
              <div className="note flex gap-[5px]">
                <div className="w-[13.92px] h-[13.94px]">
                  <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-amber-300 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium">Guide/Review</p>
                  <p className="text-xs font-medium">(9%)</p>
                </div>
              </div>
              <div className="note flex gap-[5px]">
                <div className="w-[13.92px] h-[13.94px]">
                  <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-cyan-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium">Test/Quiz</p>
                  <p className="text-xs font-medium">(1%)</p>
                </div>
              </div>
              <div className="note flex gap-[5px]">
                <div className="w-[13.92px] h-[13.94px]">
                  <div className="w-[6.96px] h-[6.97px] mt-[3.49px] ml-[3.48px] bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium">Exam</p>
                  <p className="text-xs font-medium">(6%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[68px] flex items-center justify-end">
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
          />
        </div>
      </div>
    </>
  );
};

export default GeneralSyllabusPage;
