import React, { useState, useEffect, useRef } from "react";
import { Moon, Shield, X } from "lucide-react";
import { Screen } from "../App";
import { SleepSchedule } from "../types";

interface DeepSleepProps {
  onNavigate: (screen: Screen) => void;
  sleepSchedule: SleepSchedule;
}

export default function DeepSleep({
  onNavigate,
  sleepSchedule,
}: DeepSleepProps) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const [progress, setProgress] = useState(0);
  const pressTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePressStart = () => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds

    pressTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        if (pressTimerRef.current) clearInterval(pressTimerRef.current);
        onNavigate("home");
      }
    }, 16);
  };

  const handlePressEnd = () => {
    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    setProgress(0);
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background-dark overflow-hidden px-6">
      <div className="absolute top-12 flex items-center gap-2 opacity-40">
        <Moon size={20} className="text-[#7E84A3]" />
        <h2 className="text-sm font-medium tracking-widest uppercase text-[#7E84A3]">
          RestReady
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-[84px] font-light tracking-tighter text-[#9DA3C5] opacity-80 leading-none">
            {currentTime}
          </h1>
          <div className="h-1 w-12 bg-[#9DA3C5]/20 rounded-full mt-4"></div>
        </div>

        <div className="max-w-xs text-center space-y-2">
          <p className="text-lg font-light text-[#7E84A3] leading-relaxed">
            Your brain is recharging.
          </p>
          <p className="text-sm font-medium text-[#9DA3C5]/60">
            See you at {formatTime(sleepSchedule.wakeup)}
          </p>
        </div>

        <div className="bg-[#9DA3C5]/5 backdrop-blur-md border border-[#9DA3C5]/10 flex items-center gap-3 px-5 py-2.5 rounded-full mt-8">
          <Shield size={18} className="text-[#9DA3C5]/70 fill-[#9DA3C5]/70" />
          <span className="text-xs font-medium tracking-wide text-[#9DA3C5]/80 uppercase">
            Strict Lock Active
          </span>
        </div>

        <button
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          className="mt-12 flex flex-col items-center gap-3 group transition-all duration-300"
        >
          <div
            className={`h-12 w-12 rounded-full border border-[#9DA3C5]/20 flex items-center justify-center transition-all ${progress > 0 ? "bg-[#9DA3C5]/15 scale-95" : "bg-[#9DA3C5]/5"}`}
          >
            <X size={20} className="text-[#9DA3C5]/40" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-medium tracking-[0.2em] text-[#9DA3C5]/30 uppercase">
              Long press to cancel
            </span>
            <div className="w-12 h-0.5 bg-[#9DA3C5]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9DA3C5]/40"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </button>
      </div>

      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
}
