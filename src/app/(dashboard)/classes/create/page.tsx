"use client";

import { ChangeEvent, FC } from "react";
import { useState } from "react";

import CreateClassDetailPage from "./createClass";

const CreateClassPage: FC = () => {
    const [showCreateClassDetail, setShowCreateClassDetail] =
      useState<boolean>(false);
    const [className, setClassName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
  
    const handleCreate = () => {
      if (className.trim() === "") {
        setErrorMessage("Class name is required");
      } else {
        setShowCreateClassDetail(true);
      }
    };
    const handleBack = () => {
      setShowCreateClassDetail(false); // Đặt lại showCreateClassDetail thành false để quay lại trạng thái ban đầu
    };
  
    const handleCreateClass = (event: ChangeEvent<HTMLInputElement>) => {
      setClassName(event.target.value);
      setErrorMessage(""); // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    };
  
    return (
      <div className="w-full">
        {showCreateClassDetail ? (
          <CreateClassDetailPage className={className}  handleBack = {handleBack}/>
        ) : (
          <div>
            <div className="white-box border-2 border-gray-400 ">
              <div className="navbar bg-primary-color text-white pl-5 text-[35px] tracking-wider">
                Class
              </div>
              <div className="mt-4 font-bold text-sm pl-5">
                Class name
                <div>
                  <input
                    type="text"
                    className="w-[400px] border border-gray-300 rounded-lg px-2 py-1 mr-2 italic text-xs text-black focus:border-black mb-2"
                    placeholder="Type class name"
                    value={className}
                    onChange={handleCreateClass}
                  />                 
                  <button
                    onClick={handleCreate}
                    className="bg-black text-white rounded-lg px-2 py-0.5 cursor-pointer"  
                  >
                    Create
                  </button>
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
export default CreateClassPage;
