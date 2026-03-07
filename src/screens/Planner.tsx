import { useState } from 'react';
import { Menu, Bell, Clock, X, Sparkles, GraduationCap, MoreVertical, Plus, Check, Edit2, Trash2 } from 'lucide-react';
import { Screen } from '../App';
import BottomNav from '../components/BottomNav';
import { ClassBlock, Task, SleepSchedule } from '../types';

interface PlannerProps {
  onNavigate: (screen: Screen) => void;
  onOpenAddTask: () => void;
  onEditTask: (task: Task) => void;
  classes: ClassBlock[];
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  activeDay: string;
  setActiveDay: (day: string) => void;
  sleepSchedule?: SleepSchedule;
  onBellClick?: () => void;
}

export default function Planner({ onNavigate, onOpenAddTask, onEditTask, classes, tasks, setTasks, activeDay, setActiveDay, sleepSchedule, onBellClick }: PlannerProps) {
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const parseTimeToMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const formatMinutes = (totalMins: number) => {
    let m = totalMins % (24 * 60);
    if (m < 0) m += 24 * 60;
    const h = Math.floor(m / 60);
    const mins = m % 60;
    return `${h.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    setOpenDropdownId(null);
  };

  const handleEditTask = (task: Task) => {
    onEditTask(task);
    setOpenDropdownId(null);
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

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
  const formattedBedtime = formatTime(bedtimeStr);
  const sleepDuration = calculateDuration(bedtimeStr, wakeupStr);

  const filteredClasses = classes.filter(c => c.day === activeDay).sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime));
  const filteredTasks = tasks.filter(t => t.day === activeDay);

  const bedtimeMins = parseTimeToMinutes(bedtimeStr);
  const setupStopMins = bedtimeMins - 90;
  const activeStopTime = formatTime(formatMinutes(setupStopMins));

  return (
    <div className="flex flex-col min-h-screen pb-24 relative" onClick={() => setOpenDropdownId(null)}>
      <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-md pt-6 pb-2 px-4">
        <div className="flex items-center justify-between mb-6">
          <button className="text-slate-100"><Menu size={24} /></button>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">Planner</h1>
          <div className="flex items-center gap-4">
            <button onClick={onOpenAddTask} className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
              <Plus size={24} />
            </button>
            <div className="relative">
              <button onClick={onBellClick} className="text-slate-100"><Bell size={24} /></button>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => {
            const date = 12 + i;
            const isActive = day === activeDay;
            return (
              <button 
                key={day} 
                onClick={() => setActiveDay(day)}
                className={`flex flex-col items-center justify-center min-w-[56px] h-20 rounded-2xl transition-all ${isActive ? 'bg-primary text-background-dark shadow-lg shadow-primary/20' : 'bg-slate-800/50 border border-white/5'}`}
              >
                <p className={`text-xs uppercase font-semibold ${isActive ? 'opacity-80' : 'text-slate-400'}`}>{day}</p>
                <p className="text-lg font-bold">{date}</p>
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Daily Timeline
          </h2>
          
          <div className="relative ml-4 border-l-2 border-slate-800">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="relative pl-8 pb-10">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background-dark"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-primary">{cls.startTime}</span>
                  <h3 className="text-base font-bold text-slate-100">{cls.title}</h3>
                  <p className="text-sm text-slate-400">{cls.location}</p>
                </div>
              </div>
            ))}
            
            {filteredClasses.length === 0 && (
              <div className="relative pl-8 pb-10">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-background-dark"></div>
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-slate-400">No classes scheduled</h3>
                </div>
              </div>
            )}

            <div className="relative pl-8 pb-0 mt-4">
              <div className="absolute -left-[10px] top-1 z-10 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                <X size={12} className="text-white font-bold" />
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg w-fit">
                    <span className="text-xs font-bold text-red-400">{activeStopTime} • HARD STOP</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-100 mt-2">Stop Studying</p>
                <p className="text-xs text-red-400/80">90m before bedtime</p>
              </div>
            </div>

            <div className="relative ml-[-2px] pl-8 py-6 rounded-r-xl bg-gradient-to-b from-secondary/10 to-transparent border-l-2 border-secondary shadow-[inset_10px_0_20px_-10px_rgba(167,139,250,0.2)]">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Sparkles size={14} />
                  <span className="text-xs font-bold tracking-widest uppercase">Automatic Sleep Buffer</span>
                </div>
                <p className="text-sm text-slate-300">Optimizing cognitive cooldown until bedtime...</p>
              </div>
            </div>

            <div 
              className="relative pl-8 pt-6 cursor-pointer group"
              onClick={() => onNavigate('sleepSetup')}
            >
              <div className="absolute -left-[9px] top-7 w-4 h-4 rounded-full bg-primary border-4 border-background-dark group-hover:scale-125 transition-transform"></div>
              <div className="flex flex-col bg-white/5 p-4 rounded-xl border border-white/10 group-hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-semibold text-primary">{formattedBedtime}</span>
                    <h3 className="text-base font-bold text-slate-100">Bedtime</h3>
                    <p className="text-sm text-slate-400">Sleep target: {sleepDuration}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Edit2 size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <button onClick={() => onNavigate('academicSchedule')} className="w-full p-4 rounded-xl flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-md active:scale-[0.98] transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <GraduationCap size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-slate-100">Academic Base Schedule</h3>
                <p className="text-xs text-slate-400">Manage your core study hours</p>
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-primary transition-colors">&gt;</span>
          </button>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Tasks for {activeDay}</h2>
            <button onClick={() => setIsViewAllOpen(true)} className="text-sm text-primary font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500 bg-white/5 border border-white/10 rounded-xl">
                No tasks for this day.
              </div>
            ) : (
              filteredTasks.map(task => (
                <div key={task.id} className={`p-4 rounded-xl flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md transition-all ${task.completed ? 'opacity-50' : ''}`}>
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-primary border-primary text-background-dark' : 'border-primary/30 text-transparent'}`}
                  >
                    <Check size={14} className={task.completed ? 'opacity-100' : 'opacity-0'} />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</h4>
                      {task.category && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {task.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{task.dueDate}</p>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === task.id ? null : task.id);
                      }}
                      className="p-1 text-slate-500 hover:text-slate-300"
                    >
                      <MoreVertical size={20} />
                    </button>
                    {openDropdownId === task.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-30 overflow-hidden">
                        <button 
                          onClick={() => handleEditTask(task)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* View All Tasks Modal */}
      {isViewAllOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background-dark/80 backdrop-blur-sm" onClick={() => setIsViewAllOpen(false)}>
          <div 
            className="w-full max-w-md bg-[#0A192F] border-t border-white/10 rounded-t-3xl p-6 h-[80vh] flex flex-col animate-in slide-in-from-bottom-full duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-100">All Tasks</h2>
              <button onClick={() => setIsViewAllOpen(false)} className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-slate-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pb-6" onClick={() => setOpenDropdownId(null)}>
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No tasks available.</div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className={`p-4 rounded-xl flex items-center gap-4 bg-white/5 border border-white/10 transition-all ${task.completed ? 'opacity-50' : ''}`}>
                    <button 
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-primary border-primary text-background-dark' : 'border-primary/30 text-transparent'}`}
                    >
                      <Check size={14} className={task.completed ? 'opacity-100' : 'opacity-0'} />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</h4>
                        {task.category && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {task.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{task.dueDate} • {task.day}</p>
                    </div>
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === task.id ? null : task.id);
                        }}
                        className="p-1 text-slate-500 hover:text-slate-300"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openDropdownId === task.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-30 overflow-hidden">
                          <button 
                            onClick={() => handleEditTask(task)}
                            className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav currentScreen="planner" onNavigate={onNavigate} />
    </div>
  );
}
