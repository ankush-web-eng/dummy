// pages/index.tsx
"use client"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Header from "@/components/Header";
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Bottom = dynamic(() => import("@/components/Bottom"), { ssr: false });

const Page = () => {
  const [showHero, setShowHero] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Check if the hero component is scrolled into view
      if (!showHero && scrollY >= windowHeight) {
        setShowHero(true);
      }

      // Check if the bottom component is scrolled into view
      if (!showBottom && scrollY >= windowHeight * 2) {
        setShowBottom(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showHero, showBottom]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="top-0 z-10">
        <Header />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div style={{ minHeight: '100vh' }}>
          {showHero && <Hero />}
        </div>
        <div style={{ minHeight: '100vh' }}>
          {showBottom && <Bottom />}
        </div>
      </div>
    </div>
  );
};

export default Page;
