import { useState, useEffect } from 'react';
import { X, Book, Calculator, FlaskConical, Palette, Globe, Calendar as CalendarIcon, Moon } from 'lucide-react';
import { Task, SleepSchedule } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask?: (task: Task) => void;
  initialTask?: Task | null;
  sleepSchedule?: SleepSchedule;
}

const CATEGORIES = [
  { id: 'Study', icon: Book, label: 'Study' },
  { id: 'Math', icon: Calculator, label: 'Math' },
  { id: 'Science', icon: FlaskConical, label: 'Science' },
  { id: 'Art', icon: Palette, label: 'Art' },
  { id: 'Lang', icon: Globe, label: 'Lang' },
];

export default function AddTaskModal({ isOpen, onClose, onSaveTask, initialTask, sleepSchedule }: AddTaskModalProps) {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState('45 mins');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('Study');

  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setTaskName(initialTask.title);
        setCategory(initialTask.category || 'Study');
        setDeadline(initialTask.deadlineDate || '');
        // Extract duration from dueDate if possible, otherwise default
        const durMatch = initialTask.dueDate.match(/\((.*?)\)/);
        setDuration(durMatch ? durMatch[1] : '45 mins');
      } else {
        setTaskName('');
        setDuration('45 mins');
        setDeadline('');
        setCategory('Study');
      }
    }
  }, [isOpen, initialTask]);

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const bedtimeStr = sleepSchedule?.bedtime || '23:00';
  const formattedBedtime = formatTime(bedtimeStr);

  if (!isOpen) return null;

  const handleSchedule = () => {
    if (taskName.trim() && onSaveTask) {
      onSaveTask({
        id: initialTask ? initialTask.id : Date.now().toString(),
        title: taskName,
        dueDate: `Due ${deadline || 'soon'} (${duration})`,
        completed: initialTask ? initialTask.completed : false,
        day: initialTask ? initialTask.day : 'Mon', // Defaulting to Mon for simplicity, could be derived from deadline
        category,
        deadlineDate: deadline
      });
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose}></div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col max-h-[90vh] bg-background-dark border-t border-slate-800 rounded-t-xl overflow-y-auto pb-safe animate-in slide-in-from-bottom duration-300">
        <div className="w-full flex justify-center py-3">
          <div className="w-12 h-1.5 bg-slate-500/40 rounded-full"></div>
        </div>

        <div className="flex items-center justify-between px-5 pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-slate-100">{initialTask ? 'Edit Study Target' : 'Add Study Target'}</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Category</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-xl border transition-colors ${isSelected ? 'bg-primary/20 border-primary text-primary' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-semibold">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-5 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Task Name</label>
            <input 
              type="text" 
              placeholder="Physics Homework" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg h-14 px-4 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-600 outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Study Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg h-14 px-4 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none"
              >
                <option>45 mins</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Deadline Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg h-14 px-4 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>
          </div>

          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 flex items-start gap-4">
            <div className="bg-secondary/20 p-2 rounded-lg text-secondary">
              <Moon size={20} />
            </div>
            <div>
              <p className="text-slate-100 font-semibold text-sm">Sleep Buffer Optimized</p>
              <p className="text-secondary text-sm font-medium leading-relaxed">
                If you start now, you'll still sleep at <span className="text-white underline decoration-primary">{formattedBedtime}</span> (No Sleep Loss)
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 flex gap-4 mt-4 mb-2">
          <button onClick={onClose} className="flex-1 h-14 rounded-xl font-bold text-slate-400 bg-transparent border border-slate-800">
            Cancel
          </button>
          <button onClick={handleSchedule} className="flex-[2] h-14 rounded-xl font-bold text-background-dark bg-primary shadow-[0_0_15px_rgba(43,238,157,0.2)]">
            {initialTask ? 'Save Changes' : 'Schedule Target'}
          </button>
        </div>
      </div>
    </>
  );
}
