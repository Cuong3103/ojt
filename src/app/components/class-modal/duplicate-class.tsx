import { getClassByID } from "@/services/classes";
import { Class } from "@/types/class.type";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Cancel } from "../button/cancel";
import Button from "../button/button";
import { toast } from "react-toastify";

type DuplicateClassProp = {
    classId: number;
    handleClose: () => void,
    setdata: Dispatch<SetStateAction<any>>;
};

export const DuplicateClass: FC<DuplicateClassProp> = ({
    classId,
    setdata,
    handleClose,

}) => {

    const [classByIdToDup, setClassByIdToDup] = useState<Class>({});
    const getCurrentClassToDup = async (id? : number) => {
      if (!id) throw new Error("ID is not correct");
  
      const response = await getClassByID(id);
      return response.content;
    };
    useEffect(() => {
        const fetClassById = async () => {
            const currentClass =  await getCurrentClassToDup(classId);
            setClassByIdToDup(currentClass)
            console.log(currentClass)
        }
        fetClassById();
    }, [])

    const handleConfirm = async () => {
        try {
            const duplicatedClass=  { ...classByIdToDup}
            setdata((prevClass: Class[]) => {
              const currentIndex = prevClass.findIndex(
                (item) => item.name === classByIdToDup.name
              );
              const prevPart = prevClass.slice(0, currentIndex + 1);
              const nextPart = prevClass.slice(currentIndex + 1);
              return [...prevPart, duplicatedClass, ...nextPart];
            })
            toast.success("Duplicate successful");
            handleClose();
            console.log(duplicatedClass)
        }
        catch (error) {
            console.error("Error duplicating class:", error);
            toast.error("An error occurred while duplicating class");
           
        }

    }
    return (
        <>
        <div className="bg-white rounded-lg max-w-md fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg w-[501px] h-[185px]">
          <div className="text-[#D45B13] text-[32px] text-center font-bold">Are you sure?</div>
          <div className="text-[14px] font-bold">
            <div className="text-center ">
              Do you really want to DUPLICATE `<span>{classByIdToDup.name}</span>` class?
            </div>
            


            <div className="flex items-center justify-center space-x-4">
              <Cancel onClick={handleClose} />
              <Button title="Confirm" onClick={handleConfirm} />


            </div>
          </div>
        </div>
        </>
    )

}