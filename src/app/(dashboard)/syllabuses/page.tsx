"use client";
import React, { useState } from "react";
import "./page.css";
import { InputSearch } from "@/app/components/input-box/search-input";
import { MdOutlineUpload } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Button from "@/app/components/button/button";
import { Chip } from "@/app/components/chip/chip";
import { syllabuses } from "./syllabus.config";
import { BsFilterLeft } from "react-icons/bs";
import Pagination from "@/app/components/pagination";
import { Table } from "@/app/components/table/table";
import { syllabusColumns } from "@/utils/tableColumnHelper";
import Link from "next/link";
import { FaEyeSlash, FaPencilAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineDuplicate } from "react-icons/hi";
import { syllabusService } from "@/services/syllabuses/syllabusService";
import useQuery from "@/hooks/useQuery";

const options = [
  { icon: <FaPencilAlt />, label: "Add Training Program" },
  { icon: <RxAvatar />, label: "Edit syllabus" },
  { icon: <HiOutlineDuplicate />, label: "Duplicate Syllabus" },
  { icon: <FaEyeSlash />, label: "Delete syllabus" },
];
const Page: React.FC = () => {
  {
    /**================== Api ========================= */
  }
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);

  const { data: syllabusData, loading: programLoading } = useQuery(
    syllabusService.getSyllabus
  );

  const syllabuses = syllabusData?.content || [];

  console.log("syllabusData", syllabusData);

  console.log("data", syllabuses);

  const syllabusStatus = (syllabus: any) => {
    if (syllabus.isActive === false) {
      return "Inactive";
    } else if (syllabus.isActive === true && syllabus.isApproved === false) {
      return "draft";
    } else {
      return "active";
    }
  };

  const formatSyllabusList = (syllabuses: any[]) =>
    syllabuses.map((syllabus) => ({
      ...syllabus,
      status: syllabusStatus(syllabus),
    }));

  {
    /**================== Modal Import ========================= */
  }
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    console.log("open");
  };

  const handleCancel = () => {
    setIsOpen(false);
    console.log("Cancel");
  };
  const handleSubmit = () => {
    setIsOpen(false);
    console.log("Submit");
  };

  // Tạo trạng thái để lưu giữ giá trị của radio button được chọn
  const [selectedOption, setSelectedOption] = useState("allow");

  // Hàm xử lý sự kiện thay đổi của input radio
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-screen">
      <div className="title p-4">
        <h1 className="text-lg title">Syllabus</h1>
      </div>
      <div className="head-control mt-2 flex items-center justify-between px-5">
        <div className="left">
          <InputSearch />
          <InputSearch />
        </div>
        <div className="right flex items-center gap-2">
          <Button
            className="bg-orange-500 rounded-lg w-20 h-8 px-2.5 py-1.5 text-white"
            icon={<MdOutlineUpload />}
            title="Import"
            onClick={handleOpen}
          />
          {isOpen && (
            <dialog className="modal" open>
              <div className="w-[500px] flex flex-col gap-[15px] bg-white rounded-[10px] shadow-md">
                <div className="head bg-[#2D3748]  flex items-center rounded-t-[10px] justify-center p-[10px]">
                  <p className="font-bold text-base text-white">
                    Import Syllabus
                  </p>
                </div>
                <div className="body flex flex-col gap-[15px] px-[20px]">
                  <div className="part-top w-full flex justify-between">
                    <div className="pt-left">
                      <p className="text-sm font-bold">Import setting</p>
                    </div>
                    <div className="pt-right flex flex-col gap-[15px]">
                      <div className="ptr-property flex">
                        <p className="w-[165px] text-sm font-normal">
                          File (csv)*
                        </p>
                        <Link
                          className="w-[82px] h-[24px] px-[20px] py-[5px] bg-[#2D3748] text-white text-sm font-normal rounded-[5px] flex items-center justify-center"
                          href={""}
                        >
                          Select
                        </Link>
                      </div>
                      <div className="ptr-property flex">
                        <p className="w-[165px] text-sm font-normal">
                          Encoding type
                        </p>
                        <div className="w-[140px]">
                          <select
                            className=" w-full px-[10px] border-[1px] border-[#ACACAC]"
                            defaultValue="auto"
                          >
                            <option disabled selected>
                              Auto Detect
                            </option>
                            <option>Svelte</option>
                            <option>Vue</option>
                            <option>React</option>
                          </select>
                        </div>
                      </div>
                      <div className="ptr-property flex">
                        <p className="w-[165px] text-sm font-normal">
                          Column seperator
                        </p>
                        <div className="w-[140px]">
                          <select className="w-full max-w-xs px-[10px] border-[1px] border-[#ACACAC]">
                            <option className="" disabled selected>
                              Comma
                            </option>
                            <option>Svelte</option>
                            <option>Vue</option>
                            <option>React</option>
                          </select>
                        </div>
                      </div>
                      <div className="ptr-property flex">
                        <p className="w-[165px] text-sm font-normal">
                          Import template
                        </p>
                        <Link
                          className="w-[82px] h-[24px] px-[20px] py-[5px] underline text-[#285D9A] text-sm font-normal flex items-center justify-center"
                          href={""}
                        >
                          Download
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr className="h-[1px] bg-[#ACACAC]" />
                  <div className="part-bottom w-full flex justify-between">
                    <div className="pb-left">
                      <p className="text-sm font-bold">Duplicate control</p>
                    </div>
                    <div className="pb-right w-[305px]">
                      <div className="pbr-top h-[49px] flex flex-col gap-[5px]">
                        <p className="text-sm font-normal">Scanning</p>
                        <div className="choose flex gap-[16px]">
                          <div className="tick flex gap-[8px]">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="checkbox w-[16px] h-[16px] rounded-[2px]"
                            />
                            <p className="text-sm font-normal">Syllabus code</p>
                          </div>
                          <div className="tick flex gap-[8px]">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="checkbox w-[16px] h-[16px] rounded-[2px]"
                            />
                            <p className="text-sm font-normal">Syllabus name</p>
                          </div>
                        </div>
                      </div>
                      <div className="pbr-bottom h-[59px] flex flex-col gap-[5px]">
                        <p className="text-sm font-normal">Duplicate handle</p>
                        <div className="choose flex gap-[16px]">
                          <div className="tick items-center flex gap-[8px]">
                            <input
                              type="radio"
                              name="radio-1"
                              className="radio w-[16px] h-[16px]"
                              value="allow"
                              checked={selectedOption === "allow"}
                              onChange={handleOptionChange}
                            />
                            <p className="text-sm font-normal">Allow</p>
                          </div>
                          <div className="tick flex items-center gap-[8px]">
                            <input
                              type="radio"
                              name="radio-1"
                              className="radio w-[16px] h-[16px]"
                              value="replace"
                              checked={selectedOption === "replace"}
                              onChange={handleOptionChange}
                            />
                            <p className="text-sm font-normal">Replace</p>
                          </div>
                          <div className="tick flex items-center gap-[8px]">
                            <input
                              type="radio"
                              name="radio-1"
                              className="radio w-[16px] h-[16px]"
                              value="skip"
                              checked={selectedOption === "skip"}
                              onChange={handleOptionChange}
                            />
                            <p className="text-sm font-normal">Skip</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="h-[1px] bg-[#ACACAC]" />
                </div>
                <div className="modal-action mt-0 flex items-center gap-[10px] pb-[20px] px-[20px]">
                  <Button
                    className="w-[68px] h-[31px] px-[10px] py-[7px] text-base text-[#E74A3B] underline"
                    title="Cancel"
                    onClick={handleCancel}
                  />
                  <Button
                    className="w-[96px] h-[31px] px-[25px] py-[7px] rounded-[10px] text-white bg-[#2D3748] flex items-center justify-center"
                    title="Submit"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </dialog>
          )}
          <Link href={"http://localhost:3000/syllabuses/create"}>
            <Button
              className="bg-primary-color rounded-lg w-20 h-8 px-2.5 py-1.5 text-white"
              icon={<IoAddCircleOutline />}
              title="Add Syllabus"
            />
          </Link>
        </div>
      </div>
      <div className="content w-full px-5">
        <div className="choose-type d-flex mt-2">
          <Chip type="foundation" />
          <Chip type="HaNTT2" />
        </div>
        <div className="body-control mt-2">
          <Table
            data={formatSyllabusList(syllabuses)}
            columns={syllabusColumns}
            icon={<BsFilterLeft />}
            popupMenu={options}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
