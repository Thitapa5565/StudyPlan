export interface ClassBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  bufferText: string;
  day: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  day: string;
  category?: string;
  deadlineDate?: string;
}

export interface SleepSchedule {
  bedtime: string;
  wakeup: string;
}

export interface AppState {
  classes: ClassBlock[];
  tasks: Task[];
  sleepSchedule?: SleepSchedule;
}
