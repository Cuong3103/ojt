'use client'

import { FC } from "react"
import { useState } from "react";

import CreateClassDetailPage from "./createdetail";

const CreateClassPage: FC = () => {
    const [showCreateClassDetail, setShowCreateClassDetail] = useState<boolean>(false);

    const handleCreate = () => {
        setShowCreateClassDetail(true);
    }
    return (
        <div className="w-full">
            {showCreateClassDetail ? (
                < CreateClassDetailPage />
            ) : (
                <div>

                    <div className="white-box border-2 border-gray-400 h-40">
                        <div className="navbar bg-primary-color h-20 text-white pl-5 text-[35px] tracking-wider">
                            Class
                        </div>
                        <div className="mt-4 font-bold text-sm pl-5">
                            Class name
                            <div>
                                <input type="text" className="w-[400px] border border-gray-300 rounded-lg px-2 py-1 mr-2 italic text-xs text-black focus:border-black" placeholder="Type class name" />
                                <button onClick={handleCreate} className="bg-black text-white rounded-lg px-2 py-0.5">Create</button>
                            </div>
                        </div>
                    </div>
                </div>

            )
            }
        </div >
    );
};
export default CreateClassPage;


 



             



