"use client";
import React, { ChangeEvent, useState } from "react";
import "./page.css";
import { InputSearch } from "@/app/components/input-box/search-input";
import { MdOutlineUpload } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Button from "@/app/components/button/button";
import { Chip } from "@/app/components/chip/chip";
import { BsFilterLeft } from "react-icons/bs";
import Pagination from "@/app/components/pagination";
import { Table } from "@/app/components/table/table";
import { syllabusColumns } from "@/utils/tableColumnHelper";
import Link from "next/link";
import { FaEyeSlash, FaPencilAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { HiOutlineDuplicate } from "react-icons/hi";
import useQuery from "@/hooks/useQuery";
import { fromTimestampToDateString } from "@/utils/formatUtils";
import { totalPage } from "@/utils/paginationHelper";
import { searchSyllabus, syllabusService } from "@/services/syllabuses/syllabusService";
import { UploadFileModal } from "@/app/components/modal/UploadFileModal";
import { uploadSyllabusService } from "@/services/programs/programService";
import { DeleteSyllabusModal } from "@/app/components/syllabus-modal/delete-syllabus-modal";
import { Syllabus } from "@/types/syllabus.type";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";

const Page: React.FC = () => {
  const handleOpenUpdatePopup = (syllabusInfo: any) => {
    setShowDeleteModal(!showDeleteModal);
    setDataSyllabusDelete(syllabusInfo);
  };
  const options = [
    { icon: <FaPencilAlt />, label: "Add syllabus" },
    { icon: <RxAvatar />, label: "Edit syllabus" },
    { icon: <HiOutlineDuplicate />, label: "Duplicate Syllabus" },
    {
      icon: <FaEyeSlash />,
      label: "Delete syllabus",
      onClick: handleOpenUpdatePopup,
    },
  ];
  {
    /**================== Api ========================= */
  }
  const [currentPage, setCurrentPage] = useState(0);
  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {
    data: syllabusData,
    loading: SyllabusLoading,
    setData: setSyllabusData,
  } = useQuery(syllabusService.getSyllabus);

  const syllabuses = syllabusData?.content || [];
  const [syllabusToUpdate, setSyllabusToUpdate] = useState<number>(0);
  const syllabusStatus = (syllabus: any) => {
    if (syllabus.isActive === false) {
      return <Chip inactive="Inactive" />;
    } else if (syllabus.isActive === true && syllabus.isApproved === false) {
      return <Chip draft="Draft" />;
    } else {
      return <Chip active="Active" />;
    }
  };

  const syllabusName = (syllabus: any) => {
    return (
      <Link href={`/syllabuses/viewdetail/${syllabus.id}`}>
        {syllabus.name}
      </Link>
    );
  };
  const formatSyllabusList = (syllabuses: Syllabus[]) =>
    syllabuses.map((syllabus) => ({
      ...syllabus,
      name: syllabusName(syllabus),
      status: syllabusStatus(syllabus),
      createdBy: syllabus.createBy,
      createdOn: fromTimestampToDateString(syllabus.createdDate / 1000),
    }));

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataSyllabusDelete, setDataSyllabusDelete] = useState({});

  return (
    <div className="w-screen">
      <div className="title p-4">
        <h1 className="text-lg title">Syllabus</h1>
      </div>
      <div className="head-control mt-2 flex items-center justify-between px-5">
        <div className="left">
          <InputSearch onChange={(e) => console.log("SEARCH TERM::", e.target.value)} />
        </div>
        <div className="right flex items-center gap-2">
          <Button
            className="bg-orange-500 rounded-lg w-[95px] h-[32px] px-[10px] py-[7px] text-white"
            icon={<MdOutlineUpload style={{ height: "20px", width: "20px" }} />}
            title="Import"
            onClick={() => setShowUploadModal(true)}
          />
          {showUploadModal && (
            <UploadFileModal
              title="Import Syllabus"
              showModal={() => setShowUploadModal(!showUploadModal)}
              scanningIds={["Program ID", "Program Name"]}
              getFileUrl={"/api/syllabus/download-template"}
              updateService={uploadSyllabusService}
            />
          )}
          <Link href={"http://localhost:3000/syllabuses/create"}>
            <Button
              className="bg-primary-color rounded-lg w-[139px] h-[32px] px-[10px] py-[7px] text-sm text-white"
              icon={
                <IoAddCircleOutline style={{ height: "20px", width: "20px" }} />
              }
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
            setData={setSyllabusData}
            setDataToUpdate={setSyllabusToUpdate}
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
          />
          <div className="flex">
            {showDeleteModal && (
              <DeleteSyllabusModal
                setData={setSyllabusData}
                syllabusId={syllabusToUpdate}
                handleClose={() => setShowDeleteModal(false)}
              />
            )}
            <Pagination
              page={totalPage(metadata)}
              pageCount={metadata.limit}
              setCurrentPage={setCurrentPage}
            />
            <div className="flex -ml-48 z-50 items-center gap-4 mr-10">
              <p>Rows per page</p>
              <select
                className="select select-ghost"
                value={limit}
                onChange={(e) => handleLimitSelection(e)}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
