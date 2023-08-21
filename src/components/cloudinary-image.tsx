"use client";
import { useState, useTransition } from "react";
import { CldImage, CldImageProps } from "next-cloudinary";
import { Heart } from "@/components/icons/heart";
import { setAsFavoriteAction } from "@/app/gallery/actions";
import { FullHeart } from "@/components/icons/full-heart";
import { ImageMenu } from "./image-menu";
import { SearchResult } from "@/app/gallery/page";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">
) {
  const [transition, startTransition] = useTransition();
  const { imageData, onUnheart } = props;

  const [isFavourited, setIsFavourited] = useState(
    imageData.tags.includes("favourite")
  );
  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavourited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavourited(false);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavourited(true);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}
