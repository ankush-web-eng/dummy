"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { RiLoaderLine } from "react-icons/ri";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [send, setSend] = useState<boolean>(false);
  const [response, setResponse] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setResponse(true);
    setSend(true);

    if (selectedFile?.size > 2 * 1048 * 1048 ){
      alert("Image size is too large")
      return
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result ?? null);
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height,
        });
        if(img.height < 250 || img.width < 250 || img.width > 1080 || img.height > 1080){
          alert("Image is not within the required dimensions")
          return
        }
        setResponse(false);
        setSend(false);
      };
      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
        
      }
    };
    reader.readAsDataURL(selectedFile);
    setFile(selectedFile);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center space-y-5">
      <div className="relative h-fit w-fit">
        <div className="absolute -top-[25px] -right-[10px]">
          {response ? (
            <RiLoaderLine className="animate-spin text-sky-500" />
          ) : (
            <FaPencilAlt className="h-10 w-10" onClick={handleClick} color="blue" />
          )}
        </div>
        <div className="max-w-full max-h-full">
          {imageSrc ? (
            <Image
              src={imageSrc as string}
              alt="Uploaded Image"
              width={100}
              height={100}
              className="rounded-full"
            />
          ) : (
            <Image src="/logo.jpeg" alt="Default Image" width={100} height={100} className="rounded-full" />
          )}
        </div>
      </div>
      <input
        ref={imageRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
      <button className="p-2 border bg-blue-500 rounded-full" onClick={handleClick}>
        {send ? "Sending" : "Send"}
      </button>
      {imageDimensions && (
        <div>
          <p>Width: {imageDimensions.width}px</p>
          <p>Height: {imageDimensions.height}px</p>
        </div>
      )}
    </div>
  );
}
