"use client";

import { IoFilterSharp } from "react-icons/io5";
import { BsFilterLeft } from "react-icons/bs";
import { classes } from "./class.config";
import { IoIosAddCircleOutline } from "react-icons/io";
import { InputSearch } from "@/app/components/input-box/search-input";
import { FC, useState, useEffect, ChangeEvent } from "react";
import Button from "@/app/components/button/button";
import { Chip } from "@/app/components/chip/chip";
import Pagination from "@/app/components/pagination/index";
import Link from "next/link";
import { Table } from "@/app/components/table/table";
import { classColumns } from "@/utils/tableColumnHelper";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MockDataService } from "@/app/services/mock-response.service";
import { Class } from "@/types/class.type";
import { userGenerator } from "@/utils/mockHelper";
import useQuery from "@/hooks/useQuery";

import { fromTimestampToDateString } from "@/utils/formatUtils";
import { DeleteClassModal } from "@/app/components/class-modal/delete-class-modal";
import { fetClassList, sreachClassByUser } from "@/services/classes";
import { ClassAvancedSreach } from "@/app/components/advanced-search/ClassAvancedSreach";
import { toast } from "react-toastify";
import { SUCCESS_HTTP_CODES } from "@/utils/constants";
import { DuplicateClass } from "@/app/components/class-modal/duplicate-class";


const ViewClassPage: FC = () => {
  const HandleCreateClass = () => {
    <Link href="/create" />;
    console.log("LINK LINK LINK");
  };
  const [data, setData] = useState<[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [userToUpdate, setUserToUpdate] = useState<number>(0);
  const [isFiltering, setIsFiltering ] = useState(false)

  const [metadata, setMetadata] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 1,
    total: 1,
  });
  const [limit, setLimit] = useState(10);
  const [searchConditions, setSearchConditions] = useState<string[]>([]);

  const getDuration = (startDate: number, endDate: number) => Math.round((endDate - startDate) / 86400)
  const getClassStatus = (classStatus: string) => {
    if (classStatus === "PLANNING") {
      return <Chip
        active="Planning"
        style={{ backgroundColor: "#0000FF" }}
      />;
    } else if (classStatus === "SCHEDULED") {
      return <Chip
        active="Scheduled"
        style={{ backgroundColor: "#FF9900" }}
      />;
    } else if (classStatus === "OPENING") {
      return <Chip
        active="Opening"
        style={{ backgroundColor: "#228B22" }}
      />;
    } else if (classStatus === "COMPLETED") {
      return <Chip active="Completed"
        style={{ backgroundColor: "#000000" }}
      />;
    } else {
      return "UNKNOWN";
    }
  };

  const formattedClasses = (classes: Class[]) =>
  classes.map((clazz) => ({
    ...clazz,
    createdDate: fromTimestampToDateString(clazz.createdDate),
    duration: `${getDuration(clazz.startDate, clazz.endDate)} days`,
    classStatus: getClassStatus(clazz.classStatus)
  }))


  const getClassList = async () => {
    const response = await fetClassList(currentPage + 1, limit);
    
    setData(formattedClasses(response.content) as any);
    setMetadata(response.meatadataDTO);
  };

  const handleLimitSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0);
    setLimit(Number(e.target.value));
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [dataClassDelete, setDataClassDelete] = useState({});
  const [dataClassDuplicate,setDataClassDuplicate] = useState({});
  const [sreachInput, setSreachInput] = useState("")
  
  const handleOpenAvancedBox = () => setIsFiltering(!isFiltering);
  const handleNormalSearch = async (event: any) => {
    if (event.key === "Enter") {
       const response = await sreachClassByUser(sreachInput);
       if (SUCCESS_HTTP_CODES.includes(response.statusCode)) {
        setData(response.content)
       }
      toast.success("HELLO");

    }
  };

  
  const handleOpenUpdatePopup = (classInfo: any) => {
    setShowDeleteModal(!showDeleteModal);
    setDataClassDelete(classInfo);
  };



  
  
  
  const handleOpenDuplicatePopup = (classInfo: any) => {
    setShowDuplicateModal(!showDuplicateModal)
    setDataClassDuplicate(classInfo);
  }

  const options = [
    {
      icon: <FaPencilAlt />,
      label: "Edit class",
      showModal: true
    },
    {
      icon: <FaPencilAlt />,
      label: "Duplicated",
      onClick: handleOpenDuplicatePopup
    },
    {
      icon: <MdOutlineDeleteForever />,
      label: "Delete class",
      onClick: handleOpenUpdatePopup
    },
  ];

  useEffect(() => {
    getClassList();
  }, [currentPage, limit]);


  return (
    <div className="flex-1">
      <div className=" navbar white-box border-2 bg-primary-color border-gray-400 h-20 w-full  text-white text-[25px] tracking-wider pl-8 flex items-center mb-4 ">
        Training Class
      </div>
      <article className="flex items-center m-auto justify-end">
      <div className="flex items-center gap-4 flex-grow">
      <InputSearch  onKeyDown={(e) => handleNormalSearch(e)} onChange={(e) => setSreachInput(e.target.value)} />
      <Button 
        title="Filter" 
        icon={<IoFilterSharp />}
        onClick={handleOpenAvancedBox}
        className="btn bg-primary-color text-white hover:text-black" 
        />


      </div>
      <Button
          onClick={HandleCreateClass}
          title="Create Class"
          icon={<IoIosAddCircleOutline />}
          className="h-full bg-primary-color text-white py-2 px-10 rounded-lg"
        />
      </article>

      <ClassAvancedSreach
      isOpenBox={isFiltering}
      handleOpenBox={handleOpenAvancedBox}
      />
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="foundation"
      ></Chip>
      <Chip
        style={{ backgroundColor: "#474747", fontStyle: "italic" }}
        removeBadge="HaNTT2"
      ></Chip>
      <div>
        <Table data={data} columns={classColumns} icon={<BsFilterLeft />} popupMenu={options} setDataToUpdate={setUserToUpdate}
          setData={setData}/>
        
       
      </div>
      {/* <Pagination page={20} pageCount={10} /> */}
      {showDeleteModal && (
        <DeleteClassModal
        setData={setData}
        classId={userToUpdate}
        handleClose={() => setShowDeleteModal(false)}
       
        />
      )}
      {showDuplicateModal && (
        <DuplicateClass 
        classId={userToUpdate}
        setdata={setData}
        handleClose={() => setShowDuplicateModal(false)}
         />
        
      )}
      
    </div>
  );
};
export default ViewClassPage;
