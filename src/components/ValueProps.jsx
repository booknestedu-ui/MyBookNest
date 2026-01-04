import React from "react";
import { Wallet, Clock, RotateCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const ValueProps = () => {
  const props = [
    {
      icon: <Wallet className="w-6 h-6 text-brand-accent" />,
      title: "Save Money",
      desc: "Why buy a ₹500 book to read once? Rent it and save the rest for your next read.",
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-green" />,
      title: "Read at Your Pace",
      desc: "Get 15 or 30 days. Need more time? Extend anytime with a single click.",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-blue-500" />,
      title: "Doorstep Service",
      desc: "We deliver and pick up. You don't step out. Complete peace of mind.",
    },
  ];

  return (
    <section className="py-24 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Heading & Context */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Smart Reading</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-6 leading-tight">
              Why 500+ Students Chose MyBookNest
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We know the pain of expensive books and cluttered shelves.
              MyBookNest is built to fix exactly that—giving you access to a
              massive library without the ownership cost.
            </p>
            <button className="hidden lg:inline-flex text-brand-primary font-semibold border-b-2 border-brand-accent pb-0.5 hover:text-brand-accent transition-colors">
              Read Our Story
            </button>
          </motion.div>

          {/* Right: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {props.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                }}
                className={`p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {prop.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-primary mb-2">
                  {prop.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {prop.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
