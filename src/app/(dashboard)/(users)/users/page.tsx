"use client";

import { AddUserModal } from "@/app/components/user-modal/add-user-modal";
import Button from "../../../components/button/button";
import { Chip } from "@/app/components/chip/chip";
import { InputSearch } from "@/app/components/input-box/search-input";
import Pagination from "@/app/components/pagination/index";
import { Table } from "@/app/components/table/table";
import { MockDataService } from "@/app/services/mock-response.service";
import { fetchUserList } from "@/services/users";
import { User } from "@/types/models/user.model.type";
import { fromTimestampToDateString } from "@/utils/formatUtils";
import { userGenerator } from "@/utils/mockHelper";
import { totalPage } from "@/utils/paginationHelper";
import { userColumns } from "@/utils/tableColumnHelper";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { FaEyeSlash } from "react-icons/fa6";

const options = [
  { icon: <FaPencilAlt />, label: "Edit user", showModal: true },
  { icon: <RxAvatar />, label: "Change role" },
  { icon: <FaEyeSlash />, label: "De-activate user" },
];
const UserListPage: FC = () => {
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
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

  const formatUserList = (users: User[]) =>
    users.map((user) => ({
      ...user,
      fullName: [user.firstName, user.lastName].join(", "),
      dob: fromTimestampToDateString(user.dob),
      gender: user.gender ? "male" : "female",
    }));

  const getUsers = async () => {
    const isEnabled = true;
    const response = isEnabled
      ? await fetchUserList(currentPage + 1, limit)
      : successUsersMock;

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
      <InputSearch />
      <div className="flex justify-between items-center m-4">
        <Button title="Filter" icon={<IoFilterSharp />} />
        <Button
          onClick={() => setShowAddModal(true)}
          title="Add User"
          icon={<IoIosAddCircleOutline />}
          className="h-full bg-primary-color text-white py-2 px-10 rounded-lg"
        />
      </div>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="HaNTT2"
      ></Chip>
      <Table
        data={data}
        columns={userColumns}
        icon={<BsFilterLeft />}
        popupMenu={options}
        setData={setData}
      />
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
      {showAddModal && (
        <AddUserModal
          showAddModal={() => setShowAddModal(false)}
          setUsers={setData}
        />
      )}
    </div>
  );
};
export default UserListPage;
