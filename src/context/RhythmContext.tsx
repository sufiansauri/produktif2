import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, RhythmBlock, UserProfile, PillarId, ActiveTab, ReflectionLog, Language } from '../types';
import { INITIAL_HABITS, INITIAL_RHYTHM_BLOCKS, INITIAL_USER, INSPIRING_QUOTES } from '../data/initialData';
import { translations } from '../i18n/translations';

interface PillarStat {
  total: number;
  completed: number;
  percent: number;
}

interface RhythmContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.id;
  habits: Habit[];
  toggleHabit: (id: string) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  deleteHabit: (id: string) => void;
  updateTilawahPages: (newPage: number) => void;
  rhythmBlocks: RhythmBlock[];
  updateRhythmBlock: (id: string, updates: Partial<RhythmBlock>) => void;
  addRhythmBlock: (block: Omit<RhythmBlock, 'id'>) => void;
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  setProfilePhoto: (photoUrl: string) => void;
  cycleQuote: () => void;
  activeFilter: 'all' | PillarId;
  setActiveFilter: (filter: 'all' | PillarId) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  reflections: ReflectionLog[];
  addReflection: (text: string, mood?: string) => void;
  totalHabits: number;
  completedHabits: number;
  completionPercent: number;
  remainingHabits: number;
  pillarStats: Record<PillarId, PillarStat>;
  resetToDefault: () => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const RhythmContext = createContext<RhythmContextType | undefined>(undefined);

