export type PillarId = 'spiritual' | 'knowledge' | 'lifestyle';

export type HabitMode = 'Full Mode' | 'Min Viable Mode';

export interface Habit {
  id: string;
  pillarId: PillarId;
  title: string;
  subtitle: string;
  categoryTag: string;
  mode: HabitMode;
  streakDays: number;
  completed: boolean;
  hasProgress?: boolean;
  progressPercent?: number;
  progressCurrent?: number;
  progressMax?: number;
  progressUnit?: string;
  notes?: string;
}

export interface RhythmBlock {
  id: string;
  timeRange: string;
  startTime: string; // e.g. "04:00"
  endTime: string;   // e.g. "06:00"
  title: string;
  subtitle: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Planned';
  icon: string;
  borderColor?: string;
  pillarId?: PillarId;
}

export interface ReflectionLog {
  id: string;
  date: string;
  timestamp: string;
  quote?: string;
  text: string;
  mood?: string;
  energyScore?: number;
  habitsLoggedCount: number;
}

export interface UserProfile {
  name: string;
  greetingTitle: string;
  avatarUrl: string;
  quote: string;
  quotePrinciple: string;
  streakDays: number;
  focusScore: number;
  bonusXp: number;
  level: number;
  levelTitle: string;
  bio?: string;
  wakeUpTime?: string;
  sleepTime?: string;
  tilawahDailyTargetPages?: number;
  location?: string;
}

export type Language = 'id' | 'en';

export type ActiveTab = 'overview' | 'checklist' | 'schedule' | 'progress' | 'settings';
