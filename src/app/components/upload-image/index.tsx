"use client";

import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Modal } from "../modal/modal";
import { PreviewImgModal } from "../preview-img-modal";
import { updateAvatar } from "@/services/users";
import { SUCCESS_HTTP_CODES } from "@/utils/constants";
import { toast } from "react-toastify";
import { getSession } from "next-auth/react";

type UploadImageProps = {
  avatarUrl: string;
  updateProfileAvatar: (x: string) => void;
};

export const UploadImage: FC<UploadImageProps> = ({
  avatarUrl,
  updateProfileAvatar,
}) => {
  const [imgFile, setImgFile] = useState<File>();
  const [openFilePreview, setOpenFilePreview] = useState(false);

  const handleUpdateAvatar = (event: any) => {
    const imageFile = event.target.files[0];

    if (imageFile) {
      setImgFile(imageFile);
      updateProfileAvatar(URL.createObjectURL(imageFile));
      setOpenFilePreview(!openFilePreview);
    }
  };

  const handleSubmit = async () => {
    if (imgFile) {
      const data = await updateAvatar(imgFile, 1);
      if (data) {
        toast.success("Upload new image successfully");
        setOpenFilePreview(!openFilePreview);
      }
    }
  };

  return (
    <section className="flex flex-col">
      <h2 className="font-bold text-3xl">Public Avatar</h2>
      <p className="mb-3">You can upload your avatar here</p>
      <div className="flex gap-5 justify-center items-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2">
            <Image
              src={avatarUrl}
              alt="avatar"
              width={1500}
              height={1500}
              priority
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold mb-3">Upload new avatar</p>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => handleUpdateAvatar(e)}
          />
          <p className="">The maximum file size allowed is 200KB.</p>
        </div>
      </div>
      {openFilePreview && (
        <PreviewImgModal
          showModal={() => setOpenFilePreview(!openFilePreview)}
          handleSubmit={handleSubmit}
          image={avatarUrl}
        />
      )}
    </section>
  );
};
