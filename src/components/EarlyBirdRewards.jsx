import React from "react";
import { Gift, Sparkles, Tag, Users } from "lucide-react";
import { motion } from "framer-motion";

const EarlyBirdRewards = () => {
  const CLAIM_OFFER_URL = "https://forms.gle/KveQxbrY8zAGJcYA8";

  const cards = [
    {
      title: "Fastest 20",
      offer: "60% OFF",
      desc: "For first month",
      highlight: true,
      color: "bg-brand-primary",
      textColor: "text-white",
    },
    {
      title: "Next 30",
      offer: "40% OFF",
      desc: "For first month",
      highlight: false,
      color: "bg-white",
      textColor: "text-brand-primary",
    },
    {
      title: "Next 49",
      offer: "15% Coupon",
      desc: "For first month",
      highlight: false,
      color: "bg-white",
      textColor: "text-brand-primary",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            <span>Launch Offers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
            Get Early Access
          </h2>
          <p className="text-lg text-gray-600">
            Secure your spot for the biggest discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl p-6 ${card.color} ${
                card.highlight
                  ? "shadow-xl ring-4 ring-brand-bg"
                  : "shadow-lg border border-gray-100"
              } flex flex-col items-center text-center transition-all`}
            >
              {card.highlight && (
                <div className="absolute -top-3 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Best Value
                </div>
              )}

              <h3
                className={`text-lg font-semibold mb-1 opacity-80 ${card.textColor}`}
              >
                {card.title}
              </h3>

              <div
                className={`text-4xl sm:text-5xl font-bold mb-2 ${
                  card.highlight ? "text-brand-accent" : "text-brand-primary"
                }`}
              >
                {card.offer}
              </div>
              <p className={`text-sm mb-6 ${card.textColor} opacity-70`}>
                {card.desc}
              </p>

              <a
                href={CLAIM_OFFER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  card.highlight
                    ? "bg-white text-brand-primary hover:bg-gray-50"
                    : "bg-brand-primary text-white hover:bg-slate-800"
                }`}
              >
                Claim Offer
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EarlyBirdRewards;
