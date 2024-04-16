import { Chip } from "@/app/components/chip/chip";
import { IoSettingsOutline } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";
import { MdOutlinePeopleOutline, MdOutlineStarBorder } from "react-icons/md";

type GeneralProps = {
  data: {
    attendee: number;
    description: string;
  };
};
const GeneralDetailSyllabus: React.FC<GeneralProps> = ({ data }) => {
  return (
    <div className="pt-[30px] flex gap-[42px]">
      <div className="left w-[480px] h-[172px] p-[20px] rounded-[10px] flex flex-col gap-[20px] shadow-md brightness-150">
        <div className="w-full flex gap-[20px]">
          <div className="w-[162px] flex items-center gap-[10px]">
            <MdOutlineStarBorder style={{ height: "24px", width: "24px" }} />
            <p className="text-sm font-semibold">Level</p>
          </div>
          <div className="w-[64px] h-[24px] flex items-center">
            <p className="font-medium text-sm">All Levels</p>
          </div>
        </div>
        <div className="w-full flex gap-[20px]">
          <div className="w-[162px] flex items-center gap-[10px]">
            <MdOutlinePeopleOutline style={{ height: "24px", width: "24px" }} />
            <p className="text-sm font-semibold">Attendee number</p>
          </div>
          <div className="w-[64px] h-[24px] flex items-center">
            <p className="font-medium text-sm">{data.attendee}</p>
          </div>
        </div>
        <div className="w-full flex gap-[20px]">
          <div className="w-[162px] flex items-center gap-[10px]">
            <LuShieldCheck style={{ height: "24px", width: "24px" }} />
            <p className="text-sm font-semibold">Output standard</p>
          </div>
          <div className="flex gap-5px items-center">
            <Chip active="H4SD" />
            <Chip active="K6SD" />
            <Chip active="H6SD" />
          </div>
        </div>
      </div>
      <div className="right w-full h-[192px] p-[20px] rounded-[10px] flex flex-col gap-[10px] shadow-md brightness-150">
        <div className="flex items-center gap-[10px]">
          <IoSettingsOutline style={{ height: "24px", width: "24px" }} />
          <p className="font-semibold text-sm">Technical Requirement(s) </p>
        </div>
        <div className="text w-full h-[118px] px-[10px]">
          <p>
            {/* Trainees’ PCs need to have following software installed & run
      without any issues: • Microsoft SQL Server 2005 Express •
      Microsoft Visual Studio 2017 • Microsoft Office 2007 (Visio,
      Word, PowerPoint) */}
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralDetailSyllabus;
