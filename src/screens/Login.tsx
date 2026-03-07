import { Mail, Lock, Eye, Moon } from 'lucide-react';
import { Screen } from '../App';

export default function Login({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex flex-col min-h-screen px-6 py-8 max-w-md mx-auto">
      <div className="flex flex-col items-center mt-12 mb-10">
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
          <div className="relative z-10 text-primary flex items-center justify-center">
            <Moon size={48} className="fill-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-center text-slate-100">Welcome Back</h1>
        <p className="text-slate-400 mt-2 text-center">Your better sleep starts here</p>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
          <div className="flex items-center bg-slate-800/40 border border-secondary/30 rounded-xl px-4 h-14 focus-within:border-secondary/80 transition-colors">
            <Mail size={20} className="text-slate-500 mr-3" />
            <input type="email" placeholder="your@email.com" className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <button className="text-xs text-slate-500 hover:text-primary transition-colors">Forgot Password?</button>
          </div>
          <div className="flex items-center bg-slate-800/40 border border-secondary/30 rounded-xl px-4 h-14 focus-within:border-secondary/80 transition-colors">
            <Lock size={20} className="text-slate-500 mr-3" />
            <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-500" />
            <button className="text-slate-500 hover:text-slate-300 ml-2">
              <Eye size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button onClick={() => onNavigate('home')} className="w-full h-14 bg-primary text-background-dark font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(43,238,157,0.4)] hover:brightness-105 active:scale-[0.98] transition-all">
          Login
        </button>
      </div>

      <div className="mt-12">
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="mx-4 text-sm font-medium text-slate-500">Or login with</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>
        <div className="flex gap-4 mt-4">
          <button className="flex-1 flex items-center justify-center h-14 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors text-slate-200 font-medium">
            Google
          </button>
          <button className="flex-1 flex items-center justify-center h-14 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors text-slate-200 font-medium">
            Apple
          </button>
        </div>
      </div>

      <div className="mt-auto pt-10 pb-6 text-center">
        <p className="text-sm text-slate-400">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('signup')} className="text-primary font-bold hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
}
