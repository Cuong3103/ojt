import {
  deleteSyllabus,
  getSyllabusByID,
} from "@/services/syllabuses/syllabusService";
import Button from "../button/button";
import { Cancel } from "../button/cancel";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SUCCESS_HTTP_CODES } from "@/utils/constants";
import { toast } from "react-toastify";
import { Syllabus } from "@/types/syllabus.type";

type DeleteSyllabusModalProps = {
  syllabusId: number;
  handleClose: () => void;
  setData: Dispatch<SetStateAction<any>>;
};

export const DeleteSyllabusModal: FC<DeleteSyllabusModalProps> = ({
  handleClose,
  syllabusId,
  setData,
}) => {
  const [syllabusById, setSyllabusById] = useState<Syllabus>({});
  const [isVisible, setIsVisible] = useState(true);
  const getCurrentSyllabus = async (id?: number) => {
    if (!id) throw new Error("ID is not correct");
    const response = await getSyllabusByID(id);
    return response.content;
  };
  useEffect(() => {
    const fetSyllabusByID = async () => {
      const currentSyllabus = await getCurrentSyllabus(syllabusId);
      setSyllabusById(currentSyllabus);
    };
    fetSyllabusByID();
  }, []);

  const handleConfirm = async () => {
    const response = await deleteSyllabus(syllabusId);
    if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
      setData((prevData: any) => {
        const newData = { ...prevData };
        if (newData.content) {
          newData.content = newData.content.filter(
            (item) => item.id !== syllabusId
          );
        }
        return newData;
      });
      toast.success("Delete successful");
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }
  return (
    <>
      <div className="bg-white rounded-lg max-w-md fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg w-[501px] h-[185px]">
        <div className="text-[#D45B13] text-[32px] text-center font-bold">
          Are you sure?
        </div>
        <div className="text-[14px] font-bold">
          <div className="text-center ">
            Do you really want to delete `<span>{syllabusById.name}</span>`
            syllabus?
          </div>
          <div className="text-center mb-4 ">
            This syllabus cannot be restored.
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Cancel onClick={handleClose} />
            <Button title="Confirm" onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};
