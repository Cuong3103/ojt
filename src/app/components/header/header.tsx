import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="navbar p-0">
      <div className="flex bg-main justify-between pt-2.5 pr-10 pb-2.5 pl-10 items-center ">
        <img className=" w-22 h-14" src="./assets/Logo.png" alt="logo" />

        <div className="flex justify-center items-center h-11 w-72 gap-9">
          <div className="unigate w-28 h-8 bg-deep-black px-4 py-1.5 rounded-3xl">
            <div className="w-20 h-5 flex gap-2 items-center">
              <div>
                <img className="w-7 h-5" src="./assets/unigate.png" alt="" />
              </div>
              <p className=" text-white text-xs font-normal ">uniGate</p>
            </div>
          </div>

          {/* HALF RIGHT */}
          <div className="flex gap-x-3">
            <div className="w-11 h-11">
              <img
                className="w-11 h-11 rounded-full  border-white border-solid border-2 "
                alt="Tailwind CSS Navbar component"
                src="./assets/avatar.png"
              />
            </div>
            <div className="flex flex-col w-24 h-11">
              <p className="text-white text-base w-max max-h-5 font-bold ">
                Warrior Tran
              </p>
              <a className="text-white text-base max-h-5 font-normal" href="">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
