"use client";

import { AddUserModal } from "@/app/components/user-modal/add-user-modal";
import Button from "../../../components/button/button";
import { getSession } from "@/utils/authenticationHelper";
import { Chip } from "@/app/components/chip/chip";
import { InputSearch } from "@/app/components/input-box/search-input";
import Pagination from "@/app/components/pagination/index";
import { Table } from "@/app/components/table/table";
import { MockDataService } from "@/app/services/mock-response.service";

import { fetchUserList, getUserByUUID, updateProfile } from "@/services/users";
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
import { UserAdvancedSearch } from "@/app/components/advanced-search/UserAdvancedSearch";
import { toast } from "react-toastify";
import { UpdateUserModal } from "@/app/components/user-modal/update-user-modal";
import { SUCCESS_HTTP_CODES, USER_ROLE } from "@/utils/constants";

const UserListPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };

  const handleOpenAdvancedBox = () => setIsFiltering(!isFiltering);
  const handleNormalSearch = async (event: any) => {
    if (event.key === "Enter") {
      toast.success("HELLO");
    }
  };

  const handleOpenUpdatePopup = () => {
    setShowChangeRoleModal(false);
    setIsPopupOpen(false);
    setShowUpdateModal(!showUpdateModal);
  };

  const handleOpenChangeRolePopup = () => {
    setShowChangeRoleModal(!showChangeRoleModal);
  };

  const options = [
    {
      icon: <FaPencilAlt />,
      label: "Edit user",
      onClick: handleOpenUpdatePopup,
      showModal: true,
    },
    {
      icon: <RxAvatar />,
      label: "Change role",
      onClick: handleOpenChangeRolePopup,
      subOption: [
        { label: "ADMIN", value: USER_ROLE.ADMIN },
        { label: "TRAINER", value: USER_ROLE.TRAINER },
        { label: "CLASS ADMIN", value: USER_ROLE.CLASS_ADMIN },
      ],
    },
    { icon: <FaEyeSlash />, label: "De-activate user" },
  ];

  const handleSubMenuItemClick = async (value: number) => {
    const getCurrentProfile = async (id: number) => {
      if (!id) throw new Error("ID is not correct");

      const response = await getUserByUUID(id);
      return response.content;
    };

    const currentUser = await getCurrentProfile(userToUpdate);

    const response = await updateProfile(
      { ...currentUser, userRoleId: value },
      userToUpdate
    );
    if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
      toast.success("Update profile successfully");
      getUsers();
    }
  };

  const formatUserList = (users: User[]) =>
    users.map((user) => ({
      ...user,
      fullName: [user.firstName, user.lastName].join(", "),
      dob: fromTimestampToDateString(user.dob),
    }));

  const getUsers = async () => {
    const response = await fetchUserList(currentPage + 1, limit);
    setData(formatUserList(response.content) as any);
    setMetadata(response.meatadataDTO);
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, limit]);
  return (
    <div className="mb-20">
      <div className="font-bold text-xl tracking-wide mb-4 m-3">
        User Management
      </div>
      <article className="flex items-center m-auto justify-end">
        <div className="flex items-center gap-4 flex-grow">
          <InputSearch onKeyDown={(e) => handleNormalSearch(e)} />
          <Button
            title="Filter"
            icon={<IoFilterSharp />}
            className="btn bg-primary-color text-white hover:text-black"
            onClick={handleOpenAdvancedBox}
          />
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          title="Add User"
          icon={<IoIosAddCircleOutline />}
          className="h-full bg-primary-color text-white py-2 px-10 rounded-lg"
        />
      </article>
      <UserAdvancedSearch
        isOpenBox={isFiltering}
        handleOpenBox={handleOpenAdvancedBox}
      />
      <Table
        data={data}
        columns={userColumns}
        icon={<BsFilterLeft />}
        popupMenu={options}
        openSubMenu={showChangeRoleModal}
        isPopupOpen={isPopupOpen}
        setData={setData}
        setDataToUpdate={setUserToUpdate}
        setIsPopupOpen={setIsPopupOpen}
        handleSubMenuItemClick={handleSubMenuItemClick}
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
      {showUpdateModal && (
        <UpdateUserModal
          userId={userToUpdate}
          showUpdateModal={() => setShowUpdateModal(false)}
          setData={setData}
        />
      )}
    </div>
  );
};
export default UserListPage;
