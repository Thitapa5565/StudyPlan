import { Mail, Lock, Eye, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Screen } from '../App';

export default function SignUp({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-dark/80 backdrop-blur-md">
        <button onClick={() => onNavigate('login')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-slate-100">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">RestReady</h2>
      </div>

      <div className="px-4 py-2">
        <div className="w-full bg-gradient-to-b from-slate-800 to-background-dark rounded-xl min-h-[200px] relative shadow-2xl overflow-hidden flex items-center justify-center border border-slate-800">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
        </div>
      </div>

      <div className="px-6 pt-6 pb-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">Join RestReady</h1>
        <p className="text-base text-slate-400 mt-2">Balance your study and sleep like a Pro</p>
      </div>

      <div className="flex flex-col gap-5 px-6 py-4 max-w-md mx-auto w-full">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
          <div className="flex items-center bg-slate-800/40 border border-secondary/40 rounded-xl px-4 h-14 focus-within:border-primary transition-colors">
            <User size={20} className="text-slate-500 mr-3" />
            <input type="text" placeholder="John Doe" className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
          <div className="flex items-center bg-slate-800/40 border border-secondary/40 rounded-xl px-4 h-14 focus-within:border-primary transition-colors">
            <Mail size={20} className="text-slate-500 mr-3" />
            <input type="email" placeholder="your@email.com" className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Create Password</label>
          <div className="flex items-center bg-slate-800/40 border border-secondary/40 rounded-xl px-4 h-14 focus-within:border-primary transition-colors">
            <Lock size={20} className="text-slate-500 mr-3" />
            <input type="password" placeholder="Min. 8 characters" className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder:text-slate-500" />
            <button className="text-slate-500 hover:text-slate-300 ml-2">
              <Eye size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <input type="checkbox" id="terms" className="mt-1 w-5 h-5 rounded border-secondary/40 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-background-dark" />
          <label htmlFor="terms" className="text-sm text-slate-400 leading-snug">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </label>
        </div>

        <button onClick={() => onNavigate('home')} className="w-full h-14 mt-4 bg-gradient-to-br from-secondary to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <span>Create Account</span>
          <ArrowRight size={20} />
        </button>

        <div className="text-center py-6">
          <p className="text-sm text-slate-400">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-primary font-semibold hover:underline">Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
