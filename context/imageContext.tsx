"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context
interface ImageContextType {
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

// Create the context with a default value of null
const ImageContext = createContext<ImageContextType | undefined>(undefined);

const ImageProvider = ({ children }: { children: ReactNode }) => {
    const [image, setImage] = useState<File | null>(null);

    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
};

const useImageContext = () => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error("useImageContext must be used within an ImageProvider");
    }
    return context;
};

export { ImageProvider, useImageContext };
