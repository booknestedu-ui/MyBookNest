import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, MessageCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Community = () => {
  const socials = [
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6 text-white" />,
      link: "https://www.instagram.com/_mybooknest.in",
      handle: "@_mybooknest.in",
      bg: "bg-gradient-to-br from-purple-600 to-pink-600"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6 text-white" />,
      link: "https://www.linkedin.com/company/mybooknest",
      handle: "MyBookNest",
      bg: "bg-gradient-to-br from-blue-600 to-cyan-600"
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      link: "https://chat.whatsapp.com/JrjVsS5sYGO62434pWkPyW",
      handle: "Reader Squad",
      bg: "bg-gradient-to-br from-green-500 to-emerald-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"
      ></motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Join the Tribe</h2>
            <p className="text-gray-400 text-lg mb-6">
              Connect with fellow readers, get personalized recommendations, and stay updated on new arrivals.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-brand-primary flex items-center justify-center text-xs font-medium text-white">
                    <Users size={14} />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-white">Join 500+ readers today</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {socials.map((social, index) => (
            <motion.a 
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-all group flex flex-col justify-between h-48"
            >
              <div className="flex justify-between items-start">
                <div className={`${social.bg} p-3 rounded-xl shadow-lg`}>
                  {social.icon}
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-1">{social.name}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{social.handle}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
