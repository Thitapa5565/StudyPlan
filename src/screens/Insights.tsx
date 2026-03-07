import { useState } from "react";
import {
  ArrowLeft,
  Share2,
  Trophy,
  Moon,
  Sparkles,
  Activity,
} from "lucide-react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";
import FullRankingsModal from "../components/FullRankingsModal";
import { SleepSchedule } from "../types";

interface InsightsProps {
  onNavigate: (screen: Screen) => void;
  sleepSchedule?: SleepSchedule;
  readinessScore: number;
}

export default function Insights({
  onNavigate,
  sleepSchedule,
  readinessScore,
}: InsightsProps) {
  const [isRankingsOpen, setIsRankingsOpen] = useState(false);

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const bedtimeStr = sleepSchedule?.bedtime || "22:30";
  const formattedBedtime = formatTime(bedtimeStr);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="flex items-center justify-between p-6 sticky top-0 z-10 bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-100" />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-slate-100">
          Pro Insights
        </h1>
        <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
          <Share2 size={24} className="text-slate-100" />
        </button>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        <section className="flex flex-col items-center py-6 bg-primary/5 rounded-xl border border-primary/10">
          <h2 className="text-secondary font-semibold text-sm uppercase tracking-widest mb-6">
            Concentration
          </h2>
          <div className="relative flex items-center justify-center w-48 h-48">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#1e293b"
                strokeWidth="12"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={
                  readinessScore >= 80
                    ? "#2BEE9D"
                    : readinessScore >= 60
                      ? "#FBBF24"
                      : "#EF4444"
                }
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - readinessScore / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-slate-100">
                {readinessScore}
              </span>
              <span className="text-sm text-slate-400 font-medium">/ 100</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p
              className={`text-xl font-bold ${readinessScore >= 80 ? "text-primary" : readinessScore >= 60 ? "text-yellow-400" : "text-red-500"}`}
            >
              {readinessScore >= 80
                ? "Peak Performance"
                : readinessScore >= 60
                  ? "Moderate Focus"
                  : "Low Energy"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {readinessScore >= 80
                ? "Ready for high-complexity analytical tasks"
                : readinessScore >= 60
                  ? "Suitable for routine tasks"
                  : "Rest is recommended before heavy focus"}
            </p>
          </div>
        </section>

        <section className="bg-slate-900/40 p-5 rounded-xl border border-secondary/10 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold tracking-tight text-slate-100 flex items-center gap-2">
              <Trophy size={18} className="text-secondary" />
              Community Scoreboard
            </h3>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 font-bold tracking-widest uppercase">
              Pro Only
            </span>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-12">
                    Rank
                  </th>
                  <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Pro Name
                  </th>
                  <th className="py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">
                    Discipline
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-800/50 hover:bg-secondary/5 transition-colors">
                  <td className="py-3 font-bold text-secondary">01</td>
                  <td className="py-3 text-slate-300">SleepMaster #42</td>
                  <td className="py-3 text-right font-mono text-primary font-bold">
                    99.4
                  </td>
                </tr>
                <tr className="border-b border-slate-800/50 hover:bg-secondary/5 transition-colors">
                  <td className="py-3 font-bold text-slate-400">02</td>
                  <td className="py-3 text-slate-300">StellarSleep #09</td>
                  <td className="py-3 text-right font-mono text-primary/80">
                    98.1
                  </td>
                </tr>
                <tr className="hover:bg-secondary/5 transition-colors">
                  <td className="py-3 font-bold text-slate-400">03</td>
                  <td className="py-3 text-slate-300">ZenSleeper #14</td>
                  <td className="py-3 text-right font-mono text-primary/80">
                    97.8
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-center">
            <button
              onClick={() => setIsRankingsOpen(true)}
              className="text-[10px] font-bold text-secondary hover:text-secondary/80 transition-colors uppercase tracking-widest"
            >
              View Full Rankings
            </button>
          </div>
        </section>

        <section className="bg-slate-900/40 p-5 rounded-xl border border-primary/5 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold">Correlation Analysis</h3>
              <p className="text-sm text-slate-400">Sleep vs. Concentration</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/10 text-[10px] text-secondary border border-secondary/20">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>{" "}
                Sleep
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-[10px] text-primary border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary"></span>{" "}
                Concentration
              </span>
            </div>
          </div>
          <div className="relative h-48 w-full mt-4">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 400 150"
            >
              <path
                d="M0 120 Q 50 110, 100 80 T 200 60 T 300 90 T 400 40"
                fill="none"
                stroke="#B19CD9"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <path
                d="M0 100 Q 50 90, 100 50 T 200 70 T 300 30 T 400 20"
                fill="none"
                stroke="#2bee9d"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="150"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-slate-800"
              ></line>
              <line
                x1="80"
                y1="0"
                x2="80"
                y2="150"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-slate-800"
              ></line>
              <line
                x1="160"
                y1="0"
                x2="160"
                y2="150"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-slate-800"
              ></line>
              <line
                x1="240"
                y1="0"
                x2="240"
                y2="150"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-slate-800"
              ></line>
              <line
                x1="320"
                y1="0"
                x2="320"
                y2="150"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-slate-800"
              ></line>
              <line
                x1="400"
                y1="0"
                x2="400"
                y2="150"
                stroke="currentColor"
                strokeDasharray="4"
                className="text-slate-800"
              ></line>
            </svg>
          </div>
          <div className="flex justify-between mt-4 px-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Mon
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Tue
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Wed
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Thu
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Fri
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              Sat
            </span>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/40 p-4 rounded-xl border border-secondary/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Moon size={20} className="text-secondary" />
              <h4 className="text-xs font-semibold text-slate-300">
                Sleep Debt
              </h4>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-slate-100">
                1.2
                <span className="text-sm font-normal text-slate-500 ml-1">
                  hrs
                </span>
              </p>
              <div className="flex items-center gap-1 text-primary text-[10px]">
                <Activity size={12} />
                <span>Decreasing</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/40 p-4 rounded-xl border border-primary/10 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-primary" />
              <h4 className="text-xs font-semibold text-slate-300">
                Best Window
              </h4>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-slate-100">09:30 AM</p>
              <p className="text-[10px] text-slate-500">Peak Alpha Waves</p>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 rounded-xl border border-slate-700 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Activity size={20} className="text-secondary" />
              Pro Prediction
            </h3>
            <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
              AI Analysis
            </span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your circadian rhythm indicates a 15% increase in focus if you
            maintain a {formattedBedtime} bedtime tonight. Recovery from current
            sleep debt is expected in{" "}
            <span className="text-primary font-bold">2 days</span>.
          </p>
        </section>
      </main>

      <BottomNav currentScreen="insights" onNavigate={onNavigate} />

      <FullRankingsModal
        isOpen={isRankingsOpen}
        onClose={() => setIsRankingsOpen(false)}
      />
    </div>
  );
}
