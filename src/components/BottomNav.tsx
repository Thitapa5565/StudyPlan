import { Home, Calendar, Moon, BarChart2, User } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background-dark/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 pb-safe">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <button onClick={() => onNavigate('home')} className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'home' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}>
          <Home size={24} className={currentScreen === 'home' ? 'fill-primary/20' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </button>
        
        <button onClick={() => onNavigate('planner')} className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'planner' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}>
          <Calendar size={24} className={currentScreen === 'planner' ? 'fill-primary/20' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Planner</span>
        </button>

        <div className="relative -top-6 flex flex-col items-center">
          <button onClick={() => onNavigate('deepSleep')} className="flex items-center justify-center w-14 h-14 rounded-full bg-card-dark border border-secondary/30 shadow-[0_0_15px_rgba(167,139,250,0.3)] text-secondary active:scale-95 transition-all">
            <Moon size={28} className="fill-secondary" />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-secondary mt-2">Sleep</span>
        </div>

        <button onClick={() => onNavigate('insights')} className={`flex flex-col items-center gap-1 transition-colors relative ${currentScreen === 'insights' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}>
          <div className="relative">
            <BarChart2 size={24} className={currentScreen === 'insights' ? 'fill-primary/20' : ''} />
            <span className="absolute -top-1 -right-3 bg-primary text-background-dark text-[8px] font-black px-1 rounded-sm uppercase tracking-tighter">Pro</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Insights</span>
        </button>

        <button onClick={() => onNavigate('profile')} className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'profile' ? 'text-primary' : 'text-slate-500 hover:text-slate-300'}`}>
          <User size={24} className={currentScreen === 'profile' ? 'fill-primary/20' : ''} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </button>
      </div>
    </nav>
  );
}
