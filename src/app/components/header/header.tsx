"use server";
import { getSession } from "@/utils/authenticationHelper";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { FC } from "react";
import { LogoutButton } from "../button/logout-button";

export const Header: FC = async (props) => {
  const session = await getSession();

  const renderUsernameFromEmail = (email?: string) => {
    return email?.split("@")[0];
  };

  return (
    <div className="navbar bg-primary-color">
      <div className="flex-1">
        <Image
          src="https://fsoft-academy.edu.vn/wp-content/uploads/2021/04/logo.svg"
          alt="FA logo"
          width={130}
          height={14}
          className="cursor-pointer"
        />
      </div>
      <div className="flex-none">
        <div className="unigate w-28 h-8 bg-deep-primary-color mx-4 px-4 py-1.5 rounded-3l">
          <div className="w-20 h-5 flex gap-2 items-center">
            <div>
              <Image
                src="/unigate.svg"
                alt="unitgate"
                width={100}
                height={15}
              />
            </div>
            <p className=" text-white text-xs font-normal ">uniGate</p>
          </div>
        </div>

        <div className="flex gap-x-3 mx-4">
          <div className="avatar w-11 h-11">
            <Image
              className="rounded-full  border-white border-solid border-2 "
              alt="Tailwind CSS Navbar component"
              src={
                session?.user?.avatarUrl
                  ? session.user.avatarUrl
                  : "https://robohash.org/fe9d699531c5b7c3eb9b1eaa8f2ef319?set=set4&bgset=bg2&size=400x400"
              }
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col w-24 h-11">
            <p className="text-white text-base w-max max-h-5 font-bold ">
              {renderUsernameFromEmail(session?.user?.email) || "user"}
            </p>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
