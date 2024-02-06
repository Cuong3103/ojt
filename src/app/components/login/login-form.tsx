"use client";
import React, { FC } from "react";
import Link from "next/link";

export const Login: FC = () => {
  return (
    <div>
      <Link href={"/api/auth/signin"}>Log In</Link>
    </div>
  );
};
