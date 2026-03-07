import { Settings, Bell, Calendar, Moon, CreditCard, Star } from "lucide-react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
  onBellClick?: () => void;
}

export default function Profile({ onNavigate, onBellClick }: ProfileProps) {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="flex items-center justify-between p-6 pt-8">
        <button
          onClick={() => onNavigate("sleepSetup")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <Settings size={20} className="text-primary" />
        </button>
        <h1 className="text-lg font-semibold tracking-tight">Profile</h1>
        <button
          onClick={onBellClick}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <Bell size={20} className="text-primary" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto">
        <section className="flex flex-col items-center px-6 mb-8">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full border-2 border-primary p-1 flex items-center justify-center bg-primary/10">
              <div className="text-6xl font-bold text-primary">S</div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-background-dark text-[10px] font-bold px-2 py-1 rounded-full border-2 border-background-dark flex items-center gap-1">
              <Star size={12} className="fill-background-dark" />
              PRO
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">SleepMaster</h2>
        </section>

        <section className="px-6 space-y-3">
          <div
            onClick={() => onNavigate("academicSchedule")}
            className="bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between p-4 rounded-xl cursor-pointer hover:bg-primary/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium">
                Permanent Class Schedule
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary/40 text-lg">&gt;</span>
            </div>
          </div>

          <div
            onClick={() => onNavigate("sleepSetup")}
            className="bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between p-4 rounded-xl cursor-pointer hover:bg-primary/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Moon size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium">Sleep Goal Settings</span>
            </div>
            <span className="text-primary/40 text-lg">&gt;</span>
          </div>

          <div
            onClick={() => onNavigate("premium")}
            className="bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between p-4 rounded-xl cursor-pointer hover:bg-primary/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard size={20} className="text-primary" />
              </div>
              <span className="text-sm font-medium">
                Subscription Management
              </span>
            </div>
            <span className="text-primary/40 text-lg">&gt;</span>
          </div>
        </section>

        <section className="px-6 py-8">
          <button
            onClick={() => onNavigate("login")}
            className="w-full py-4 rounded-xl border border-primary/20 text-primary/60 text-sm font-semibold tracking-wide hover:bg-primary/5 transition-colors"
          >
            Log Out
          </button>
        </section>
      </main>

      <BottomNav currentScreen="profile" onNavigate={onNavigate} />
    </div>
  );
}
