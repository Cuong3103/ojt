"use client";
import Button from "../button/button";
import { FC } from "react";
import { toast } from "react-toastify";



type ClassAvancedSreachProps = {
    isOpenBox: boolean;
    handleOpenBox: () => void;
}

export const ClassAvancedSreach: FC<ClassAvancedSreachProps> = ({
    isOpenBox,
    handleOpenBox,
}) => { 
    const handleAdvancedSearch = () => {
        handleOpenBox();
        toast.error("This feature is not implemented yet");
    };


    return (
        isOpenBox &&(
            <div className="box-border bg-slate-500 border rounded-xl">
                Hello
                <section className="flex justify-end items-center gap-4 px-5">
          <Button
            title="Cancel"
            className=" w-[48px] h-[28px]  py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
            onClick={handleOpenBox}
          />
          <Button
            title="Search"
            className="btn bg-primary-color text-white hover:text-black"
            onClick={handleAdvancedSearch}
          />
        </section>
            </div>

        )

    );

}