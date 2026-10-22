import React, { useState, useEffect } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { Habit, HabitMode } from '../types';

interface HabitDetailModalProps {
  habit: Habit | null;
  onClose: () => void;
}

export const HabitDetailModal: React.FC<HabitDetailModalProps> = ({ habit, onClose }) => {
  const { updateHabit, toggleHabit, deleteHabit, t, language } = useRhythm();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [mode, setMode] = useState<HabitMode>('Full Mode');
  const [streakDays, setStreakDays] = useState(0);

  useEffect(() => {
    if (habit) {
      setTitle(habit.title);
      setSubtitle(habit.subtitle);
      setMode(habit.mode);
      setStreakDays(habit.streakDays);
    }
  }, [habit]);

  if (!habit) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHabit(habit.id, {
      title,
      subtitle,
      mode,
      streakDays,
    });
    onClose();
  };

  const handleDelete = () => {
    const confirmText = language === 'id'
      ? `Hapus kebiasaan "${habit.title}"?`
      : `Remove habit "${habit.title}"?`;
    if (confirm(confirmText)) {
      deleteHabit(habit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#e6eeff] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#064e3b] text-[20px]">
              tune
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e]">
              {language === 'id' ? 'Konfigurasi Kebiasaan' : 'Habit Configuration'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#707974] hover:bg-[#e6eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.habitTitleLabel}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.habitSubtitleLabel}
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1">
                {t.modeLabel}
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as HabitMode)}
                className="w-full h-10 px-2.5 rounded-xl border border-[#e6eeff] text-xs text-[#0d1c2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              >
                <option value="Full Mode">{t.fullMode}</option>
                <option value="Min Viable Mode">{t.minViableMode}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1">
                Streak ({language === 'id' ? 'Hari' : 'Days'})
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setStreakDays(Math.max(0, streakDays - 1))}
                  className="w-9 h-9 rounded-lg bg-[#eff4ff] text-[#0d1c2e] font-bold text-sm hover:bg-[#dce9ff]"
                >
                  -
                </button>
                <div className="flex-1 h-9 rounded-lg border border-[#e6eeff] flex items-center justify-center font-mono font-bold text-sm">
                  {streakDays}d
                </div>
                <button
                  type="button"
                  onClick={() => setStreakDays(streakDays + 1)}
                  className="w-9 h-9 rounded-lg bg-[#eff4ff] text-[#0d1c2e] font-bold text-sm hover:bg-[#dce9ff]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Quick status toggle button */}
          <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#404944]">
              {language === 'id' ? 'Status Hari Ini' : "Today's Status"}
            </span>
            <button
              type="button"
              onClick={() => toggleHabit(habit.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                habit.completed
                  ? 'bg-[#b0f0d6] text-[#002117]'
                  : 'bg-[#eff4ff] text-[#064e3b] hover:bg-[#dce9ff]'
              }`}
            >
              {habit.completed ? (language === 'id' ? 'Selesai ✓' : 'Completed ✓') : (language === 'id' ? 'Tandai Selesai' : 'Mark Completed')}
            </button>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#eff4ff]">
            <button
              type="button"
              onClick={handleDelete}
              className="text-xs font-semibold text-[#ba1a1a] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              <span>{t.deleteHabitBtn}</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#707974] hover:bg-[#eff4ff]"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#064e3b] text-white hover:bg-[#003527] transition-all"
              >
                {language === 'id' ? 'Simpan' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
