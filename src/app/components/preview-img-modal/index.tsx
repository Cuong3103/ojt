import { FC } from "react";
import { Modal } from "../modal/modal";
import { ImageContainer } from "./ImageContainer";

type PreviewImgModalProps = {
  image: string;
  showModal: () => void;
  handleSubmit: () => void;
}

export const PreviewImgModal: FC<PreviewImgModalProps> = ({
  image,
  showModal,
  handleSubmit
}) => {

  const fields = [
    {
      id: 'image',
      component: <ImageContainer altText="text" height={10000} width={10000} image={image} />,
    }
  ]

  return (
    <>
      <Modal buttonTitle="Confirm" title="Image preview" showModal={showModal} handleSubmit={handleSubmit} fields={fields} />
    </>
  )
}
