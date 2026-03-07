import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Screen } from "../App";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: User, label: "Profile", onClick: () => {} },
    { icon: Settings, label: "Settings", onClick: () => {} },
    { icon: Shield, label: "Privacy Policy", onClick: () => {} },
    { icon: HelpCircle, label: "Help & Support", onClick: () => {} },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-slate-900 border-r border-slate-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800/50 flex justify-between items-center bg-slate-800/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary font-bold">
                  S
                </div>
                <div>
                  <h3 className="text-slate-100 font-bold">SleepMaster</h3>
                  <p className="text-[10px] text-slate-400">Pro Member</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-primary transition-colors group"
                >
                  <item.icon
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-slate-600 group-hover:text-primary transition-colors"
                  />
                </button>
              ))}
            </div>

            {/* Footer / Logout */}
            <div className="p-6 border-t border-slate-800/50 mt-auto">
              <button
                onClick={() => onNavigate("login")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-bold"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
              <p className="text-center text-[10px] text-slate-600 mt-4">
                RestReady v1.0.0
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
