"use client";
import React, { ChangeEvent, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { programColumns } from "@/utils/tableColumnHelper";
import { BsFilterLeft } from "react-icons/bs";
import Pagination from "@/app/components/pagination";
import { totalPage } from "@/utils/paginationHelper";
import { LuArrowUpToLine } from "react-icons/lu";
import Button from "@/app/components/button/button";
import useQuery from "@/hooks/useQuery";
import { programService } from "@/services/programs/programService";
import { fromTimestampToDateString } from "@/utils/formatUtils";
import { Chip } from "@/app/components/chip/chip";
import Link from "next/link";
import { FaEyeSlash, FaPencilAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import SearchBar from "@/app/components/input-search/SearchBar";
import { UploadFileModal } from "@/app/components/modal/UploadFileModal";
import TableViewProgram from "@/app/components/table/TableViewProgram";
import { TRAINING_STATUS } from "@/utils/constants";

const options = [
  { icon: <FaPencilAlt />, label: "Edit user" },
  { icon: <RxAvatar />, label: "Change role" },
  { icon: <FaEyeSlash />, label: "De-activate user" },
];

const TrainingProgram = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);

  const {
    data: programData,
    loading: programLoading,
    // setData: setProgarmData,
  } = useQuery(programService.getProgram);

  const programs = programData?.content || [];
  console.log("program", programData);

  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };

  const convertTrainingStatusToText = (trainingStatus: number) => {
    switch (trainingStatus) {
      case TRAINING_STATUS.active:
        return <Chip active="Active" />;
      case TRAINING_STATUS.draft:
        return <Chip draft="Draft" />;
      case TRAINING_STATUS.inactive:
        return <Chip inactive="Inactive" />;
      default:
        return "";
    }
  };

  const formatTrainingProgramList = (programs: any[]) =>
    programs.map((program) => {
      const durationInDays = Math.round(program?.duration / (24 * 60 * 60 * 1000));
      const linkName = <Link href={`training-program/${program.slug}`}>{program?.name}</Link>;
      return {
        ...program,
        name: linkName,
        startTime: fromTimestampToDateString(program.startTime),
        duration: durationInDays > 1 && `${durationInDays} days`,
        training_status: convertTrainingStatusToText(program.training_status),
        createdBy: program.createBy
      };
    });

  return (
    <section className={"w-full"}>
      <h2 className="font-medium text-2xl/none tracking-[3.2px] text-white bg-primary-color w-full py-[15px] px-[15px] mt-[1px] mb-[30px]">
        Training program
      </h2>
      <div className={"flex items-center justify-between px-[15px] m-auto"}>
        <div className={"flex items-center gap-2"}>
          <SearchBar value={query} placeholder={"Search by ..."} />
          <Button
            className={
              "h-[38px] px-[10px] w-fit text-white bg-primary-color rounded-[10px] hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
            }
            title="Filter"
            icon={<IoFilterSharp />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={
              "h-[38px] px-[10px] w-fit text-white bg-[#D45B13] rounded-[10px] hover:bg-orange-700 active:bg-orange-900 focus:outline-none focus:ring focus:ring-orange-300"
            }
            title="Import"
            icon={<LuArrowUpToLine />}
            onClick={() => setShowUploadModal(true)}
          />
          <Link href={"/training-programs/create"}>
            <Button
              className={
                "h-[38px] px-[10px] w-fit text-white bg-primary-color rounded-[10px] hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
              }
              title="Add New"
              icon={<IoIosAddCircleOutline />}
            />
          </Link>
        </div>
      </div>
      <TableViewProgram
        data={formatTrainingProgramList(programs)}
        columns={programColumns}
        icon={<BsFilterLeft />}
        popupMenu={options}
        {...programs}
      />
      <div className="flex mt-[30px]">
        <Pagination
          page={totalPage(metadata)}
          pageCount={metadata.limit}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex -ml-48 z-50 items-center gap-4 mr-10">
          <p>Rows per page</p>
          <select className="select select-ghost " onChange={(e) => handleLimitSelection(e)}>
            <option selected value={10}>
              10
            </option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {showUploadModal && (
        <UploadFileModal
          title="Import training programs"
          showModal={() => setShowUploadModal(!showUploadModal)}
          scanningIds={['Program ID', 'Program Name']}
          getFileUrl={'/api/training-program/download-template'}
        />
      )}
    </section>
  );
};

export default TrainingProgram;
