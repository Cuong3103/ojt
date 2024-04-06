'use client'

import { IoFilterSharp } from "react-icons/io5";
import { BsFilterLeft } from "react-icons/bs";
import { classes } from "./class.config";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SearchInput } from "@/app/components/input-box/search-input";
import { FC, useState } from "react"

import { Chip } from "@/app/components/chip/chip";
import Pagination from "@/app/components/pagination";
import CreateClassPage from "../create/page";
import { Table } from "@/app/components/table/table";
import { classColumns } from "@/utils/tableColumnHelper";
import { Button } from "@/app/components/button/button";



const ViewClassPage: FC = () => {
    const [showCreateClassDetail, setShowCreateClassDetail] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState(false);
    
    const handleCreate = () => {
        setShowCreateClassDetail(true);
    }


   
    return (
        <div className="w-full">
            {showCreateClassDetail ? (
                < CreateClassPage />
            ) : (
                <div className="flex-1">
                    <div className=" navbar white-box border-2 bg-primary-color border-gray-400 h-[59px] w-full  text-white text-[30px] tracking-wider  flex items-center  ">
                        <div className="ml-[30px]" style={{ letterSpacing: "5px" }}>Training Class</div>
                    </div>
                    <div className="flex  ml-[30px] mt-[30px] text-white mr-[30px]  " >
                        <div className="border-y-0">
                            <SearchInput />
                        </div>
                        <div className="border-y-0 ml-[5px] ">
                            <Button classCss="bg-[#2D3748] w-[85px] h-[40px] justify-center" title="Filter" icon={<IoFilterSharp />}
                                handleClick={() => setShowFilter(true)} />
                        </div>
                        <div onClick={handleCreate} className="h-[38px] w-[137px] border-y-0 ml-auto gap-[5px]">
                            <Button classCss="bg-[#D45B13] justify-center " title="Create Class" icon={<IoIosAddCircleOutline />} />
                        </div>

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
                        <Table data={classes} columns={classColumns} icon={<BsFilterLeft />} />
                    </div>
                    <Pagination page={20} pageCount={10} setCurrentPage={function (page: number): void {
                        throw new Error("Function not implemented.");
                    }} />
                </div>
            )
            }

           
        </div>
    );
};
export default ViewClassPage;