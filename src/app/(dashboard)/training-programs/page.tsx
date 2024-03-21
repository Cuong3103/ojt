"use client";
import React, { ChangeEvent, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { propgramColumns } from "@/utils/tableColumnHelper";
import { BsFilterLeft } from "react-icons/bs";
import Pagination from "@/app/components/pagination";
import { totalPage } from "@/utils/paginationHelper";
import SearchBar from "@/app/components/input-search/SearchBar";
import { TableProgram } from "@/app/components/table/TableViewProgram";
import { LuArrowUpToLine } from "react-icons/lu";
import mockPrograms from "@/app/(dashboard)/training-programs/mockPrograms";
import Button from "@/app/components/button/button";

const TrainingProgram = () => {
  // const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);

  // const userService = new MockDataService<User>(
  //     userGenerator,
  //     100,
  //     limit,
  //     currentPage
  // );
  // const successUsersMock = userService.getMockResponse();

  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };

  // const getUsers = async () => {
  //     let response: any;
  //     const isEnabled = await isFlagEnabled(UsersFlag.GET_ALL);
  //     if (!isEnabled) {
  //         response = successUsersMock;
  //     } else {
  //         const res = await axiosInstance.get(getRoute(API_LIST.USER_LIST), {
  //             params: {
  //                 page: currentPage,
  //                 limit,
  //             },
  //         });
  //
  //         response = await res.data.data;
  //     }
  //
  //     const { data, metadata } = response;
  //     setData(data);
  //     setMetadata(metadata);
  // };
  //
  // useEffect(() => {
  //     getUsers();
  // }, [currentPage, limit]);

  return (
    <section className={"w-full"}>
      <h2 className="font-medium text-2xl/none tracking-[3.2px] text-white bg-primary-color w-full py-[15px] px-[15px] mt-[1px] mb-[30px]">
        Training program
      </h2>
      <div className={"flex items-center justify-between px-[15px] m-auto"}>
        <div className={"flex items-center gap-2"}>
          <SearchBar />
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
          />
          <Button
            className={
              "h-[38px] px-[10px] w-fit text-white bg-primary-color rounded-[10px] hover:bg-neutral-600 active:bg-neutral-700 focus:outline-none focus:ring focus:ring-neutral-300"
            }
            title="Add New"
            icon={<IoIosAddCircleOutline />}
          />
        </div>
      </div>
      <TableProgram
        data={mockPrograms}
        columns={propgramColumns}
        icon={<BsFilterLeft />}
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
    </section>
  );
};

export default TrainingProgram;
