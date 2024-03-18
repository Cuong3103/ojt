"use client"

import { UploadImage } from "@/app/components/upload-image";
import { FC } from "react";

const ProfilePage: FC = () => {
  return (
    <div className="flex flex-col items-start pl-10 mt-10">
      <UploadImage />
      <div className="divider"></div>
      <section>
        <h2 className="font-bold text-3xl">Edit profile</h2>
        <p className="mb-3">This information will appear on your profile.</p>
        <div className="flex">
          <label className="form-control w-full min-w-96">
            <div className="label">
              <span className="label-text font-bold">First name</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <div className="label hidden">
              <span className="label-text-alt">Bottom Left label</span>
            </div>
          </label>
          <label className="form-control w-full min-w-96">
            <div className="label">
              <span className="label-text font-bold">Last name</span>
            </div>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            <div className="label hidden">
              <span className="label-text-alt">Bottom Left label</span>
            </div>
          </label>
        </div>
        <label className="form-control min-w-96 mt-5">
          <div className="label">
            <span className="label-text font-bold">Email</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled />
          <div className="label hidden">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="form-control min-w-96 mt-5">
          <div className="label">
            <span className="label-text font-bold">YES</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" disabled />
          <div className="label hidden">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </section>
    </div >
  )
}

export default ProfilePage;
