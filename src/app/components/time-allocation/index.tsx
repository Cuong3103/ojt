import Image from "next/image";

export const TimeAllocationChart = () => {
  return (
    <div className="right w-1/5">
      <div className=" h-[34px] text-white font-semibold bg-main rounded-t-[10px] flex items-center justify-center">
        {" "}
        Time allocation
      </div>
      <div className="w-full h-[409px] p-[10px] flex flex-col gap-[20px] shadow ">
        <div className="flex justify-center w-full">
          <Image
            src="../assets/icons/pieChart.svg"
            alt="lecture"
            width={119}
            height={119}
          />
        </div>
        {/*"===========Note=========="*/}
        <div className="w-[152px] flex flex-col gap-[15px]">
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
  );
};
