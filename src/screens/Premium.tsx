import { X, CheckCircle2, Lock, Brain, Shield, Activity, Home, Calendar, Moon, BarChart2, User } from 'lucide-react';
import { Screen } from '../App';

export default function Premium({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md">
        <button onClick={() => onNavigate('home')} className="flex size-12 shrink-0 items-center justify-start text-slate-100">
          <X size={24} />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center text-slate-100">RestReady</h2>
        <div className="flex w-12 items-center justify-end cursor-pointer">
          <p className="text-primary text-sm font-bold uppercase">Restore</p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="relative flex flex-col justify-end overflow-hidden rounded-xl min-h-[260px] border border-slate-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221a] to-transparent"></div>
          <div className="relative flex flex-col p-6 gap-2 z-10">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full w-fit uppercase tracking-wider">Premium Access</span>
            <h1 className="text-white tracking-tight text-3xl font-bold leading-tight">Maximize Your Academic Potential</h1>
            <p className="text-slate-300 text-sm max-w-md">Unlock high-performance cognitive tools designed for the modern scholar.</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
          <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-800/50">
            <div className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Feature</div>
            <div className="p-4 text-xs font-bold text-center text-slate-500 uppercase tracking-widest">Free</div>
            <div className="p-4 text-xs font-bold text-center text-primary uppercase tracking-widest">Pro</div>
          </div>

          <div className="grid grid-cols-3 border-b border-slate-800 items-center">
            <div className="p-4">
              <p className="text-sm font-medium text-slate-200">AI Study Planner</p>
            </div>
            <div className="p-4 text-center">
              <span className="text-slate-400 font-bold">—</span>
            </div>
            <div className="p-4 flex justify-center">
              <CheckCircle2 size={20} className="text-primary" />
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-slate-800 items-center bg-gradient-to-br from-[#d4af37]/10 to-[#967bb6]/10">
            <div className="p-4">
              <p className="text-sm font-medium text-slate-200">Social Media Hard-Lock</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-slate-400">BASIC</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-primary">STRICT</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-slate-800 items-center">
            <div className="p-4">
              <p className="text-sm font-medium text-slate-200">Brain Analytics</p>
            </div>
            <div className="p-4 flex justify-center">
              <Lock size={18} className="text-slate-400" />
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-primary">ADVANCED</p>
            </div>
          </div>

          <div className="grid grid-cols-3 items-center">
            <div className="p-4">
              <p className="text-sm font-medium text-slate-200">Cloud Sync</p>
            </div>
            <div className="p-4 flex justify-center">
              <CheckCircle2 size={20} className="text-primary" />
            </div>
            <div className="p-4 flex justify-center">
              <CheckCircle2 size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-10">
        <h3 className="text-lg font-bold mb-4 text-slate-100">Why upgrade?</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Brain size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">AI-Powered Study Planner</h4>
              <p className="text-xs text-slate-400 mt-1">Adaptive schedules based on your energy levels and past performance.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
              <Shield size={20} className="text-[#d4af37]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Strict Social Media Hard-Lock</h4>
              <p className="text-xs text-slate-400 mt-1">Unbreakable blocks on distracting apps during your deep work sessions.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-[#967bb6]/10 flex items-center justify-center shrink-0">
              <Activity size={20} className="text-[#967bb6]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-100">Advanced Brain Readiness Analytics</h4>
              <p className="text-xs text-slate-400 mt-1">Real-time biometrics integration to measure cognitive fatigue.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 bg-background-dark/80 backdrop-blur-sm sticky bottom-20 z-40">
        <button onClick={() => onNavigate('home')} className="w-full bg-primary text-background-dark py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(43,238,157,0.4)] hover:opacity-90 transition-all active:scale-[0.98]">
          Start 7-Day Free Trial
        </button>
        <p className="text-center text-[10px] text-slate-500 mt-2">Then $9.99/month. Cancel anytime.</p>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-md border-t border-slate-800/50 pb-8 pt-3 px-6">
        <div className="flex items-end justify-between max-w-lg mx-auto">
          <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1 group">
            <Home size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Home</span>
          </button>
          <button onClick={() => onNavigate('planner')} className="flex flex-col items-center gap-1 group">
            <Calendar size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Planner</span>
          </button>
          <button onClick={() => onNavigate('deepSleep')} className="flex flex-col items-center -mt-6">
            <div className="w-14 h-14 rounded-full bg-slate-900 border border-[#967bb6]/30 flex items-center justify-center shadow-[0_0_20px_rgba(150,123,182,0.3)] active:scale-95 transition-all">
              <Moon size={28} className="text-[#967bb6] fill-[#967bb6]" />
            </div>
            <span className="text-[10px] font-bold text-[#967bb6] uppercase tracking-tighter mt-2">Sleep</span>
          </button>
          <button onClick={() => onNavigate('insights')} className="flex flex-col items-center gap-1 group relative">
            <div className="absolute -top-1 -right-2 bg-primary text-[8px] font-black px-1 rounded-sm text-background-dark">PRO</div>
            <BarChart2 size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Insights</span>
          </button>
          <button onClick={() => onNavigate('profile')} className="flex flex-col items-center gap-1 group">
            <User size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
