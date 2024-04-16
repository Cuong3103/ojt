"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { OutputStandard } from "../../dropdown/dropdown-outputStandard";
import { Delivery } from "../../dropdown/dropdown-delivery";
import { SyllabusToggle } from "../../toggle/syllabus-toggle";
import Button from "../../button/button";
import { Content } from "@/types/models/user.model.type";
import { validateDetailFields } from "@/utils/validateUnitUtils";
import { toast } from "react-toastify";

type AddContentFormProps = {
  showAddContentModal: () => void;
  setContents: Dispatch<SetStateAction<any>>;
  dayId: number;
  unitId: number;
};

export const AddContentForm: React.FC<AddContentFormProps> = ({
  showAddContentModal,
  setContents,
  dayId,
  unitId,
}) => {
  const [name, setName] = useState<string>("");
  const [outputStandard, setOutputStandard] = useState<string>("");
  const [trainingTime, setTrainingTime] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [method, setMethod] = useState<string>("");
  const handleCancelUnit = () => {
    // Đặt lại tất cả các trường về giá trị mặc định
    setName("");
    setOutputStandard("");
    setTrainingTime(0);
    setDeliveryType("");
    setMethod("");
    // Ẩn modal
    showAddContentModal();
  };

  const handleSubmit = (dayId: number, unitId: number) => {
    const errors = validateDetailFields({
      name,
      outputStandard,
      trainingTime,
      deliveryType,
    });

    // Nếu có lỗi, hiển thị thông báo và không thực hiện thêm nội dung mới
    if (Object.keys(errors).length > 0) {
      // Hiển thị thông báo lỗi bằng toast
      Object.values(errors).forEach((errorMessage) => {
        toast.error(errorMessage);
      });
      return;
    }
    // Tạo một đối tượng mới từ dữ liệu được nhập và đẩy nó vào mảng đơn vị
    const newContent = {
      dayId: dayId,
      unitId: unitId,
      name,
      outputStandard,
      trainingTime,
      deliveryType,
      method,
    };
    setContents((prevUnits: Content[]) => [...prevUnits, newContent]);
    // Ẩn modal
    showAddContentModal();
  };

  return (
    <>
      <dialog className="modal" open>
        <div className="w-[542px] h-[478px] flex flex-col gap-[15px] pb-[32px] shadow-lg bg-white rounded-[20px]">
          <div className="head w-full h-[44px] bg-[#2D3748] rounded-t-[20px] flex items-center justify-between py-[10px] px-[16px]">
            <button className="format-justify"></button>
            <p className="text-base font-semibold text-white">New content</p>
            <button onClick={handleCancelUnit}>
              <MdOutlineCancel className="text-white w-[24px] h-[24px]" />
            </button>
          </div>
          <div className="body w-full h-[340px] px-[32px] flex flex-col gap-[20px]">
            <div className="w-full h-[56px] flex gap-[16px] items-center">
              <p className="w-[149px] h-[36px] text-base font-medium flex items-center">
                Name
              </p>
              <input
                type="text"
                placeholder="Name of content..."
                className="w-[313px] h-[36px] p-[10px] border-[1px] border-[#8B8B8B] rounded-[6px]"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="w-full h-[56px] flex gap-[16px] items-center">
              <p className="w-[149px] h-[36px] text-base font-medium flex items-center">
                Output Standard
              </p>
              <div className="w-[315px] h-[36px]">
                <OutputStandard onOutputStandardChange={setOutputStandard} />
              </div>
            </div>
            <div className="w-full h-[56px] flex gap-[16px] items-center">
              <p className="w-[149px] h-[36px] text-base font-medium flex items-center">
                Training time
              </p>
              <input
                type="number"
                placeholder="Minutes"
                className="w-[313px] h-[36px] p-[10px] border-[1px] border-[#8B8B8B] rounded-[6px] text-black"
                onChange={(e) => {
                  const value = parseInt(e.target.value); // Chuyển đổi giá trị từ chuỗi thành số nguyên
                  if (!isNaN(value)) {
                    // Kiểm tra xem giá trị có phải là số hợp lệ hay không
                    setTrainingTime(value);
                  }
                }}
              />
            </div>
            <div className="w-full h-[56px] flex gap-[16px] items-center">
              <p className="w-[149px] h-[36px] text-base font-medium flex items-center">
                Delivery type
              </p>
              <div className="w-[315px] h-[36px]">
                <Delivery onDeliveryTypeChange={setDeliveryType} />
              </div>
            </div>
            <div className="w-full h-[56px] flex gap-[16px] items-center">
              <p className="w-[149px] h-[36px] text-base font-medium flex items-center">
                Method
              </p>

              <div className="w-[313px] h-[36px] flex items-center">
                <SyllabusToggle
                  value=""
                  name=""
                  onChange={(newValue) => setMethod(newValue)}
                  on="Online"
                  off="Offline"
                />
              </div>
            </div>
          </div>
          <div className="bottom flex items-center justify-center gap-[15px]">
            {" "}
            <Button
              className="w-[68px] h-[31px] px-[10px] py-[7px] text-sm text-[#E74A3B] underline"
              title="Cancel"
              onClick={handleCancelUnit}
            />
            <Button
              className="w-[96px] h-[31px] px-[25px] py-[7px] rounded-[10px] text-sm text-white bg-[#2D3748] flex items-center justify-center"
              title="Create"
              onClick={() => handleSubmit(dayId, unitId)}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};
