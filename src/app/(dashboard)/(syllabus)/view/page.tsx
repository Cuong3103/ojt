"use client";
import React from "react";
import "./page.css";
import { SearchInput } from "@/app/components/input-box/search-input";
import { MdOutlineUpload } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import Button from "@/app/components/button/button";
import { Chip } from "@/app/components/chip/chip";
import { syllabuses } from "./syllabus.config";
import { BsFilterLeft } from "react-icons/bs";
import Pagination from "@/app/components/pagination";
import { Table } from "@/app/components/table/table";
import { syllabusColumns } from "@/utils/tableColumnHelper";

const Page: React.FC = () => {
  return (
    <div className="w-screen">
      <div className="title p-4">
        <h1 className="text-lg title">Syllabus</h1>
      </div>
      <div className="head-control mt-2 flex items-center justify-between px-5">
        <div className="left">
          <SearchInput />
          <SearchInput />
        </div>
        <div className="right flex items-center gap-2">
          <Button
            className="bg-orange-500 rounded-lg w-20 h-8 px-2.5 py-1.5 text-white "
            icon={<MdOutlineUpload />}
            title="Import"
          />

          <Button
            className="bg-primary-color rounded-lg w-20 h-8 px-2.5 py-1.5 text-white "
            icon={<IoAddCircleOutline />}
            title="Add Syllabus"
          />
        </div>
      </div>
      <div className="content w-full px-5">
        <div className="choose-type d-flex mt-2">
          <Chip type="foundation" />
          <Chip type="HaNTT2" />
        </div>
        <div className="body-control mt-2">
          <Table
            data={syllabuses}
            columns={syllabusColumns}
            icon={<BsFilterLeft />}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
