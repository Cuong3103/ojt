"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, FormEvent, useEffect, useRef } from "react";

type RegistrationFormProps = {
  error?: string;
  callbackUrl?: string;
};

export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
  const username = useRef("");
  const password = useRef("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: props.callbackUrl
        ? props.callbackUrl
        : "http://localhost:3000",
    });
  };

  return (
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
      <h1 className="font-bold text-2xl my-6">Create your new account</h1>

      <div className="">
        <div className="flex gap-4 mb-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="font-bold text-base">First name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="font-bold text-base">Last name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="font-bold text-base">Username</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="font-bold text-base">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
      </div>
      <button className="btn bg-primary-color w-full my-8 text-white hover:text-primary-color">
        Sign up
      </button>
      <p>
        Already a member?
        <Link href="/login" className="text-secondary-color">
          {" "}
          Login
        </Link>
      </p>
    </form>
  );
};
