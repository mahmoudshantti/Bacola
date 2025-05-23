"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LogoBar from "./LogoBar";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import CartBar from "./CartBar";
import DownBar from "./DownBar";

function AppBarMobile({
  categories,
  cart,
  textAppbar,
}: {
  categories: Category[];
  cart: Cart;
  textAppbar: string;
}) {
  const [hideBanner, setHideBanner] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check screen size on mount & on resize
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile if width < 768px
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    const handleScroll = () => {
      if (isMobile) {
        setHideBanner(window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <>
      <div className="w-full fixed top-0 left-0 bg-white z-50 border-b border-gray-200 shadow-md transition-all duration-300">
        {/* Notice Banner - Animates only on mobile */}
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          animate={{
            height: isMobile && hideBanner ? 0 : "auto",
            opacity: isMobile && hideBanner ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-blue-900 overflow-hidden text-xs font-medium text-white text-center"
        >
          <p className="p-2.5">{textAppbar}</p>
        </motion.div>

        <TopBar />

        <div className="flex flex-row justify-between items-center max-w-6xl mx-auto px-2 md:py-3 md:px-4">
          <LogoBar categories={categories} />
          <SearchBar />

          <CartBar cart={cart} />
        </div>

        <DownBar />
      </div>
    </>
  );
}

export default AppBarMobile;
