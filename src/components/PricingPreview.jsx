import React from "react";
import { motion } from "framer-motion";

const PricingPreview = () => {
  const plans = [
    {
      duration: "1 Month",
      price: "₹149",
      daily: "₹5 / day",
      popular: true,
      save: "Save ₹350 per book",
    },
    {
      duration: "3 Months",
      price: "₹389",
      daily: "₹4 / day",
      save: "Save ₹1000+ total",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-brand-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 mb-12">
            Cheaper than buying a pirated copy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto cursor-default">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-2xl p-8 border ${
                plan.popular
                  ? "border-brand-primary ring-1 ring-brand-primary/10 shadow-xl scale-105 z-10"
                  : "border-gray-100 shadow-sm"
              } flex flex-col`}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </span>
              )}

              {/* Comparison Chip */}
              <div className="mb-6">
                <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-100">
                  {plan.save}
                </span>
              </div>

              <div className="text-5xl font-bold text-brand-primary mb-2 tracking-tight">
                {plan.price}
              </div>
              <div className="text-gray-400 font-medium text-sm mb-6">
                {plan.duration}
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 w-full">
                <p className="text-brand-accent font-semibold text-sm flex items-center justify-center gap-1">
                  Effective Cost: {plan.daily}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
