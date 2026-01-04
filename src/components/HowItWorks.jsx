import React from "react";
import {
  Book,
  ShoppingBag,
  Coffee,
  CornerDownLeft,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "Choose Book",
      desc: "Browse from 10,000+ bestsellers.",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Rent",
      desc: "Select a plan that fits you.",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Read",
      desc: "Keep it for 15 or 30 days.",
    },
    {
      icon: <CornerDownLeft className="w-6 h-6" />,
      title: "Return",
      desc: "We pick it up from your door.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-brand-primary mb-16"
        >
          How it Works
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-center items-start gap-8 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center w-full md:w-64 relative z-10"
            >
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="hidden md:block absolute top-8 -right-1/2 text-gray-200"
                >
                  <ArrowRight className="w-8 h-8" />
                </motion.div>
              )}

              <div className="relative mb-6 group cursor-default">
                <span className="absolute -top-3 -right-3 bg-brand-primary text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm z-20">
                  {index + 1}
                </span>
                <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-gray-200 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors shadow-sm">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-brand-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
