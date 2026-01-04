import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <img
              src="/mybooknestlogo.png"
              alt="MyBookNest logo"
              className="h-9 w-9 object-contain"
              loading="eager"
            />
            <span className="font-bold text-xl tracking-tight text-brand-primary">
              MyBookNest
            </span>
          </div>
          <div>
            <button className="bg-brand-primary text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
