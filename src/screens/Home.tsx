import { Menu, Bell, TrendingUp, BookOpen, Star, Moon } from 'lucide-react';
import { Screen } from '../App';
import BottomNav from '../components/BottomNav';
import { SleepSchedule } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  sleepSchedule?: SleepSchedule;
  onBellClick?: () => void;
}

export default function Home({ onNavigate, sleepSchedule, onBellClick }: HomeProps) {
  const calculateDuration = (start: string, end: string) => {
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
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

  const bedtimeStr = sleepSchedule?.bedtime || '22:30';
  const wakeupStr = sleepSchedule?.wakeup || '07:00';
  const sleepDuration = calculateDuration(bedtimeStr, wakeupStr);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex items-center justify-between p-6">
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card-dark border border-slate-800 text-slate-100">
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-bold text-slate-100">RestReady</h2>
        <button onClick={onBellClick} className="w-10 h-10 flex items-center justify-center rounded-full bg-card-dark border border-slate-800 text-slate-100">
          <Bell size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center p-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
          <div className="relative z-10 w-40 h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-primary/30 flex items-center justify-center overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1543332143-4e8c27e3256f?q=80&w=400&auto=format&fit=crop" alt="Owl" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Hootie</h1>
          <p className="text-sm font-medium text-primary">Level 12 Sleeper • Ready to rest</p>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="bg-card-dark border border-slate-800 rounded-xl p-6 shadow-[0_0_15px_rgba(43,238,157,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={64} />
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Circadian Alignment</p>
              <p className="text-4xl font-bold text-slate-100 leading-none">88%</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-primary">
              <TrendingUp size={16} />
              <span>+4%</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4">
            <div className="h-1.5 bg-primary rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Upcoming Exam</h3>
        <div className="bg-gradient-to-r from-secondary/20 to-card-dark border border-secondary/30 rounded-xl p-5 flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('academicSchedule')}>
          <div className="p-3 rounded-lg bg-secondary/20 text-secondary">
            <BookOpen size={24} />
          </div>
          <div className="flex-1">
            <p className="text-base font-semibold text-slate-100 leading-tight">Advanced Biochemistry</p>
            <p className="text-sm text-slate-400 mt-0.5">Tomorrow, 09:00 AM</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-secondary">OPTIMAL SLEEP</p>
            <p className="text-slate-100 font-bold">{sleepDuration}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 px-4 pb-6">
        <div className="flex-1 bg-card-dark border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
          <div className="text-primary">
            <Star size={24} className="fill-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Study Streak</p>
            <p className="text-lg font-bold text-slate-100">12 Days</p>
          </div>
        </div>
        <div className="flex-1 bg-card-dark border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
          <div className="text-secondary">
            <Star size={24} className="fill-secondary" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consistency</p>
            <p className="text-lg font-bold text-slate-100">5 Days</p>
          </div>
          <div className="absolute -right-2 -bottom-2 opacity-5">
            <Moon size={48} className="fill-current" />
          </div>
        </div>
      </div>

      <BottomNav currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}
