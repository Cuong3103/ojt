"use client";

import { AddUserModal } from "@/app/components/add-user-modal/add-user-modal";
import { Button } from "@/app/components/button/button";
import { Chip } from "@/app/components/chip/chip";
import { SearchInput } from "@/app/components/input-box/search-input";
import Pagination from "@/app/components/pagination/index";
import { Table } from "@/app/components/table/table";
import { MockDataService } from "@/app/services/mock-response.service";
import axiosInstance from "@/lib/axios";
import { isFlagEnabled } from "@/lib/feature-flags/config-cat";
import { UsersFlag } from "@/lib/feature-flags/feature-flags.constant";
import { fetchUserList } from "@/services/users";
import { User } from "@/types/models/user.model.type";
import { API_LIST, getRoute } from "@/utils/constants";
import { fromTimestampToDateString } from "@/utils/formatUtils";
import { userGenerator } from "@/utils/mockHelper";
import { totalPage } from "@/utils/paginationHelper";
import { userColumns } from "@/utils/tableColumnHelper";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";

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
  const [data, setData] = useState<User[]>([]);
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

  const formatUserList = (users: User[]) => users.map((user) => (
    {
      ...user,
      fullName: [user.firstName, user.lastName].join(', '),
      dob: fromTimestampToDateString(user.dob),
      gender: user.gender ? "male" : "female"
    }
  ));

  const getUsers = async () => {
    const isEnabled = await isFlagEnabled(UsersFlag.GET_ALL);
    const response = isEnabled ? await fetchUserList(currentPage + 1, limit) : successUsersMock;

    setData(formatUserList(response.content) as any);
    setMetadata(response.meatadataDTO);
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
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="HaNTT2"
      ></Chip>
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
