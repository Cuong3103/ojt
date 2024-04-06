"use client"

import { UploadImage } from "@/app/components/upload-image";
import { getUserByUUID, updateProfile } from "@/services/users";
import { User } from "@/types/models/user.model.type";
import { getSession } from "@/utils/authenticationHelper";
import { userAgent } from "next/server";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

const getCurrentProfile = async (id?: number) => {
  if (!id) throw new Error("ID is not correct");

  const response = await getUserByUUID(id);
  return response.content;
};

const ProfilePage: FC = () => {
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const session = await getSession();
      const currentUser = await getCurrentProfile(session?.user.id);
      setProfile(currentUser);
    };

    fetchProfile();
  }, []);

  const onClickEdit = () => setIsDisabled(!isDisabled);

  const handleUpdateProfileAvatar = (avatarUrl: string) => {};

  const handleUpdateProfile = async () => {
    setIsDisabled(true);

    if (profile) {
      if (!profile.dob) {
        profile.dob = 638308344;
      }

      const response = await updateProfile(profile, profile.id);
      setProfile(response.content);
      toast.success("Update profile successfully");
    }
  };

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
