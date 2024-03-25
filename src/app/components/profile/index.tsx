"use client";

import { User } from "@/types/models/user.model.type";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../button/button";
import { FaEdit, FaSave } from "react-icons/fa";
import { Toggle } from "../toggle/toggle";

type ProfileFormProps = {
  currentUser?: User;
  isDisabled: boolean;
  handleUpdateProfile: () => void;
  onClickEdit: () => void;
  setCurrentUser: Dispatch<SetStateAction<any>>;
};

export const ProfileForm: FC<ProfileFormProps> = ({
  isDisabled,
  currentUser,
  handleUpdateProfile,
  onClickEdit,
  setCurrentUser,
}) => {
  const renderModifyButton = () => {
    return isDisabled ? (
      <Button
        title="Edit"
        className="btn bg-primary-color text-white hover:text-gray-600"
        icon={<FaEdit />}
        onClick={onClickEdit}
      />
    ) : (
      <div className="flex items-center gap-2">
        <Button
          className=" w-[48px] h-[28px]  py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
          title="Cancel"
          onClick={onClickEdit}
        />
        <Button
          title="Save"
          className="btn bg-primary-color btn-wide text-white hover:text-gray-600"
          icon={<FaSave />}
          onClick={handleUpdateProfile}
        />
      </div>
    );
  };

  const isMale = () => currentUser?.gender;

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "gender") {
      setCurrentUser({ ...currentUser, [name]: value === "male" });
    } else {
      setCurrentUser({ ...currentUser, [name]: value });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <article>
          <h2 className="font-bold text-3xl">Edit profile</h2>
          <p className="mb-3">This information will appear on your profile.</p>
        </article>
        {renderModifyButton()}
      </div>
      <div className="flex">
        <label className="form-control w-full min-w-96">
          <div className="label">
            <span className="label-text font-bold">First name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={currentUser?.firstName}
            disabled={isDisabled}
            name="firstName"
            onChange={(e) => handleOnChange(e)}
          />
          <div className="label hidden">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="form-control w-full min-w-96">
          <div className="label">
            <span className="label-text font-bold">Last name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={currentUser?.lastName}
            name="lastName"
            disabled={isDisabled}
            onChange={(e) => handleOnChange(e)}
          />
          <div className="label hidden">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
      <div className="flex">
        <label className="form-control min-w-96 mt-5">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={currentUser?.email}
            name="email"
            disabled
          />
          <div className="label hidden">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="form-control mt-5 min-w-32">
          <div className="label">
            <span className="label-text font-bold">Gender</span>
          </div>
          <select
            className="select select-bordered"
            disabled={isDisabled}
            onChange={(e) => handleOnChange(e)}
            name="gender"
          >
            <option disabled>Pick one</option>
            <option selected={isMale()} value="male">
              Male
            </option>
            <option selected={!isMale()} value="female">
              Female
            </option>
          </select>
        </label>
      </div>
      <label className="form-control min-w-96 mt-5">
        <div className="label">
          <span className="label-text font-bold">Phone number</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          disabled={isDisabled}
          name="phone"
          onChange={(e) => handleOnChange(e)}
          value={currentUser?.phone}
        />
        <div className="label hidden">
          <span className="label-text-alt">Bottom Left label</span>
        </div>
      </label>
    </section>
  );
};
