import { Menu, Bell, TrendingUp, BookOpen, Star, Moon } from "lucide-react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";
import { SleepSchedule } from "../types";
import { motion } from "framer-motion";
import { useState } from "react";

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  sleepSchedule?: SleepSchedule;
  onBellClick?: () => void;
}

export default function Home({
  onNavigate,
  sleepSchedule,
  onBellClick,
}: HomeProps) {
  const [isPetting, setIsPetting] = useState(false);

  const calculateDuration = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    let startMins = startH * 60 + startM;
    let endMins = endH * 60 + endM;

    if (endMins < startMins) {
      endMins += 24 * 60;
    }

    const diff = endMins - startMins;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m}m`;
  };

  const bedtimeStr = sleepSchedule?.bedtime || "22:30";
  const wakeupStr = sleepSchedule?.wakeup || "07:00";
  const sleepDuration = calculateDuration(bedtimeStr, wakeupStr);

  const handlePetOwl = () => {
    setIsPetting(true);
    setTimeout(() => setIsPetting(false), 300);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background-dark overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6"
      >
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card-dark border border-slate-800 text-slate-100 active:scale-95 transition-transform">
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-100">RestReady</h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBellClick}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card-dark border border-slate-800 text-slate-100"
        >
          <Bell size={20} />
        </motion.button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col w-full"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center p-4"
        >
          <div
            className="relative w-48 h-48 flex items-center justify-center cursor-pointer"
            onClick={handlePetOwl}
          >
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>

            <motion.div
              animate={
                isPetting
                  ? {
                      scale: [1, 0.95, 1.05, 1],
                      rotate: [0, -5, 5, 0],
                    }
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={
                isPetting
                  ? { duration: 0.4 }
                  : {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="relative z-10 w-40 h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-primary/30 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(43,238,157,0.15)]"
            >
              <img
                src="https://images.unsplash.com/photo-1543332143-4e8c27e3256f?q=80&w=400&auto=format&fit=crop"
                alt="Owl"
                className={`w-full h-full object-cover transition-all duration-300 ${isPetting ? "opacity-100 scale-110 sepia-0" : "opacity-80 mix-blend-luminosity hover:scale-105 hover:opacity-90"}`}
              />
            </motion.div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <motion.h1
              animate={isPetting ? { color: "#2BEE9D" } : { color: "#f1f5f9" }}
              className="text-2xl font-bold tracking-tight transition-colors duration-300"
            >
              Hootie
            </motion.h1>
            <p className="text-sm font-medium text-primary">
              Level 12 Sleeper • Ready to rest
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
              Tap to pet
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="px-4 py-2">
          <motion.div
            onClick={() => onNavigate("insights")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-card-dark border border-slate-800 rounded-xl p-6 shadow-[0_0_15px_rgba(43,238,157,0.1)] relative overflow-hidden cursor-pointer group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={64} />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-300 transition-colors">
                  Circadian Alignment
                </p>
                <p className="text-4xl font-bold text-slate-100 leading-none">
                  88%
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                <TrendingUp size={16} />
                <span>+4%</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-primary rounded-full relative"
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="px-4 py-4">
          <div className="flex justify-between items-end mb-3 px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Upcoming Exam
            </h3>
            <button
              onClick={() => onNavigate("planner")}
              className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline"
            >
              View All
            </button>
          </div>
          <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-secondary/20 to-card-dark border border-secondary/30 rounded-xl p-5 flex items-center gap-4 cursor-pointer relative overflow-hidden"
            onClick={() => onNavigate("academicSchedule")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            <div className="p-3 rounded-lg bg-secondary/20 text-secondary z-10">
              <BookOpen size={24} />
            </div>
            <div className="flex-1 z-10">
              <p className="text-base font-semibold text-slate-100 leading-tight">
                Advanced Biochemistry
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                Tomorrow, 09:00 AM
              </p>
            </div>
            <div className="text-right z-10">
              <p className="text-xs font-bold text-secondary">OPTIMAL SLEEP</p>
              <p className="text-slate-100 font-bold">{sleepDuration}</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 px-4 pb-6">
          <motion.div
            onClick={() => onNavigate("planner")}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-card-dark border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden cursor-pointer group"
          >
            <div className="text-primary group-hover:scale-110 transition-transform">
              <Star size={24} className="fill-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                Study Streak
              </p>
              <p className="text-lg font-bold text-slate-100">12 Days</p>
            </div>
          </motion.div>
          <motion.div
            onClick={() => onNavigate("insights")}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-card-dark border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden cursor-pointer group"
          >
            <div className="text-secondary group-hover:scale-110 transition-transform">
              <Star size={24} className="fill-secondary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                Consistency
              </p>
              <p className="text-lg font-bold text-slate-100">5 Days</p>
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:rotate-12 transition-transform">
              <Moon size={48} className="fill-current" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
