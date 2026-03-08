import {
  ChevronLeft,
  Settings,
  Moon,
  Sun,
  RotateCcw,
  BellOff,
} from "lucide-react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";
import { SleepSchedule } from "../types";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface SleepSetupProps {
  onNavigate: (screen: Screen) => void;
  sleepSchedule?: SleepSchedule;
  setSleepSchedule?: (schedule: SleepSchedule) => void;
}

export default function SleepSetup({
  onNavigate,
  sleepSchedule,
  setSleepSchedule,
}: SleepSetupProps) {
  const [localBedtime, setLocalBedtime] = useState(
    sleepSchedule?.bedtime || "22:00",
  );
  const [localWakeup, setLocalWakeup] = useState(
    sleepSchedule?.wakeup || "06:30",
  );

  const [isDragging, setIsDragging] = useState<"bedtime" | "wakeup" | null>(
    null,
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const calculateDuration = (start: string, end: string) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

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
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleSave = () => {
    if (setSleepSchedule) {
      setSleepSchedule({ bedtime: localBedtime, wakeup: localWakeup });
    }
    onNavigate("home");
  };

  // --- Circular Slider Math ---
  const timeToAngle = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return ((h + m / 60) / 24) * 360;
  };

  const angleToTime = (angle: number) => {
    let hours = (angle / 360) * 24;
    let h = Math.floor(hours);
    let m = Math.round((hours - h) * 60);

    // Snap to 5 minute intervals
    m = Math.round(m / 5) * 5;
    if (m === 60) {
      m = 0;
      h = (h + 1) % 24;
    }
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const calculateAngleFromEvent = (clientX: number, clientY: number) => {
    if (!svgRef.current) return 0;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return angle;
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      let clientX, clientY;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const angle = calculateAngleFromEvent(clientX, clientY);
      const newTime = angleToTime(angle);

      if (isDragging === "bedtime") {
        setLocalBedtime(newTime);
      } else {
        setLocalWakeup(newTime);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handlePointerMove, {
        passive: false,
      });
      window.addEventListener("mouseup", handlePointerUp);
      window.addEventListener("touchmove", handlePointerMove, {
        passive: false,
      });
      window.addEventListener("touchend", handlePointerUp);
      return () => {
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseup", handlePointerUp);
        window.removeEventListener("touchmove", handlePointerMove);
        window.removeEventListener("touchend", handlePointerUp);
      };
    }
  }, [isDragging]);

  const cx = 150;
  const cy = 150;
  const r = 110;

  const bedAngle = timeToAngle(localBedtime);
  const wakeAngle = timeToAngle(localWakeup);

  const getPoint = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const bedPoint = getPoint(bedAngle);
  const wakePoint = getPoint(wakeAngle);

  let diff = wakeAngle - bedAngle;
  if (diff < 0) diff += 360;
  let largeArcFlag = diff > 180 ? 1 : 0;

  const arcPath = `M ${bedPoint.x} ${bedPoint.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${wakePoint.x} ${wakePoint.y}`;

  // Ticks for the clock face (24 hours)
  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * 360;
      const pt1 = {
        x:
          cx +
          (r - (i % 6 === 0 ? 10 : 5)) *
            Math.cos((angle - 90) * (Math.PI / 180)),
        y:
          cy +
          (r - (i % 6 === 0 ? 10 : 5)) *
            Math.sin((angle - 90) * (Math.PI / 180)),
      };
      const pt2 = {
        x: cx + (r + 15) * Math.cos((angle - 90) * (Math.PI / 180)),
        y: cy + (r + 15) * Math.sin((angle - 90) * (Math.PI / 180)),
      };
      ticks.push(
        <line
          key={i}
          x1={pt1.x}
          y1={pt1.y}
          x2={pt2.x}
          y2={pt2.y}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={i % 6 === 0 ? 2 : 1}
        />,
      );

      // Add labels for 0, 6, 12, 18
      if (i % 6 === 0) {
        const labelPt = {
          x: cx + (r - 28) * Math.cos((angle - 90) * (Math.PI / 180)),
          y: cy + (r - 28) * Math.sin((angle - 90) * (Math.PI / 180)),
        };
        const labelText =
          i === 0 ? "00" : i === 6 ? "06" : i === 12 ? "12" : "18";
        ticks.push(
          <text
            key={`label-${i}`}
            x={labelPt.x}
            y={labelPt.y}
            fill="#94a3b8"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {labelText}
          </text>,
        );
      }
    }
    return ticks;
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <header className="flex items-center justify-between p-6">
        <button
          onClick={() => onNavigate("profile")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft size={20} className="text-slate-100" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Sleep Setup</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Settings size={20} className="text-slate-100" />
        </button>
      </header>

      <main className="flex-1 px-6 space-y-8">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-[300px] h-[300px]">
            <svg
              ref={svgRef}
              viewBox="0 0 300 300"
              className="w-full h-full overflow-visible touch-none"
            >
              {/* Dial Background */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="rgba(30, 41, 59, 0.4)"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="30"
              />

              {/* Ticks */}
              {renderTicks()}

              {/* Selected Arc */}
              <path
                d={arcPath}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="30"
                strokeLinecap="round"
                className="drop-shadow-[0_0_15px_rgba(43,238,157,0.4)]"
              />

              {/* Gradient for Arc */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#2bee9d" />
                </linearGradient>
              </defs>

              {/* Center Info text */}
              <text
                x={cx}
                y={cy - 10}
                fill="#64748b"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                tracking="2"
              >
                TOTAL SLEEP
              </text>
              <text
                x={cx}
                y={cy + 20}
                fill="#f1f5f9"
                fontSize="28"
                fontWeight="900"
                textAnchor="middle"
              >
                {calculateDuration(localBedtime, localWakeup)}
              </text>

              {/* Bedtime Handle (Moon) */}
              <g
                transform={`translate(${bedPoint.x}, ${bedPoint.y})`}
                onMouseDown={() => setIsDragging("bedtime")}
                onTouchStart={() => setIsDragging("bedtime")}
                className="cursor-pointer"
                style={{ touchAction: "none" }}
              >
                <circle r="22" fill="#818cf8" className="drop-shadow-lg" />
                <circle r="18" fill="#1e293b" />
                <path
                  d="M -4 -6 Q 2 -2 -4 5 Q 5 7 5 -6 Q 5 -7 -4 -6 Z"
                  fill="#818cf8"
                />
              </g>

              {/* Wakeup Handle (Sun) */}
              <g
                transform={`translate(${wakePoint.x}, ${wakePoint.y})`}
                onMouseDown={() => setIsDragging("wakeup")}
                onTouchStart={() => setIsDragging("wakeup")}
                className="cursor-pointer"
                style={{ touchAction: "none" }}
              >
                <circle r="22" fill="#2bee9d" className="drop-shadow-lg" />
                <circle r="18" fill="#1e293b" />
                <circle cx="0" cy="0" r="5" fill="#2bee9d" />
                <path
                  d="M 0 -10 L 0 -7 M 0 10 L 0 7 M -10 0 L -7 0 M 10 0 L 7 0 M -7 -7 L -5 -5 M 7 7 L 5 5 M 7 -7 L 5 -5 M -7 7 L -5 5"
                  stroke="#2bee9d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* Info Cards underneath */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 border border-indigo-400/30 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center">
            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              Bedtime
            </span>
            <div className="text-2xl font-black text-slate-100 tracking-tighter">
              {formatTime(localBedtime)}
            </div>
          </div>

          <div className="bg-white/5 border border-primary/30 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">
              Wake-up
            </span>
            <div className="text-2xl font-black text-slate-100 tracking-tighter">
              {formatTime(localWakeup)}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 border-l-4 border-l-primary">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <RotateCcw size={32} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100">Flip-to-Sleep</h3>
            <p className="text-sm text-slate-400">
              Rest your phone face-down to begin tracking instantly.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <BellOff size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-100">Study Buffer</h3>
              <p className="text-xs text-slate-400">
                Blocks apps 90m before sleep
              </p>
            </div>
          </div>
          <div className="relative inline-flex items-center cursor-pointer group">
            <div className="w-12 h-6 bg-slate-700 rounded-full transition-colors"></div>
            <div className="absolute left-1 top-1 bg-primary w-4 h-4 rounded-full transition-all translate-x-6 shadow-[0_0_8px_rgba(43,238,157,0.5)]"></div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 mb-6 rounded-2xl font-black text-base bg-gradient-to-r from-secondary via-primary to-primary text-background-dark shadow-[0_0_30px_rgba(43,238,157,0.3)] transform transition-all active:scale-[0.98] uppercase tracking-widest"
        >
          Save Schedule
        </button>
      </main>

      <BottomNav currentScreen="sleepSetup" onNavigate={onNavigate} />
    </div>
  );
}
