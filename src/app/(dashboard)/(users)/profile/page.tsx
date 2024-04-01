"use client";

import { ProfileForm } from "@/app/components/profile";
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
      <UploadImage
        avatarUrl={profile?.avatarUrl || ""}
        updateProfileAvatar={handleUpdateProfileAvatar}
      />
      <div className="divider"></div>
      <ProfileForm
        currentUser={profile}
        handleUpdateProfile={handleUpdateProfile}
        isDisabled={isDisabled}
        onClickEdit={onClickEdit}
        setCurrentUser={setProfile}
      />
    </div>
  );
};

export default ProfilePage;
