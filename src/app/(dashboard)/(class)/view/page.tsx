"use client";

import { IoFilterSharp } from "react-icons/io5";
import { BsFilterLeft } from "react-icons/bs";
import { classes } from "./class.config";
import { IoIosAddCircleOutline } from "react-icons/io";
import { InputSearch } from "@/app/components/input-box/search-input";
import { FC } from "react";
import Button from "@/app/components/button/button";
import { Table } from "@/app/components/table/table.class";
import { Chip } from "@/app/components/chip/chip";
import Pagination from "@/app/components/pagination/index";
import Link from "next/link";

const columns = [
  {
    id: "class",
    label: "Class",
    minWidth: 300,
    maxWidth: 400,
    render: (rowData: any) => (
      <Link href={`/view/${rowData.classCode}`}>{rowData.class}</Link>
    ),
  },

  {
    id: "classCode",
    label: "Class Code",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "createOn",
    label: "Create On",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "createBy",
    label: "Create By",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "location",
    label: "Location",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "fsu",
    label: "FSU",
    minWidth: 300,
    maxWidth: 400,
  },
  {
    id: "moreButton",
    label: "",
    minWidth: 300,
    maxWidth: 400,
  },
];

const ViewClassPage: FC = () => {
  const HandleCreateClass = () => {
    <Link href="/create" />;
    console.log("LINK LINK LINK");
  };

  return (
    <div className="flex-1">
      <div className=" navbar white-box border-2 bg-primary-color border-gray-400 h-20 w-full  text-white text-[25px] tracking-wider pl-8 flex items-center mb-4 ">
        Training Class
      </div>
      <InputSearch />
      <div className="flex justify-between items-center m-4 ">
        <Button title="Filter" icon={<IoFilterSharp />} />
        <Button
          onClick={HandleCreateClass}
          title="Create Class"
          icon={<IoIosAddCircleOutline />}
        />
      </div>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="foundation"
      ></Chip>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="HaNTT2"
      ></Chip>
      <div>
        <Table data={classes} columns={columns} icon={<BsFilterLeft />} />
      </div>
      {/* <Pagination page={20} pageCount={10} /> */}
    </div>
  );
};
export default ViewClassPage;
