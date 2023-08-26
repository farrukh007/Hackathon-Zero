"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { publicDecrypt } from "crypto";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "bg-remove"
    | "blurFaces"
    | "tint"
  >();
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId} </h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Clear All
          </Button>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                setTransformation("generative-fill");
                setPrompt(pendingPrompt);
              }}
            >
              Apply Generative Fill
            </Button>
            <Label>Prompt</Label>
            <Input
              value={pendingPrompt}
              onChange={(e) => setPendingPrompt(e.currentTarget.value)}
            />
          </div>
          <Button onClick={() => setTransformation("blurFaces")}>
            Blur Faces
          </Button>
          <Button onClick={() => setTransformation("blur")}>Apply Blur</Button>
          {/* <Button onClick={() => setTransformation("tint")}>Apply Tint</Button> */}
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to Gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            Pixelate
          </Button>
          <Button onClick={() => setTransformation("bg-remove")}>
            Remove Background
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <CldImage src={publicId} width="300" height="200" alt="Some Image" />
          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="1800"
              height="1200"
              alt="Some Image"
              crop="pad"
              fillBackground={{
                prompt,
              }}
            />
          )}

          {transformation === "blur" && (
            <Image
              src={`https://res.cloudinary.com/${cloudName}/image/upload/e_blur:800/${publicId}`}
              alt={"Blur Image"}
              width={1200}
              height={1400}
            />
          )}

          {/* {transformation === "tint" && (
            <Image
              src={`https://res.cloudinary.com/${cloudName}/image/upload/e_tint:80:blue:blueviolet/${publicId}`}
              alt={"Tint Image"}
              width={1200}
              height={1400}
            />
          )} */}

          {transformation === "grayscale" && (
            <Image
              src={`https://res.cloudinary.com/${cloudName}/image/upload/e_grayscale/${publicId}`}
              alt={"Grayscale Image"}
              width={1200}
              height={1400}
            />
          )}

          {transformation === "pixelate" && (
            <Image
              src={`https://res.cloudinary.com/${cloudName}/image/upload/e_pixelate:20/${publicId}`}
              alt={"Pixelate Face Image"}
              width={1200}
              height={1400}
            />
          )}

          {transformation === "blurFaces" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              blurFaces="1200"
              alt="Some Blur Faces Image"
            />
          )}

          {transformation === "bg-remove" && (
            <CldImage
              src={publicId}
              width="1200"
              height="1400"
              removeBackground
              alt="Some Image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
