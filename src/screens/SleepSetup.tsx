import { ChevronLeft, Settings, Moon, Sun, RotateCcw, BellOff } from 'lucide-react';
import { Screen } from '../App';
import BottomNav from '../components/BottomNav';
import { SleepSchedule } from '../types';
import { useState } from 'react';

interface SleepSetupProps {
  onNavigate: (screen: Screen) => void;
  sleepSchedule?: SleepSchedule;
  setSleepSchedule?: (schedule: SleepSchedule) => void;
}

export default function SleepSetup({ onNavigate, sleepSchedule, setSleepSchedule }: SleepSetupProps) {
  const [localBedtime, setLocalBedtime] = useState(sleepSchedule?.bedtime || '22:00');
  const [localWakeup, setLocalWakeup] = useState(sleepSchedule?.wakeup || '06:30');

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

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const handleSave = () => {
    if (setSleepSchedule) {
      setSleepSchedule({ bedtime: localBedtime, wakeup: localWakeup });
    }
    onNavigate('home');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="flex items-center justify-between p-6">
        <button onClick={() => onNavigate('profile')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <ChevronLeft size={20} className="text-slate-100" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Sleep Setup</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Settings size={20} className="text-slate-100" />
        </button>
      </header>

      <main className="flex-1 px-6 space-y-6">
        <div className="relative flex flex-col items-center justify-center py-4">
          <div className="relative w-72 h-72 rounded-full flex items-center justify-center bg-white/5 border-4 border-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(43,238,157,0.1)]">
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-primary/20 animate-[spin_20s_linear_infinite]"></div>
            <div className="relative text-center z-10">
              <p className="text-primary/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Total Sleep</p>
              <h2 className="text-5xl font-extrabold text-slate-100 tracking-tight">{calculateDuration(localBedtime, localWakeup)}</h2>
            </div>
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="bg-primary text-background-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 shadow-lg shadow-primary/20">
                Bedtime
              </div>
              <div className="w-10 h-10 bg-primary rounded-full border-4 border-background-dark flex items-center justify-center shadow-xl">
                <Moon size={20} className="text-background-dark fill-background-dark" />
              </div>
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center">
              <div className="bg-secondary text-background-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mt-2 shadow-lg shadow-secondary/20">
                Wake-up
              </div>
              <div className="w-10 h-10 bg-secondary rounded-full border-4 border-background-dark flex items-center justify-center shadow-xl">
                <Sun size={20} className="text-background-dark fill-background-dark" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-2xl flex flex-col items-center border-b-2 border-b-primary/30 transition-transform active:scale-95 relative overflow-hidden group">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Bedtime</span>
            <div className="text-3xl font-black text-primary tracking-tighter">{localBedtime}</div>
            <input 
              type="time" 
              value={localBedtime}
              onChange={(e) => setLocalBedtime(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-2xl flex flex-col items-center border-b-2 border-b-secondary/30 transition-transform active:scale-95 relative overflow-hidden group">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">Wake-up</span>
            <div className="text-3xl font-black text-secondary tracking-tighter">{localWakeup}</div>
            <input 
              type="time" 
              value={localWakeup}
              onChange={(e) => setLocalWakeup(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 border-l-4 border-l-primary">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <RotateCcw size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">Flip-to-Sleep</h3>
            <p className="text-sm text-slate-400">Rest your phone face-down to begin tracking instantly.</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <BellOff size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Study Buffer</h3>
              <p className="text-xs text-slate-400">Blocks apps 90m before sleep</p>
            </div>
          </div>
          <div className="relative inline-flex items-center cursor-pointer group">
            <div className="w-12 h-6 bg-slate-700 rounded-full transition-colors"></div>
            <div className="absolute left-1 top-1 bg-primary w-4 h-4 rounded-full transition-all translate-x-6 shadow-[0_0_8px_rgba(43,238,157,0.5)]"></div>
          </div>
        </div>

        <button onClick={handleSave} className="w-full py-4 mb-6 rounded-2xl font-black text-base bg-gradient-to-r from-secondary via-primary to-primary text-background-dark shadow-[0_0_30px_rgba(43,238,157,0.3)] transform transition-all active:scale-[0.98] uppercase tracking-widest">
          Save Schedule
        </button>
      </main>

      <BottomNav currentScreen="sleepSetup" onNavigate={onNavigate} />
    </div>
  );
}
