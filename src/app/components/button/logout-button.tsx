"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = (props: any) => {
  return (
    <a
      className="text-white text-base max-h-5 font-normal hover:text-secondary-color"
      onClick={() => signOut()}
      role="button"
    >
      Log out
    </a>
  );
};

