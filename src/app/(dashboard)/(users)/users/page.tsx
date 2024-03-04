"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { BsFilterLeft } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button } from "@/app/components/button/button";
import { Table } from "@/app/components/table/table";
import Pagination from "@/app/components/pagination/index";
import { SearchInput } from "@/app/components/input-box/search-input";
import { userColumns } from "@/utils/tableColumnHelper";
import { MockDataService } from "@/app/services/mock-response.service";
import { User } from "@/types/models/user.model.type";
import { userGenerator } from "@/utils/mockHelper";
import { UsersFlag } from "@/lib/feature-flags/feature-flags.constant";
import { isFlagEnabled } from "@/lib/feature-flags/config-cat";
import axiosInstance from "@/lib/axios";
import { API_LIST, getRoute } from "@/utils/constants";
import { totalPage } from "@/utils/paginationHelper";
import { AddUserModal } from "@/app/components/add-user-modal/add-user-modal";

// type UserListResponse = {
//   data: {
//     statusCode: number,
//     message: string,
//     data: User[],
//     metadata: MetadataResponse
//   },
// }

const UserListPage: FC = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);
  const userService = new MockDataService<User>(
    userGenerator,
    100,
    limit,
    currentPage
  );
  const successUsersMock = userService.getMockResponse();

  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };

  const getUsers = async () => {
    let response: any;
    const isEnabled = await isFlagEnabled(UsersFlag.GET_ALL);
    if (!isEnabled) {
      response = successUsersMock;
    } else {
      const res = await axiosInstance.get(getRoute(API_LIST.USER_LIST), {
        params: {
          page: currentPage,
          limit,
        },
      });

      response = await res.data.data;
    }

    const { data, metadata } = response;
    setData(data);
    setMetadata(metadata);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, limit]);

  return (
    <div>
      <div className="font-bold text-xl tracking-wide mb-4 m-3">
        User Management
      </div>
      <SearchInput />
      <div className="flex justify-between items-center m-4">
        <Button title="Filter" icon={<IoFilterSharp />} />
        <Button
          handleClick={() => setShowModal(true)}
          title="Add User"
          icon={<IoIosAddCircleOutline />}
        />
      </div>
      {/* <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="foundation"
      ></Chip>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="HaNTT2"
      ></Chip> */}
      <Table data={data} columns={userColumns} icon={<BsFilterLeft />} />
      <div className="flex">
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
      {showModal && (
        <AddUserModal
          showModal={() => setShowModal(false)}
          setUsers={setData}
        />
      )}
    </div>
  );
};

export default UserListPage;
