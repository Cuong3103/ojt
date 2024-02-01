"use client";
import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <Link href={"/api/auth/signin"}>Log In</Link>
    </div>
  );
};

export default Login;
