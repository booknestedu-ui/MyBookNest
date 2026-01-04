import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, BookOpen, Library } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-accent"></span>
          <span className="text-sm font-medium text-gray-600">
            Transforming Reading Into Experience
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-brand-primary mb-6"
        >
          Rent Books. <span className="text-gray-500">Read Freely.</span>{" "}
          <br className="hidden sm:block" /> Return Easily.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
        >
          Don't buy books you read once.{" "}
          <span className="font-semibold text-brand-primary">
            Rent the top bestsellers without the full purchase cost.
          </span>{" "}
          No clutter, free pickup & drop.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="w-full sm:w-auto px-8 py-3.5 bg-brand-primary text-white rounded-full font-semibold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
            Notify Me
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="https://chat.whatsapp.com/JrjVsS5sYGO62434pWkPyW"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-brand-primary border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 hover:border-gray-300"
          >
            Join community
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </a>
        </motion.div>
      </div>

      {/* Abstract Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-brand-accent/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-brand-green/10 rounded-full blur-[100px]" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[5%] lg:left-[15%] text-brand-primary/10 hidden md:block"
      >
        <BookOpen size={64} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[30%] right-[5%] lg:right-[15%] text-brand-accent/20 hidden md:block"
      >
        <Library size={80} />
      </motion.div>
    </section>
  );
};

export default Hero;
