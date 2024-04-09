import React, { CSSProperties, FC } from "react";

export const ProgressBar: FC<{ text: string }> = ({ text }) => {
  let status: string | undefined;

  if (text === "General") {
    status = "General";
  } else if (text === "Outline") {
    status = "Outline";
  } else if (text === "Others") {
    status = "Others";
  } else if (text === "Done") {
    status = "Done";
  }

  const progressStyle: CSSProperties = {
    width:
      text === "General"
        ? "12.5%"
        : text === "Outline"
        ? "37.5%"
        : text === "Others"
        ? "62.5%"
        : "100%",
  };

  const getProgressBarClass = (status: string | undefined): string => {
    switch (status) {
      case "General":
        return "bg-main";
      case "Outline":
        return "bg-[#EDF2F7]";
      case "Others":
        return "bg-orange-main";
      case "Done":
        return "bg-green-main";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white h-10 px-2 ">
      <div className="w-80 h-3 bg-grey-main rounded-full">
        <div
          className={`h-3 ${getProgressBarClass(
            status
          )}  rounded-full relative`}
          role="progressbar"
          aria-textnow={text}
          aria-textmin={0}
          aria-textmax={100}
          style={progressStyle}
        >
          <div className="docWhiteControl h-2 w-2 bg-white rounded-full absolute top-0.5 right-0.5"></div>
        </div>
        <div className="flex flex-row mt-2.5">
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-medium">General</p>
          </div>
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-medium">Outline</p>
          </div>
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-medium">Others</p>
          </div>
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-medium">Done</p>
          </div>
        </div>
      </div>
    </div>
  );
};
