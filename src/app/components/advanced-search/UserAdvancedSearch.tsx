"use client";

import { FC } from "react";
import Button from "../button/button";
import { toast } from "react-toastify";

type UserAdvancedSearchProps = {
  isOpenBox: boolean;
  handleOpenBox: () => void;
};

export const UserAdvancedSearch: FC<UserAdvancedSearchProps> = ({
  isOpenBox,
  handleOpenBox,
}) => {
  const handleAdvancedSearch = () => {
    handleOpenBox();
    toast.error("This feature is not implemented yet");
  };

  return (
    isOpenBox && (
      <div className="ml-4 mt-2 p-3">
        <div className="flex">
          <section className="mb-10 flex-grow">
            <div className="flex gap-4 mb-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>

            <div className="flex gap-4 mb-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Role</span>
                </div>
                <select className="select select-bordered">
                  <option selected>All</option>
                  <option>Superadmin</option>
                  <option>Class admin</option>
                  <option>Trainer</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-20 w-full">
              <article className="flex">
                <p className="mr-10">Gender</p>
                <div>
                  <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox"
                      />
                      <span className="label-text">Male</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox"
                      />
                      <span className="label-text">Female</span>
                    </label>
                  </div>
                </div>
              </article>

              <article className="flex">
                <p className="mr-10">Status</p>
                <div>
                  <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox"
                      />
                      <span className="label-text">Active</span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox"
                      />
                      <span className="label-text">Inactive</span>
                    </label>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <div className="w-56">
            <label className="form-control w-54 mb-5">
              <div className="label">
                <span className="label-text">Order by</span>
              </div>
              <select className="select select-bordered">
                <option>ID</option>
                <option>Email</option>
                <option>First name</option>
                <option>Last name</option>
                <option>DOB</option>
              </select>
            </label>

            <label className="form-control w-54">
              <div className="label">
                <span className="label-text">Order Type</span>
              </div>
              <select className="select select-bordered">
                <option>Ascending</option>
                <option>Descending</option>
                <option>None</option>
              </select>
            </label>
          </div>
        </div>

        <section className="flex justify-end items-center gap-4 px-5">
          <Button
            title="Cancel"
            className=" w-[48px] h-[28px]  py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm font-bold"
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
};
