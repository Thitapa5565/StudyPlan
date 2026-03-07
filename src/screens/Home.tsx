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
  readinessScore: number;
}

// Interactive SVG Owl component
const AnimatedOwl = ({
  isPetting,
  score,
}: {
  isPetting: boolean;
  score: number;
}) => {
  // Determine expression based on score
  const getExpression = () => {
    if (isPetting) return "happy";
    if (score >= 80) return "awake";
    if (score >= 60) return "neutral";
    return "sad";
  };

  const expression = getExpression();

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full drop-shadow-xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <motion.ellipse
        cx="100"
        cy="110"
        rx="65"
        ry="75"
        fill="#1E293B"
        stroke="#2BEE9D"
        strokeWidth="3"
        animate={{
          ry: isPetting ? 70 : 75,
          cy: isPetting ? 115 : 110,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      />

      {/* Belly */}
      <ellipse cx="100" cy="125" rx="45" ry="50" fill="#334155" opacity="0.6" />

      {/* Belly Details (Feathers) */}
      <path
        d="M 85 110 Q 100 120 115 110 M 80 130 Q 100 140 120 130 M 85 150 Q 100 160 115 150"
        stroke="#475569"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left Wing */}
      <motion.path
        d="M 35 110 Q 10 150 45 165 Z"
        fill="#0F172A"
        stroke="#2BEE9D"
        strokeWidth="2"
        style={{ originX: "35px", originY: "110px" }}
        animate={{ rotate: isPetting ? -20 : expression === "sad" ? 10 : 0 }}
      />

      {/* Right Wing */}
      <motion.path
        d="M 165 110 Q 190 150 155 165 Z"
        fill="#0F172A"
        stroke="#2BEE9D"
        strokeWidth="2"
        style={{ originX: "165px", originY: "110px" }}
        animate={{ rotate: isPetting ? 20 : expression === "sad" ? -10 : 0 }}
      />

      {/* Ears / Horns */}
      <motion.path
        d="M 50 60 L 35 25 L 80 45 Z"
        fill="#1E293B"
        stroke="#2BEE9D"
        strokeWidth="2"
        style={{ originX: "50px", originY: "60px" }}
        animate={{ rotate: expression === "sad" ? -15 : 0 }}
      />
      <motion.path
        d="M 150 60 L 165 25 L 120 45 Z"
        fill="#1E293B"
        stroke="#2BEE9D"
        strokeWidth="2"
        style={{ originX: "150px", originY: "60px" }}
        animate={{ rotate: expression === "sad" ? 15 : 0 }}
      />

      {/* Eye Socket Background // Glasses frame */}
      <path
        d="M 45 75 C 60 55, 90 55, 100 75 C 110 55, 140 55, 155 75 C 150 100, 110 100, 100 85 C 90 100, 50 100, 45 75 Z"
        fill="#334155"
      />

      {/* Eyes */}
      {expression === "awake" || expression === "happy" ? (
        <>
          <circle cx="75" cy="75" r="16" fill="#F8FAFC" />
          <circle cx="125" cy="75" r="16" fill="#F8FAFC" />

          <motion.circle
            cx="75"
            cy="75"
            r="8"
            fill="#2BEE9D"
            animate={
              isPetting
                ? { scale: [1, 1.2, 1] }
                : { cx: [75, 76, 74, 75], cy: [75, 75, 76, 75] }
            }
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="125"
            cy="75"
            r="8"
            fill="#2BEE9D"
            animate={
              isPetting
                ? { scale: [1, 1.2, 1] }
                : { cx: [125, 126, 124, 125], cy: [75, 75, 76, 75] }
            }
            transition={{ duration: 2, repeat: Infinity }}
          />

          {expression === "happy" && (
            <>
              {/* Happy curves over eyes */}
              <path
                d="M 60 65 Q 75 55 90 65"
                stroke="#2BEE9D"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 110 65 Q 125 55 140 65"
                stroke="#2BEE9D"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}
        </>
      ) : expression === "sad" ? (
        <>
          {/* Sad Eyes */}
          <circle cx="75" cy="75" r="14" fill="#F8FAFC" />
          <circle cx="125" cy="75" r="14" fill="#F8FAFC" />

          {/* Sad Eyelids (slanting downwards) */}
          <path d="M 55 70 Q 75 60 90 85 Z" fill="#1E293B" />
          <path d="M 145 70 Q 125 60 110 85 Z" fill="#1E293B" />

          <motion.circle
            cx="78"
            cy="80"
            r="5"
            fill="#2BEE9D"
            animate={{ y: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="122"
            cy="80"
            r="5"
            fill="#2BEE9D"
            animate={{ y: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Tear drop */}
          <motion.path
            d="M 70 88 C 70 92, 74 92, 74 88 C 74 84, 72 82, 72 82 C 72 82, 70 84, 70 88 Z"
            fill="#38BDF8"
            animate={{ y: [0, 15, 20], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </>
      ) : (
        // Neutral
        <>
          <circle cx="75" cy="75" r="14" fill="#F8FAFC" />
          <circle cx="125" cy="75" r="14" fill="#F8FAFC" />
          {/* Half-closed lids */}
          <path d="M 58 70 L 92 70" stroke="#1E293B" strokeWidth="12" />
          <path d="M 108 70 L 142 70" stroke="#1E293B" strokeWidth="12" />
          <circle cx="75" cy="78" r="6" fill="#2BEE9D" />
          <circle cx="125" cy="78" r="6" fill="#2BEE9D" />
        </>
      )}

      {/* Beak */}
      <motion.path
        d="M 95 85 L 105 85 L 100 100 Z"
        fill="#FBBF24"
        animate={
          isPetting
            ? { y: [0, 2, 0] }
            : expression === "sad"
              ? { scaleY: 0.8, y: 3 }
              : {}
        }
        transition={{ duration: 0.2, repeat: isPetting ? 2 : 0 }}
      />

      {/* Feet */}
      <path
        d="M 75 180 L 70 190 M 75 180 L 80 190 M 75 180 L 75 192"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 125 180 L 120 190 M 125 180 L 130 190 M 125 180 L 125 192"
        stroke="#FBBF24"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default function Home({
  onNavigate,
  sleepSchedule,
  onBellClick,
  readinessScore,
}: HomeProps) {
  const [isPetting, setIsPetting] = useState(false);
  const score = readinessScore;

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
    setTimeout(() => setIsPetting(false), 800);
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
                      rotate: [0, -2, 2, 0],
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
              className="relative z-10 w-40 h-40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-full border-2 border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(43,238,157,0.15)] backdrop-blur-sm p-4"
            >
              <AnimatedOwl isPetting={isPetting} score={score} />
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
              Level 12 Sleeper •{" "}
              {score >= 80
                ? "Ready to learn"
                : score >= 60
                  ? "Tired but okay"
                  : "Needs sleep"}
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
                  Concentration
                </p>
                <p className="text-4xl font-bold text-slate-100 leading-none">
                  {score}%
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
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full relative ${score >= 80 ? "bg-primary" : score >= 60 ? "bg-yellow-400" : "bg-red-500"}`}
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
