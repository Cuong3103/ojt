"use client";
import Button from "../button/button";
import { FC } from "react";
import { toast } from "react-toastify";
import AppTimeFramePicker from "../time-picker/time-frame-picker";
import { InputSearch } from "../input-box/search-input";



type ClassAvancedSreachProps = {
    isOpenBox: boolean;
    handleOpenBox: () => void;
}

export const ClassAvancedSreach: FC<ClassAvancedSreachProps> = ({
    isOpenBox,
    handleOpenBox,
}) => {
    const handleAdvancedSearch = () => {
        handleOpenBox();
        toast.error("This feature is not implemented yet");
    };


    return (
        isOpenBox && (
            <div className="box-border  border rounded-xl ml-[15px]">
                <div className="flex gap-20 ml-[10px]">
                    <div>
                        <p className="font-bold">Class location</p>
                        <InputSearch />

                    </div>
                    <div>
                        <p className="font-bold">Class time frame</p>
                        <AppTimeFramePicker />

                    </div>
                </div>
                <div className="flex items-center gap-20 w-ful mt-[30px]">
                    <article className="flex gap-4 ml-[10px]">
                        <p className="font-bold ">Class time</p>
                        <div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Morning</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Noon</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Night</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Online</span>
                                </label>
                            </div>
                        </div>

                    </article>
                    <div>
                    <article className="flex gap-4  ">
                        <p className="font-bold ">Status</p>
                        <div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Planning</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Scheduled</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Opening</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer flex items-center gap-2 mb-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className=""
                                    />
                                    <span className="label-text">Completed</span>
                                </label>
                            </div>
                        </div>

                    </article>
                    </div>
                </div>
                <div className="flex items-center gap-20 w-ful mt-[20px]">
                        <article className="flex gap-3 ml-[15px]">
            
                            <p className="font-bold">FSU</p>
                            <select className="bg-transparent border-2 outline-none  w-[102px] h-[28px]">
                                        <option>select</option>
                                    </select>
                        </article>
                        <article className="flex gap-3">
            
                            <p className="font-bold">Trainer</p>
                            <select className="bg-transparent border-2 outline-none  w-[102px] h-[28px]">
                                        <option>select</option>
                                    </select>
                        </article>
                        <article className="flex gap-3">
            
                            <p className="font-bold" >Trainer</p>
                            <select className="bg-transparent border-2 outline-none  w-[102px] h-[28px]">
                                        <option>select</option>
                                    </select>
                        </article>
                    </div>
                <section className="flex justify-end items-center">
                    <Button
                        title="Clear"
                        className=" btn bg-[#474747] text-white hover:text-black rounded-lg"
                        onClick={handleOpenBox}
                    />
                    <Button
                        title="Search"
                        className="btn bg-primary-color text-white hover:text-black"
                        onClick={handleAdvancedSearch}
                    />
                </section>
            </div>

        )

    );

}