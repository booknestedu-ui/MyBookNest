import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLive, setIsLive] = useState(false);

  function calculateTimeLeft() {
    const launchDate = new Date("2026-01-15T00:00:00+05:30"); // 15 Jan 2026 IST
    const now = new Date();
    const difference = launchDate - now;

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const left = calculateTimeLeft();
      if (!left) {
        setIsLive(true);
        clearInterval(timer);
      } else {
        setTimeLeft(left);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLive) {
    return (
      <section className="py-12 bg-white text-center">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl sm:text-6xl font-bold text-brand-accent tracking-tight"
        >
          🎉 We Are Live!
        </motion.h2>
        <p className="mt-4 text-xl text-gray-600">Start renting books now.</p>
      </section>
    );
  }

  if (!timeLeft) return null; // Initial render safe

  const TimeBox = ({ value, label, isLast, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5, type: "spring" }}
      className="flex flex-col items-center mx-2 sm:mx-4"
    >
      <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center mb-3 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-4xl sm:text-6xl font-bold ${
              isLast ? "text-brand-accent" : "text-brand-primary"
            }`}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-sm sm:text-base font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );

  return (
    <section className="py-16 bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl text-gray-600 font-medium mb-10"
        >
          Launching on 15 January
        </motion.h3>
        <div className="flex justify-center flex-wrap">
          <TimeBox value={timeLeft.days} label="Days" delay={0} />
          <TimeBox value={timeLeft.hours} label="Hours" delay={0.1} />
          <TimeBox value={timeLeft.minutes} label="Minutes" delay={0.2} />
          <TimeBox
            value={timeLeft.seconds}
            label="Seconds"
            isLast={true}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
