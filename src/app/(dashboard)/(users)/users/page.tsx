import { FC } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { BsFilterLeft } from "react-icons/bs";
import { users } from "./user.config";
import { IoIosAddCircleOutline } from "react-icons/io";

import { Button } from "@/app/components/button/button";
import { Table } from "@/app/components/table/table";
import Pagination from "@/app/components/pagination/index";
import { Chip } from "@/app/components/chip/chip";
import { SearchInput } from "@/app/components/input-box/search-input";

const columns = [
  {
    id: "id",
    label: "ID",
    minWidth: 150,
    maxWidth: 250,
  },
  {
    id: "fullName",
    label: "Full name",
    minWidth: 150,
    maxWidth: 250,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 150,
    maxWidth: 250,
  },
  {
    id: "DOB",
    label: "Date of birth",
    minWidth: 150,
    maxWidth: 250,
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 150,
    maxWidth: 250,
  },
  {
    id: "type",
    label: "Type",
    minWidth: 150,
    maxWidth: 250,
  },
  {
    id: "moreButton",
    label: "",
    minWidth: 150,
    maxWidth: 250,
  },
];

const UserListPage: FC = () => {
  return (
    <div>
      <div className="font-bold text-xl tracking-wide mb-4 m-3">
        User Management
      </div>
      <SearchInput />
      <div className="flex justify-between items-center m-4">
        <Button title="Filter" icon={<IoFilterSharp />} />
        <Button title="Add User" icon={<IoIosAddCircleOutline />} />
      </div>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="foundation"
      ></Chip>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="HaNTT2"
      ></Chip>
      <Table data={users} columns={columns} icon={<BsFilterLeft />} />
      <Pagination page={20} pageCount={10} />
    </div>
  );
};

export default UserListPage;
