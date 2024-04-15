import { deleteClass, getClassByID } from "@/services/classes";
import Button from "../button/button";
import { Cancel } from "../button/cancel";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Class } from "@/types/class.type";
import { SUCCESS_HTTP_CODES } from "@/utils/constants";
import { toast } from "react-toastify";

type DeleteClassModalProps = {
  classId: number;
  handleClose: () => void;
  setData: Dispatch<SetStateAction<any>>;
};

export const DeleteClassModal: FC<DeleteClassModalProps> = ({
  handleClose,
  classId,
  setData,
}) => {
  const [classById, setClassById] = useState<Class>({});
  const getCurrentClass = async (id?: number) => {
    if (!id) throw new Error("ID is not correct");

    const response = await getClassByID(id);
    return response.content;
  };
  useEffect(() => {
    const fetClassByID = async () => {
      const currentClass = await getCurrentClass(classId);
      setClassById(currentClass);
    };
    fetClassByID();
  }, []);

  const handleConfirm = async () => {
    const response = await deleteClass(classId);
    if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
      setData((prevClass: Class[]) => [prevClass]);

      toast.success("Delete successful");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg max-w-md fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg w-[501px] h-[185px]">
        <div className="text-[#D45B13] text-[32px] text-center font-bold">
          Are you sure?
        </div>
        <div className="text-[14px] font-bold">
          <div className="text-center ">
            Do you really want to delete `<span>{classById.name}</span>` class?
          </div>
          <div className="text-center mb-4 ">
            This class cannot be restored.
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
