import React from "react";

const ProgressBar: React.FC<String> = (text) => {
  let status: string | undefined;

  if (text === "General") {
    status = "General";
  } else if (text === "Outline") {
    status = "Outline";
  } else if (text === "Other") {
    status = "Other";
  } else if (text === "Done") {
    status = "Done";
  }

  const progressStyle: React.CSSProperties = {
    width:
      text === "General"
        ? "12.5%"
        : text === "Outline"
        ? "37.5%"
        : text === "Other"
        ? "62.5%"
        : "100%",
  };

  const getProgressBarClass = (status: string | undefined): string => {
    switch (status) {
      case "General":
        return "bg-main";
      case "Outline":
        return "bg-blue-main";
      case "Other":
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
            <p className="text-xs text-center font-normal">General</p>
          </div>
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-normal">Outline</p>
          </div>
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-normal">Other</p>
          </div>
          <div className="w-1/4 px-2.5">
            <p className="text-xs text-center font-normal">Done</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