export const RhythmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage state initialization
  const [habits, setHabits] = useState<Habit[]>(() => {
    try {
      const saved = localStorage.getItem('mindful_cadence_habits');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_HABITS;
  });

  const [rhythmBlocks, setRhythmBlocks] = useState<RhythmBlock[]>(() => {
    try {
      const saved = localStorage.getItem('mindful_cadence_blocks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RHYTHM_BLOCKS;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mindful_cadence_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USER;
  });

  const [reflections, setReflections] = useState<ReflectionLog[]>(() => {
    try {
      const saved = localStorage.getItem('mindful_cadence_reflections');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'ref-1',
        date: '2024-10-24',
        timestamp: '06:15 AM',
        text: 'Alhamdulillah Fajr routine was deep and tranquil today. Finished 16 pages of Tilawah with clear presence.',
        mood: 'Serene',
        energyScore: 9,
        habitsLoggedCount: 4,
      },
    ];
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('mindful_cadence_lang');
      if (saved === 'en' || saved === 'id') return saved;
    } catch (e) {
      console.error(e);
    }
    return 'id'; // Default to Bahasa Indonesia
  });

  const t = translations[language];

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('mindful_cadence_lang', lang);
    } catch (e) {
      console.error(e);
    }
    showToast(lang === 'id' ? 'Bahasa beralih ke Bahasa Indonesia' : 'Language switched to English');
  };

  const setProfilePhoto = (photoUrl: string) => {
    setUser((prev) => ({ ...prev, avatarUrl: photoUrl }));
    showToast(language === 'id' ? 'Foto profil berhasil diperbarui!' : 'Profile photo updated successfully!');
  };

  const [activeFilter, setActiveFilter] = useState<'all' | PillarId>('all');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('Senin, 24 Oktober 2024');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('mindful_cadence_habits', JSON.stringify(habits));
    } catch (e) {
      console.error(e);
    }
  }, [habits]);

  useEffect(() => {
    try {
      localStorage.setItem('mindful_cadence_blocks', JSON.stringify(rhythmBlocks));
    } catch (e) {
      console.error(e);
    }
  }, [rhythmBlocks]);

  useEffect(() => {
    try {
      localStorage.setItem('mindful_cadence_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('mindful_cadence_reflections', JSON.stringify(reflections));
    } catch (e) {
      console.error(e);
    }
  }, [reflections]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const nextCompleted = !h.completed;
          const nextStreak = nextCompleted ? h.streakDays + 1 : Math.max(0, h.streakDays - 1);
          return {
            ...h,
            completed: nextCompleted,
            streakDays: nextStreak,
          };
        }
        return h;
      })
    );

    const habit = habits.find((h) => h.id === id);
    if (habit) {
      if (!habit.completed) {
        showToast(`Completed: ${habit.title} (+10 XP)`);
        // Award XP
        setUser((u) => ({ ...u, bonusXp: u.bonusXp + 10 }));
      } else {
        showToast(`Marked as pending: ${habit.title}`);
        setUser((u) => ({ ...u, bonusXp: Math.max(0, u.bonusXp - 10) }));
      }
    }
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
    showToast('Habit updated');
  };

  const addHabit = (newHabitData: Omit<Habit, 'id'>) => {
    const newHabit: Habit = {
      ...newHabitData,
      id: `habit-${Date.now()}`,
    };
    setHabits((prev) => [...prev, newHabit]);
    showToast(`Added: ${newHabit.title}`);
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    showToast('Habit deleted');
  };

  const updateTilawahPages = (newPage: number) => {
    const clamped = Math.max(0, Math.min(20, newPage));
    const percent = Math.round((clamped / 20) * 100);
    const isDone = clamped >= 20;

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === 'habit-5') {
          return {
            ...h,
            progressCurrent: clamped,
            progressPercent: percent,
            subtitle: `Currently at Juz 14 • ${clamped} of 20 Pages`,
            completed: isDone,
          };
        }
        return h;
      })
    );
    showToast(`Tilawah updated: ${clamped}/20 Pages (${percent}%)`);
  };

  const updateRhythmBlock = (id: string, updates: Partial<RhythmBlock>) => {
    setRhythmBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    showToast('Schedule block updated');
  };

  const addRhythmBlock = (newBlockData: Omit<RhythmBlock, 'id'>) => {
    const newBlock: RhythmBlock = {
      ...newBlockData,
      id: `block-${Date.now()}`,
    };
    setRhythmBlocks((prev) => [...prev, newBlock]);
    showToast(`Rhythm block added: ${newBlock.title}`);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated');
  };

  const cycleQuote = () => {
    const nextIdx = (quoteIndex + 1) % INSPIRING_QUOTES.length;
    setQuoteIndex(nextIdx);
    const chosen = INSPIRING_QUOTES[nextIdx];
    setUser((prev) => ({
      ...prev,
      quote: chosen.quote,
      quotePrinciple: chosen.principle,
    }));
    showToast('Cadence reflection refreshed');
  };

  const addReflection = (text: string, mood = 'Productive') => {
    const newRef: ReflectionLog = {
      id: `ref-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      mood,
      energyScore: 9,
      habitsLoggedCount: habits.filter((h) => h.completed).length,
    };
    setReflections((prev) => [newRef, ...prev]);
    showToast('Reflection note saved');
  };

  const resetToDefault = () => {
    setHabits(INITIAL_HABITS);
    setRhythmBlocks(INITIAL_RHYTHM_BLOCKS);
    setUser(INITIAL_USER);
    showToast('Reset to default schedule & habits');
  };

  // Calculations
  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.completed).length;
  const completionPercent = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  const remainingHabits = Math.max(0, totalHabits - completedHabits);

  const getPillarStat = (pillarId: PillarId): PillarStat => {
    const pillarHabits = habits.filter((h) => h.pillarId === pillarId);
    const total = pillarHabits.length;
    const completed = pillarHabits.filter((h) => h.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  };

  const pillarStats: Record<PillarId, PillarStat> = {
    spiritual: getPillarStat('spiritual'),
    knowledge: getPillarStat('knowledge'),
    lifestyle: getPillarStat('lifestyle'),
  };

  return (
    <RhythmContext.Provider
      value={{
        language,
        setLanguage,
        t,
        habits,
        toggleHabit,
        updateHabit,
        addHabit,
        deleteHabit,
        updateTilawahPages,
        rhythmBlocks,
        updateRhythmBlock,
        addRhythmBlock,
        user,
        updateUser,
        setProfilePhoto,
        cycleQuote,
        activeFilter,
        setActiveFilter,
        activeTab,
        setActiveTab,
        toastMessage,
        showToast,
        reflections,
        addReflection,
        totalHabits,
        completedHabits,
        completionPercent,
        remainingHabits,
        pillarStats,
        resetToDefault,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </RhythmContext.Provider>
  );
};

export const useRhythm = () => {
  const context = useContext(RhythmContext);
  if (!context) {
    throw new Error('useRhythm must be used within a RhythmProvider');
  }
  return context;
};
