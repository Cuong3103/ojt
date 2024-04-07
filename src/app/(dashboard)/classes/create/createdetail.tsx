'use client'
import { FC } from "react";
import { Chip } from "@/app/components/chip/chip";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { FaRegCalendar } from "react-icons/fa";
import { useState } from "react";
import { MdStarBorderPurple500 } from "react-icons/md";
import { MdOutlineHomeWork } from "react-icons/md";
import Image from "next/image";

import { Tab } from "@/app/components/syllabus-tab/tab";
import { SyllabusCard } from "@/app/components/syllabus-card/syllabus-card";
import AppTimePicker from "@/app/components/time-picker/time-picker";
import AppTimeFramePicker from "@/app/components/time-picker/time-frame-picker";
import { Button } from "@/app/components/button/button";
import { days } from "@/helpers/calendar";
// import { SearchInput } from "@/app/components/input-box/search-input";



const CreateClassDetailPage: FC = () => {
    const [isExpandedGeneral, setIsExpandedGeneral] = useState(false);
    const [isExpandedTimeFrame, setIsExpandedTimeFrame] = useState(false);
    const [isExpandedAttended, setIsExpandedAttended] = useState(false);
    const [inputValue, setInputValue] = useState({ from: '--:--', to: '--:--' });
    const formatDuration = (days: number | null, hours: number | null) => {
        let label = "Label";

        if (days !== null && hours !== null) {
            label = `${days}days(${hours}hour)`;
        } else if (days !== null && hours === null) {
            label = `${days}days`;
        }
        return label;
    };



    const toggleExpansionGeneral = () => {
        setIsExpandedGeneral(!isExpandedGeneral);
    };

    const toggleExpansionAttended = () => {
        setIsExpandedAttended(!isExpandedAttended);
    };

    const toggleExpansionTimeFrame = () => {
        setIsExpandedTimeFrame(!isExpandedTimeFrame);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });

    };

    return (
        <div>
            <div className=" white-box border-2 bg-primary-color border-gray-400 h-60 text-white pl-8" >
                <div className="mt-7 text-[30px]" >
                    <div style={{ letterSpacing: '0.3em' }}>
                        Class
                    </div>

                    <div className="flex items-center  text-[35px] gap-5 mt-6 mr-[30px]" style={{ marginBottom: "2px" }}>
                        <div className="font-bold" style={{ letterSpacing: '0.3em' }}>
                            Fresher Develop Operation
                        </div>

                        <Chip
                            active="Planning"
                            style={{ backgroundColor: "#B9B9B9", width: "90px", fontSize: "16px" }}
                        />
                        <button className="ml-auto">
                            <Image src="../assets/icons/more_horizontal.svg" alt="" width={48} height={48} />
                        </button>

                    </div>
                </div>
                <hr style={{ borderTop: "1px solid white", margin: "16px 0", width: "58%" }} />
                <div style={{ fontSize: "17px", marginLeft: "30px", letterSpacing: '0.2em' }}>
                    {formatDuration(31, 97)}
                    <span style={{ fontStyle: "" }}> | </span>
                </div>
            </div>


            <div className=" mt-[30px] ml-[20px] flex">
                <div>
                    <div className=" bg-[#8B8B8B]  p-2 rounded-lg  w-[373px] ">
                        <div className=" flex  items-center cursor-pointer text-white ml-[20px] mr-[20px] " onClick={toggleExpansionGeneral}>
                            <FaRegCalendar className=" w-[24px] h-[24px]" />
                            <span className="ml-[10px] font-bold">General</span>
                            <div className="ml-auto">
                                {isExpandedGeneral ? <IoIosArrowDown /> : <IoIosArrowBack />}
                            </div>
                        </div>
                    </div>
                    {/* thông tin của General */}
                    <div>
                        {isExpandedGeneral && (
                            <div className="rounded-lg  h-[410px] bg-white border ">
                                <div className=" flex   h-[33px] mt-[20px] justify-between items-center px-[20px] ">
                                    <div className="flex items-center">
                                        <Image src="../assets/icons/alarm.svg" alt="" width={25} height={24} />
                                        <span className="ml-[10px] font-bold">Time</span>
                                    </div>
                                    <div className="flex items-center">
                                        <label className="flex gap-[10px] border-y-0 items-center">
                                            <span>from</span>
                                            <div className="w-[59px] h-[27px]">
                                                <AppTimePicker />
                                            </div>
                                        </label>
                                        <label className="flex border-y-0 gap-[10px] items-center">
                                            <span>to</span>
                                            <div className="w-[59px] h-[27px]">
                                                <AppTimePicker />
                                            </div>
                                        </label>
                                    </div>

                                </div>



                                <div className="flex ml-[25px] mt-[15px] ">
                                    <MdOutlineHomeWork className="w-[24px] h-[24px]" />
                                    <span className="ml-[10px]">Location</span>
                                </div>
                                <div className="flex ml-[25px] mt-[15px]">
                                    <Image src="../assets/icons/lecture.svg" alt="" width={24} height={24} />
                                    <span className="ml-[10px]">Trainer</span>

                                </div>
                                <div className="flex items-center ml-[25px] mt-[15px]">
                                    <Image src="../assets/icons/grade.svg" alt="" width={24} height={24} />
                                    <span className="font-bold ml-[10px]">Admin</span>
                                    <select className="bg-transparent border-2 outline-none ml-[40px] w-[190px] h-[27px]">
                                        <option>select</option>
                                    </select>


                                </div>
                                <div>
                                    <select className="bg-transparent border-2 outline-none ml-[150px] w-[190px] h-[27px] mt-[15px]">
                                        <option>contact point</option>
                                    </select>
                                </div>
                                <div className="flex items-center ml-[25px] mt-[15px]">
                                    <Image src="../assets/icons/supplier.svg" alt="" width={24} height={24} />
                                    <span className="font-bold ml-[10px] ">FSU</span>
                                    <select className="bg-transparent border-2 outline-none ml-[60px] w-[190px] h-[27px]">
                                        <option>select</option>
                                    </select>
                                </div>
                                <hr className="mt-[15px] ml-[20px] mr-[30px]" style={{ borderTop: "1px solid black" }} />
                                <div className="mt-[15px] ml-[25px]" >
                                    <span>Created</span>
                                </div>
                                <div className="mt-[15px] ml-[25px]">
                                    <span>Review</span>
                                </div>
                                <div className="mt-[15px] mb-[20px] ml-[25px]">
                                    <span>App</span>
                                </div>

                            </div>
                        )}
                    </div>

                    <div>
                        <div className=" bg-[#8B8B8B]  rounded-lg text-white mt-[30px] p-2 w-[373px] flex items-center cursor-pointer  " onClick={toggleExpansionAttended}>
                            <div className="ml-[20px] " >
                                <div className="flex
                                ">
                                    <div>
                                        <MdStarBorderPurple500 className="w-[24px] h-[24px]" />
                                    </div>
                                    <div className="ml-[10px]">
                                        <span className="font-bold" style={{ marginRight: "59%" }}>Attended</span>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <select className="text-black border-2 outline-none w-[163px] h-[28px] rounded-md ml-[20px]">
                                    <option>select</option>
                                </select>
                            </div>
                            <div className="ml-auto mr-[20px]">
                                {isExpandedAttended ? <IoIosArrowDown /> : <IoIosArrowBack />}
                            </div>




                        </div>
                        {isExpandedAttended && (
                            <div className=" text-white text-center">
                                <div className="grid grid-cols-3 font-bold">
                                    {/* Cột Planned */}
                                    <div className="bg-[#2D3748] p-2  " style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>
                                        <div className="mt-[10px]  ">Planned</div>
                                        <input type="string" defaultValue="" placeholder="" className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px] " />
                                    </div>
                                    {/* Cột Accepted */}
                                    <div className=" p-2 border  bg-blue-600">
                                        <div className="mt-[10px]">Accepted </div>
                                        <input type="string" defaultValue="" placeholder="" className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px]" />
                                    </div>
                                    {/* Cột Actual */}
                                    <div className=" p-2 border  bg-gray-400 text-black" style={{ borderBottomRightRadius: "10px", borderTopRightRadius: "10px" }} >
                                        <div className="mt-[10px]" >Actual</div>
                                        <input type="string" defaultValue="" placeholder="" className="bg-white border-2 outline-none w-[49px] h-[29px] text-black mt-[15px] mb-[10px]" />
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>



                </div>
                <div className="">
                    <div className=" bg-[#8B8B8B]  rounded-lg  text-white ml-[20px] w-[746px] " >
                        <label className=" flex items-center cursor-pointer ml-[20px] mr-[20px] border-y-0 " onClick={toggleExpansionTimeFrame}>
                            <FaRegCalendar className="w-[24px] h-[24px]" />
                            <span className="font-bold ml-[10px]">Time Frame</span>
                            <div className="ml-auto">
                                <AppTimeFramePicker />

                            </div>
                            <div>
                                {isExpandedTimeFrame ? <IoIosArrowDown /> : <IoIosArrowBack />}
                            </div>


                        </label>

                    </div>
                    {isExpandedTimeFrame && (
                        <div>
                            
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-[30px] ml-[20px]">
                <Tab />
            </div>
            <div className="ml-[20px]">
                <div className=" white-box border-2 bg-primary-color border-gray-400 h-[95px]  ">
                    <div className="ml-[30px] mt-[10px] mb-[20px] mr-[30px]">
                        <div className="text-white">
                            <span>Training Program name </span>
                        </div>
                        <div className="relative rounded-lg ">
                            <input placeholder="Sreach ..." type="text" className="w-[440px] h-[35px] pl-[35px] pr-[10px] rounded-lg focus:outline-none" />
                            <Image src="../assets/icons/sreach.svg" alt="" width={24} height={24} className="absolute top-[5px] ml-[10px] transform [-translate-y-1/2]" />
                        </div>

                    </div>
                </div>
                <div className="mt-[10px]">
                    <SyllabusCard />
                </div>
                <div className=" white-box border-2 bg-primary-color h-[16px] mt-[10px]" style={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                    <div className="w-full h-[68px] flex items-center justify-end">
                        <div className="h-[28px] flex gap-[10px] mr-[20px] font-bold">
                            <Button
                                className=" w-[48px] h-[28px] py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm mr-[30px]" title="Cancel" />
                            <Button
                                className="bg-[#474747] w-[140px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm "
                                title="Save as draft" />
                            <Button
                                className=" w-[80px] h-[28px] px-[25px] py-[2px] rounded-[8px] shadow text-white text-sm bg-[#2D3748]"
                                title="Save" />
                        </div>
                    </div>



                </div>

            </div>
        </div >


    );
};
export default CreateClassDetailPage;