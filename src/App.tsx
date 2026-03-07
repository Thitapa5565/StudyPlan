import { useState } from "react";
import { Bell } from "lucide-react";
import Home from "./screens/Home";
import Planner from "./screens/Planner";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import SleepSetup from "./screens/SleepSetup";
import Insights from "./screens/Insights";
import DeepSleep from "./screens/DeepSleep";
import Premium from "./screens/Premium";
import AcademicSchedule from "./screens/AcademicSchedule";
import Notifications from "./screens/Notifications";
import AddTaskModal from "./components/AddTaskModal";
import { ClassBlock, Task, SleepSchedule } from "./types";

export type Screen =
  | "login"
  | "signup"
  | "home"
  | "planner"
  | "profile"
  | "sleepSetup"
  | "insights"
  | "deepSleep"
  | "premium"
  | "academicSchedule"
  | "notifications";

const initialClasses: ClassBlock[] = [
  {
    id: "1",
    title: "Advanced Data Structures",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    location: "Hall B-12",
    bufferText: "15m travel time buffer included",
    day: "Mon",
  },
  {
    id: "2",
    title: "Human-Computer Interaction",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    location: "Online / Zoom",
    bufferText: "5m setup time buffer",
    day: "Mon",
  },
  {
    id: "3",
    title: "Machine Learning Seminar",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    location: "Innovation Lab",
    bufferText: "30m transit to Library",
    day: "Mon",
  },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Physics Homework",
    dueDate: "Due tomorrow at 9:00 AM",
    completed: false,
    day: "Mon",
    category: "Study",
    deadlineDate: "2026-03-08",
  },
  {
    id: "2",
    title: "Math Assignment",
    dueDate: "Review chapter 4 & 5",
    completed: true,
    day: "Mon",
    category: "Math",
    deadlineDate: "2026-03-09",
  },
  {
    id: "3",
    title: "Chemistry Lab Report",
    dueDate: "Due Wed at 11:59 PM",
    completed: false,
    day: "Tue",
    category: "Science",
    deadlineDate: "2026-03-11",
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [activePlannerDay, setActivePlannerDay] = useState("Mon");

  // App State
  const [classes, setClasses] = useState<ClassBlock[]>(initialClasses);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sleepSchedule, setSleepSchedule] = useState<SleepSchedule>({
    bedtime: "22:00",
    wakeup: "06:30",
  });

  const navigate = (screen: Screen) => setCurrentScreen(screen);

  const handleOpenAddTask = () => {
    setTaskToEdit(null);
    setIsAddTaskOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsAddTaskOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (taskToEdit) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([
        ...tasks,
        { ...task, completed: false, day: activePlannerDay },
      ]);
    }
  };

  const handleBellClick = () => {
    navigate("notifications");
  };

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const calculateHardStop = (bedtime: string) => {
    const [h, m] = bedtime.split(":").map(Number);
    let totalMins = h * 60 + m - 90;
    if (totalMins < 0) totalMins += 24 * 60;
    const stopH = Math.floor(totalMins / 60);
    const stopM = totalMins % 60;
    return formatTime(`${stopH}:${stopM}`);
  };

  const hardStopTime = calculateHardStop(sleepSchedule.bedtime);

  // App-wide score state
  const [readinessScore, setReadinessScore] = useState(10);

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display selection:bg-primary/30">
      {currentScreen === "login" && <Login onNavigate={navigate} />}
      {currentScreen === "signup" && <SignUp onNavigate={navigate} />}
      {currentScreen === "home" && (
        <Home
          onNavigate={navigate}
          sleepSchedule={sleepSchedule}
          onBellClick={handleBellClick}
          readinessScore={readinessScore}
        />
      )}
      {currentScreen === "planner" && (
        <Planner
          onNavigate={navigate}
          onOpenAddTask={handleOpenAddTask}
          onEditTask={handleEditTask}
          classes={classes}
          tasks={tasks}
          setTasks={setTasks}
          activeDay={activePlannerDay}
          setActiveDay={setActivePlannerDay}
          sleepSchedule={sleepSchedule}
          onBellClick={handleBellClick}
        />
      )}
      {currentScreen === "profile" && (
        <Profile onNavigate={navigate} onBellClick={handleBellClick} />
      )}
      {currentScreen === "sleepSetup" && (
        <SleepSetup
          onNavigate={navigate}
          sleepSchedule={sleepSchedule}
          setSleepSchedule={setSleepSchedule}
        />
      )}
      {currentScreen === "insights" && (
        <Insights
          onNavigate={navigate}
          sleepSchedule={sleepSchedule}
          readinessScore={readinessScore}
        />
      )}
      {currentScreen === "deepSleep" && (
        <DeepSleep onNavigate={navigate} sleepSchedule={sleepSchedule} />
      )}
      {currentScreen === "premium" && <Premium onNavigate={navigate} />}
      {currentScreen === "academicSchedule" && (
        <AcademicSchedule
          onNavigate={navigate}
          classes={classes}
          setClasses={setClasses}
          sleepSchedule={sleepSchedule}
          setSleepSchedule={setSleepSchedule}
        />
      )}
      {currentScreen === "notifications" && (
        <Notifications
          onNavigate={navigate}
          classes={classes}
          tasks={tasks}
          sleepSchedule={sleepSchedule}
        />
      )}

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onSaveTask={handleSaveTask}
        initialTask={taskToEdit}
        sleepSchedule={sleepSchedule}
      />
    </div>
  );
}
