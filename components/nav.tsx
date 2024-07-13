"use client";

import { useImageContext } from "@/context/imageContext";
import Image from "next/image";

const Navbar = () => {
  const { image } = useImageContext();

  return (
    <Image
      src={image ? URL.createObjectURL(image) : "/logo.jpeg"}
      alt="Image"
      width={30}
      height={30}
    />
  );
};

export default Navbar;
