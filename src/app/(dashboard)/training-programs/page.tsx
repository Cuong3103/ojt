"use client";
import React, { ChangeEvent, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { programColumns } from "@/utils/tableColumnHelper";
import { BsFilterLeft } from "react-icons/bs";
import Pagination from "@/app/components/pagination";
import { totalPage } from "@/utils/paginationHelper";
import { TableProgram } from "@/app/components/table/TableViewProgram";
import { LuArrowUpToLine } from "react-icons/lu";
import Button from "@/app/components/button/button";
import useQuery from "@/hooks/useQuery";
import { programService } from "@/services/programs/programService";
import useDebounce from "@/hooks/useDebounce";
import { fromTimestampToDateString } from "@/utils/formatUtils";
import { Chip } from "@/app/components/chip/chip";
import Link from "next/link";
import { FaEyeSlash, FaPencilAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import SearchBar from "@/app/components/input-search/SearchBar";
import { AddUserModal } from "@/app/components/user-modal/add-user-modal";

const options = [
  { icon: <FaPencilAlt />, label: "Edit user" },
  { icon: <RxAvatar />, label: "Change role" },
  { icon: <FaEyeSlash />, label: "De-activate user" },
];

const TrainingProgram = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);

  const { data: programData, loading: programLoading, setData: setProgarmData } = useQuery(
    programService.getProgram
  );

  const programs = programData?.content || [];

  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };

  const convertTrainingStatusToText = (trainingStatus: number) => {
    switch (trainingStatus) {
      case 0:
        return <Chip draft="Draft" />;
      case 1:
        return <Chip inactive="Inactive" />;
      case 2:
        return <Chip active="Active" />;
      default:
        return "";
    }
  };

  const formatTrainingProgramList = (programs: any[]) =>
    programs.map((program) => {
      const durationInDays = Math.round(
        program?.duration / (24 * 60 * 60 * 1000)
      );
      const linkName = (
        <Link href={"training-program/slug"}>{program?.name}</Link>
      );
      return {
        ...program,
        name: linkName,
        startTime: fromTimestampToDateString(program.startTime),
        duration:
          durationInDays > 1
            ? `${durationInDays} days`
            : `${durationInDays} day`,
        training_status: convertTrainingStatusToText(program.training_status),
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
            onClick={() => setShowAddModal(true)}
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
      <TableProgram
        data={formatTrainingProgramList(programs)}
        columns={programColumns}
        icon={<BsFilterLeft />}
        popupMenu={options}
        // {...programs}
      />
      <div className="flex mt-[30px]">
        <Pagination
          page={totalPage(metadata)}
          pageCount={metadata.limit}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex -ml-48 z-50 items-center gap-4 mr-10">
          <p>Rows per page</p>
          <select
            className="select select-ghost "
            onChange={(e) => handleLimitSelection(e)}
          >
            <option selected value={10}>
              10
            </option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {showAddModal && (
        <AddUserModal
          showAddModal={() => setShowAddModal(false)}
          setUsers={setProgarmData}
        />
      )}
    </section>
  );
};

export default TrainingProgram;
