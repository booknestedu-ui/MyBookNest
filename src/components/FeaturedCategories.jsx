import React from 'react';
import { motion } from 'framer-motion';

const FeaturedCategories = () => {
  const categories = [
    "Startup & Business", "Self-Help", "Fiction Bestsellers", 
    "Biographies", "Psychology", "Finance", "Productivity"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8"
        >
          What you can read
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat, index) => (
            <motion.span 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 font-medium hover:bg-white hover:border-brand-accent hover:text-brand-accent transition-all cursor-default shadow-sm select-none"
            >
              {cat}
            </motion.span>
          ))}
          <motion.span 
            variants={itemVariants}
            className="px-6 py-2.5 rounded-full border border-dashed border-gray-300 text-gray-400 font-medium select-none"
          >
            + 1000s more
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
