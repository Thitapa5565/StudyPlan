import { useState } from 'react';
import { ArrowLeft, Bell, Calendar, Moon, Star, CheckCircle2 } from 'lucide-react';
import { Screen } from '../App';
import { ClassBlock, Task, SleepSchedule } from '../types';

interface NotificationsProps {
  onNavigate: (screen: Screen) => void;
  classes: ClassBlock[];
  tasks: Task[];
  sleepSchedule: SleepSchedule;
}

export default function Notifications({ onNavigate, classes, tasks, sleepSchedule }: NotificationsProps) {
  // Load read IDs from local storage
  const [readIds, setReadIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('readNotificationIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Keep track of IDs that were ALREADY read when we opened the panel
  // so we can hide them. We only compute this once on mount.
  const [hiddenIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('readNotificationIds');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const handleMarkAsRead = (id: string) => {
    setReadIds(prev => {
      const newSet = new Set(prev).add(id);
      localStorage.setItem('readNotificationIds', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const calculateHardStop = (bedtime: string) => {
    const [h, m] = bedtime.split(':').map(Number);
    let totalMins = h * 60 + m - 90;
    if (totalMins < 0) totalMins += 24 * 60;
    const stopH = Math.floor(totalMins / 60);
    const stopM = totalMins % 60;
    return formatTime(`${stopH}:${stopM}`);
  };

  const hardStopTime = calculateHardStop(sleepSchedule.bedtime);

  const notifications = [
    {
      id: 'hard-stop',
      icon: <Moon className="text-indigo-400" size={20} />,
      title: 'Upcoming Hard Stop',
      message: `Stop studying at ${hardStopTime} (90m before bedtime to ensure good sleep quality).`,
      time: 'Daily',
      unread: !readIds.has('hard-stop'),
      bg: 'bg-indigo-500/20'
    }
  ];

  // Add upcoming classes
  classes.slice(0, 3).forEach((cls) => {
    const id = `class-${cls.id}`;
    notifications.push({
      id,
      icon: <Calendar className="text-emerald-400" size={20} />,
      title: `Class: ${cls.title}`,
      message: `Starts at ${cls.startTime} in ${cls.location}. ${cls.bufferText}`,
      time: cls.day,
      unread: !readIds.has(id),
      bg: 'bg-emerald-500/20'
    });
  });

  // Add pending tasks
  tasks.filter(t => !t.completed).forEach((task) => {
    const id = `task-${task.id}`;
    notifications.push({
      id,
      icon: <Bell className="text-blue-400" size={20} />,
      title: 'Task Reminder',
      message: `${task.title} is pending. ${task.dueDate}`,
      time: task.day || 'Upcoming',
      unread: !readIds.has(id),
      bg: 'bg-blue-500/20'
    });
  });

  // Add completed tasks
  tasks.filter(t => t.completed).forEach((task) => {
    const id = `task-completed-${task.id}`;
    notifications.push({
      id,
      icon: <CheckCircle2 className="text-amber-400" size={20} />,
      title: 'Task Completed!',
      message: `You finished: ${task.title}. Great job!`,
      time: task.day || 'Recently',
      unread: !readIds.has(id),
      bg: 'bg-amber-500/20'
    });
  });

  const visibleNotifications = notifications.filter(notif => !hiddenIds.has(notif.id));

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex items-center gap-4 border-b border-slate-800/60 sticky top-0 bg-background-dark/80 backdrop-blur-md z-10">
        <button 
          onClick={() => onNavigate('home')}
          className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {visibleNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
            <Bell size={48} className="opacity-20" />
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleNotifications.map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => handleMarkAsRead(notif.id)}
              className={`p-4 rounded-2xl border ${notif.unread ? 'border-primary/30 bg-slate-800/80' : 'border-slate-800 bg-slate-800/30'} flex gap-4 transition-colors hover:bg-slate-800 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-full ${notif.bg} flex items-center justify-center shrink-0`}>
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`font-semibold truncate ${notif.unread ? 'text-slate-100' : 'text-slate-300'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-xs text-slate-500 whitespace-nowrap mt-1">{notif.time}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {notif.message}
                </p>
              </div>
              {notif.unread && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              )}
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
