import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-brand-primary text-white py-12 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/mybooknestlogo.png"
            alt="MyBookNest logo"
            className="h-7 w-7 object-contain"
            loading="lazy"
          />
          <span className="font-bold text-xl tracking-tight">MyBookNest</span>
        </div>

        <div className="text-gray-400 text-sm font-medium">
          Transforming reading into an experience.
        </div>

        <div className="text-gray-600 text-xs">
          © {new Date().getFullYear()} MyBookNest. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
