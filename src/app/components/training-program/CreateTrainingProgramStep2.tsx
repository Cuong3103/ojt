import { FC, useState } from "react";
import { Chip } from "../chip/chip";
import { useSession } from "next-auth/react";
import Button from "../button/button";
import { createProgramService } from "@/services/programs/programService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type CreateTrainingProgramStep2Props = {
  programName: string;
  backHandle: () => void;
};

export const CreateTrainingProgramStep2: FC<
  CreateTrainingProgramStep2Props
> = ({ programName, backHandle }) => {
  const [duration, setDuration] = useState<{
    dateAmount: number;
    hourAmount: number;
  }>({ dateAmount: 0, hourAmount: 0 });

  const router = useRouter()
  const { data: session } = useSession();

  const formatDaysAndHours = (suffix: string, amount: number) => {
    const prefix = amount === 0 ? "... " : amount;
    return `${prefix}${suffix}${amount > 1 ? "s" : ""}`;
  };

  const handleCreateNewProgram = async (e: any) => {
    e.preventDefault();
    try {
      const repsonse = await createProgramService({
        name: programName,
        startTime: 1646000000000,
        duration: 360000000,
        training_status: 1,
        status: true,
      });
      toast.success(`Create ${programName} program successfully`)
      router.push("/training-programs")
    } catch (err) {
      toast.error(err as string)
    }
  };

  return (
    <>
      <section className="bg-primary-color h-36 text-white p-6">
        <h2 className="text-2xl font-bold">Training program</h2>
        <article className="flex items-center gap-4">
          <h1 className="text-4xl mt-4">{programName}</h1>
          <div className="text-4xl">
            <Chip inactive="Inactive"></Chip>
          </div>
        </article>
      </section>

      <section className="p-6">
        <div className="flex items-center mt-2">
          <p className="text-lg">
            {formatDaysAndHours("day", duration.dateAmount)}
          </p>
          <p className="text-sm italic">
            ({formatDaysAndHours("hour", duration.hourAmount)})
          </p>
        </div>
        <div className="flex items-center gap-1 mt-6">
          <p>Modified on {new Date().toLocaleDateString("en-GB")} by</p>
          <p className="font-bold">{session?.user.email.split("@")[0]}</p>
        </div>
      </section>

      <div className="divider"></div>

      <section className="px-6">
        <h4>Content</h4>
        <article className="flex items-center gap-8 mt-2">
          <p className="font-bold">Select Syllabus</p>
          <label className="input input-bordered flex items-center gap-2 max-w-sm">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </article>
      </section>
      <section className="flex mt-10 items-center gap-6 px-5 justify-between">
        <div>
          <Button
            title="Back"
            className="btn bg-black text-white"
            onClick={backHandle}
          />
        </div>
        <div className="flex items-center gap-10">
          <Button
            title="Cancel"
            className="w-[48px] h-[28px] py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm mr-[30px]"
          />
          <Button
            title="Save"
            className="btn bg-black text-white"
            onClick={(e) => handleCreateNewProgram(e)}
          />
        </div>
      </section>
    </>
  );
};
