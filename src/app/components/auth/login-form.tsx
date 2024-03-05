"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, FormEvent, useRef } from "react";
import { toast } from "react-toastify";

type LoginFormProps = {
  error?: string;
  callbackUrl?: string;
};

export const LoginForm: FC<LoginFormProps> = (props) => {
  const email = useRef("");
  const password = useRef("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: props.callbackUrl
        ? props.callbackUrl
        : "http://localhost:3000",
    });

    if (!result) toast.error("Failed to login");

    return result;
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center justify-center min-h-middle"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Image
          src="https://fsoft-academy.edu.vn/wp-content/uploads/2021/04/logo.svg"
          alt="FA logo"
          width={200}
          height={400}
        />
        <h1 className="font-bold text-2xl my-6">Sign in to your account</h1>

        <div className="">
          <input
            type="email"
            placeholder="Email"
            required
            className="input input-bordered w-full my-2"
            onChange={(e: any) => (email.current = e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="input input-bordered w-full "
            onChange={(e: any) => (password.current = e.target.value)}
          />
        </div>
        <div className="flex justify-start items-center mx-auto my-3">
          <label className="label cursor-pointer mr-24">
            <input type="checkbox" className="checkbox checkbox-xs mr-2" />
            <span className="text-md">Remember me</span>
          </label>
          <Link
            title="forgot-password"
            href="/forgot-password"
            className="text-md text-secondary-color"
          >
            Forgot your password?
          </Link>
        </div>
        <button className="btn bg-primary-color w-full mb-8 text-white hover:text-primary-color">
          Sign in
        </button>
        <p>
          Not a member?
          <Link href="#" className="text-secondary-color">
            {" "}
            Contact to adminstration for details
          </Link>
        </p>
      </form>
    </div>
  );
};
