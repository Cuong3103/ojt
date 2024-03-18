import Image from "next/image";
import { FC } from "react";

type ImageContainerProps = {
  image: string,
  altText: string,
  width: number,
  height: number
}

export const ImageContainer: FC<ImageContainerProps> = ({
  image,
  altText,
  width,
  height
}) => {
  return (
    <div className="avatar flex w-96">
      <div className="w-96 rounded">
        <Image src={image} alt={altText} width={width} height={height} />
      </div>
    </div>
  )
}
