import React, { useState } from "react";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Clock,
  Bus,
  Activity,
  Plus,
  Trash2,
} from "lucide-react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";
import { ClassBlock, SleepSchedule } from "../types";

interface AcademicScheduleProps {
  onNavigate: (screen: Screen) => void;
  classes: ClassBlock[];
  setClasses: (classes: ClassBlock[]) => void;
  sleepSchedule?: SleepSchedule;
  setSleepSchedule?: (schedule: SleepSchedule) => void;
}

export default function AcademicSchedule({
  onNavigate,
  classes,
  setClasses,
  sleepSchedule,
  setSleepSchedule,
}: AcademicScheduleProps) {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [activeDay, setActiveDay] = useState("Mon");
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [useRecommended, setUseRecommended] = useState(false);
  const [newClass, setNewClass] = useState<Partial<ClassBlock>>({
    title: "",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    location: "",
    bufferText: "15m travel time buffer included",
    day: "Mon",
  });

  const handleAddClass = () => {
    if (newClass.title && newClass.location) {
      setClasses([
        ...classes,
        {
          ...newClass,
          id: Date.now().toString(),
          day: activeDay,
        } as ClassBlock,
      ]);
      setIsAddingClass(false);
      setNewClass({
        title: "",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        location: "",
        bufferText: "15m travel time buffer included",
        day: activeDay,
      });
    }
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const parseTimeToMinutes = (timeStr: string) => {
    if (!timeStr) return 0;
    const is12Hour =
      timeStr.toLowerCase().includes("am") ||
      timeStr.toLowerCase().includes("pm");
    if (is12Hour) {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM|am|pm)/);
      if (!match) return 0;
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (h === 12) h = ampm === "AM" ? 0 : 12;
      else if (ampm === "PM") h += 12;
      return h * 60 + m;
    } else {
      const [h, m] = timeStr.split(":").map(Number);
      return (h || 0) * 60 + (m || 0);
    }
  };

  const formatMinutes = (totalMins: number) => {
    let m = totalMins;
    while (m < 0) m += 24 * 60;
    m = m % (24 * 60);
    const h = Math.floor(m / 60);
    const mins = m % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${ampm}`;
  };

  const filteredClasses = classes
    .filter((c) => c.day === activeDay)
    .sort(
      (a, b) =>
        parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime),
    );

  const originalBedtimeStr = sleepSchedule?.bedtime || "22:30";
  const originalBedtimeMinutes = parseTimeToMinutes(originalBedtimeStr);

  const latestClassEndMinutes =
    filteredClasses.length > 0
      ? Math.max(...filteredClasses.map((c) => parseTimeToMinutes(c.endTime)))
      : null;

  let needsAdjustment = false;
  let recommendedBedtimeMinutes = originalBedtimeMinutes;

  const shiftTime = (mins: number) => (mins - 4 * 60 + 24 * 60) % (24 * 60);

  if (latestClassEndMinutes !== null) {
    const shiftedBedtime = shiftTime(originalBedtimeMinutes);
    const shiftedClassEnd = shiftTime(latestClassEndMinutes);
    let diff = shiftedBedtime - shiftedClassEnd;

    if (diff < 90) {
      needsAdjustment = true;
      recommendedBedtimeMinutes = (latestClassEndMinutes + 90) % (24 * 60);
    }
  }

  const activeBedtimeMinutes =
    needsAdjustment && useRecommended
      ? recommendedBedtimeMinutes
      : originalBedtimeMinutes;
  const formattedBedtime = formatMinutes(activeBedtimeMinutes);

  let sleepBufferMinutes = 90;
  let sleepQuality = "Optimal";
  let sleepQualityColor = "text-primary";
  let bufferText: React.ReactNode = (
    <>
      Your current base schedule allows for a{" "}
      <span className="text-primary font-bold">90-minute sleep buffer</span>.
      This is ideal for cognitive recovery after high-intensity classes.
    </>
  );

  if (latestClassEndMinutes !== null) {
    const shiftedActiveBedtime = shiftTime(activeBedtimeMinutes);
    const shiftedClassEnd = shiftTime(latestClassEndMinutes);
    let diff = shiftedActiveBedtime - shiftedClassEnd;

    sleepBufferMinutes = diff;

    if (diff >= 120) {
      sleepQuality = "Excellent";
      sleepQualityColor = "text-primary";
      bufferText = (
        <>
          Your schedule allows for a{" "}
          <span className="text-primary font-bold">
            {diff}-minute sleep buffer
          </span>
          . You have plenty of time to wind down before bed.
        </>
      );
    } else if (diff >= 90) {
      sleepQuality = "Optimal";
      sleepQualityColor = "text-primary";
      bufferText = (
        <>
          Your schedule allows for a{" "}
          <span className="text-primary font-bold">
            {diff}-minute sleep buffer
          </span>
          . This is ideal for cognitive recovery after classes.
        </>
      );
    } else if (diff >= 60) {
      sleepQuality = "Fair";
      sleepQualityColor = "text-yellow-400";
      bufferText = (
        <>
          Your schedule allows for a{" "}
          <span className="text-yellow-400 font-bold">
            {diff}-minute sleep buffer
          </span>
          . Try to avoid heavy studying right before bed.
        </>
      );
    } else if (diff >= 0) {
      sleepQuality = "Poor";
      sleepQualityColor = "text-red-400";
      bufferText = (
        <>
          Your schedule only allows for a{" "}
          <span className="text-red-400 font-bold">
            {diff}-minute sleep buffer
          </span>
          . This might impact your sleep quality. Consider adjusting your
          schedule.
        </>
      );
    } else {
      sleepQuality = "Critical";
      sleepQualityColor = "text-red-500";
      bufferText = (
        <>
          Your class ends{" "}
          <span className="text-red-500 font-bold">
            {Math.abs(diff)} minutes AFTER
          </span>{" "}
          your target bedtime! This will severely impact your sleep schedule.
        </>
      );
    }
  } else {
    sleepQuality = "Excellent";
    sleepQualityColor = "text-primary";
    bufferText = (
      <>
        You have no classes scheduled for today. Enjoy a relaxing evening and a
        full night's sleep!
      </>
    );
  }

  let hardStopMinutes = activeBedtimeMinutes - 90;
  if (latestClassEndMinutes !== null && sleepBufferMinutes < 90) {
    hardStopMinutes = latestClassEndMinutes;
  }

  const hardStopTime = formatMinutes(hardStopMinutes);
  const windDownStart = formatMinutes(hardStopMinutes - 60);

  let hardStopColor = "text-primary";
  let hardStopBg = "bg-primary";
  let hardStopBgLight = "bg-primary/20";

  if (sleepQuality === "Fair") {
    hardStopColor = "text-yellow-400";
    hardStopBg = "bg-yellow-400";
    hardStopBgLight = "bg-yellow-400/20";
  } else if (sleepQuality === "Poor") {
    hardStopColor = "text-red-400";
    hardStopBg = "bg-red-400";
    hardStopBgLight = "bg-red-400/20";
  }

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-background-dark">
      <header className="sticky top-0 z-20 bg-[#0A192F]/80 backdrop-blur-md border-b border-secondary/10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("planner")}
              className="text-secondary"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">
              Academic Base Schedule
            </h1>
          </div>
          <div className="bg-secondary/20 p-2 rounded-full">
            <GraduationCap size={20} className="text-secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between bg-secondary/5 rounded-xl border border-secondary/10 p-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-slate-100">
              Auto-sync to Daily Planner
            </p>
            <p className="text-xs text-slate-400">
              Keep your daily timeline updated
            </p>
          </div>
          <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full bg-slate-700 p-1 has-[:checked]:bg-primary">
            <div
              className={`h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${syncEnabled ? "translate-x-[20px]" : ""}`}
            ></div>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={syncEnabled}
              onChange={() => setSyncEnabled(!syncEnabled)}
            />
          </label>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => {
            const isActive = day === activeDay;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${isActive ? "bg-primary text-[#0A192F] font-bold" : "bg-secondary/10 border border-secondary/20 text-secondary"}`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-100">
            {activeDay} Classes
          </h2>
          <button
            onClick={() => setIsAddingClass(true)}
            className="text-sm text-primary font-medium flex items-center gap-1"
          >
            <Plus size={16} /> Add Class
          </button>
        </div>

        {isAddingClass && (
          <div className="bg-secondary/10 backdrop-blur-md border border-primary rounded-xl p-4 shadow-[0_0_15px_rgba(43,238,157,0.1)] mb-6 space-y-4">
            <input
              type="text"
              placeholder="Class Title"
              className="w-full bg-background-dark/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-primary"
              value={newClass.title}
              onChange={(e) =>
                setNewClass({ ...newClass, title: e.target.value })
              }
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Start Time (e.g. 09:00 AM)"
                className="w-1/2 bg-background-dark/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-primary"
                value={newClass.startTime}
                onChange={(e) =>
                  setNewClass({ ...newClass, startTime: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="End Time"
                className="w-1/2 bg-background-dark/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-primary"
                value={newClass.endTime}
                onChange={(e) =>
                  setNewClass({ ...newClass, endTime: e.target.value })
                }
              />
            </div>
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-background-dark/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-primary"
              value={newClass.location}
              onChange={(e) =>
                setNewClass({ ...newClass, location: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddingClass(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                className="px-4 py-2 bg-primary text-background-dark rounded-xl text-sm font-bold"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {filteredClasses.length === 0 && !isAddingClass ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No classes scheduled for {activeDay}.
            </div>
          ) : (
            filteredClasses.map((cls, index) => (
              <div
                key={cls.id}
                className="relative pl-8 border-l-2 border-dashed border-secondary/20 group"
              >
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${index === 0 ? "bg-primary shadow-[0_0_15px_rgba(43,238,157,0.3)]" : "bg-slate-700"}`}
                ></div>
                <div
                  className={`bg-secondary/10 backdrop-blur-md border ${index === 0 ? "border-primary shadow-[0_0_15px_rgba(43,238,157,0.1)]" : "border-secondary/20 opacity-80"} rounded-xl p-4`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span
                        className={`text-[10px] uppercase tracking-wider ${index === 0 ? "text-primary" : "text-secondary"} font-bold`}
                      >
                        {cls.startTime} - {cls.endTime}
                      </span>
                      <h3 className="text-base font-bold text-slate-100">
                        {cls.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteClass(cls.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                    <MapPin size={12} /> {cls.location}
                  </p>
                  <div className="flex items-center gap-2 py-2 px-3 bg-secondary/10 rounded-lg border border-secondary/10 w-fit">
                    <Clock size={14} className="text-secondary" />
                    <p className="text-[11px] text-secondary font-medium">
                      {cls.bufferText}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <section className="mt-10 mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-100">
            <Activity size={20} className="text-primary" />
            Impact on Sleep Goal
          </h2>
          <div className="bg-gradient-to-br from-secondary/10 to-transparent rounded-xl border border-secondary/10 p-5">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-widest">
                  Target Bedtime
                </p>
                <p className="text-2xl font-bold text-white">
                  {formattedBedtime}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-xs text-slate-400 uppercase tracking-widest">
                  Sleep Quality
                </p>
                <p className={`text-lg font-bold ${sleepQualityColor}`}>
                  {sleepQuality}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 text-[10px] font-bold text-slate-500">
                  {windDownStart}
                </div>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-secondary/30"></div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-16 text-[10px] font-bold ${hardStopColor}`}>
                  {hardStopTime}
                </div>
                <div
                  className={`flex-1 h-3 ${hardStopBgLight} rounded-full relative`}
                >
                  <div className="absolute inset-y-0 left-0 w-full flex items-center justify-center">
                    <span
                      className={`text-[9px] font-bold uppercase ${hardStopColor}`}
                    >
                      Hard Stop: Review & Wind Down
                    </span>
                  </div>
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 ${hardStopBg} rounded-full border-2 border-[#0A192F]`}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 text-[10px] font-bold text-slate-500">
                  {formattedBedtime}
                </div>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full"></div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="w-4 h-4 rounded-full bg-primary text-[#0A192F] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                i
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                {bufferText}
              </p>
            </div>

            {needsAdjustment && (
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-xs text-slate-400 font-medium">
                  Choose your bedtime strategy:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUseRecommended(true)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${useRecommended ? "bg-primary text-[#0A192F]" : "bg-secondary/10 text-secondary border border-secondary/20"}`}
                  >
                    Recommended ({formatMinutes(recommendedBedtimeMinutes)})
                  </button>
                  <button
                    onClick={() => setUseRecommended(false)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors ${!useRecommended ? "bg-primary text-[#0A192F]" : "bg-secondary/10 text-secondary border border-secondary/20"}`}
                  >
                    Original Setup ({formatMinutes(originalBedtimeMinutes)})
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <button
          onClick={() => {
            if (
              setSleepSchedule &&
              sleepSchedule &&
              needsAdjustment &&
              useRecommended
            ) {
              const h = Math.floor(activeBedtimeMinutes / 60);
              const m = activeBedtimeMinutes % 60;
              const newBedtimeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
              setSleepSchedule({ ...sleepSchedule, bedtime: newBedtimeStr });
            }
            onNavigate("planner");
          }}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-[#0A192F] font-bold rounded-xl shadow-[0_0_15px_rgba(43,238,157,0.2)] flex items-center justify-center gap-2 transition-transform active:scale-95"
        >
          Apply & Map to Timeline
        </button>
      </main>

      <BottomNav currentScreen="planner" onNavigate={onNavigate} />
    </div>
  );
}
