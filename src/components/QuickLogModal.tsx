import React, { useState } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { PillarId, HabitMode } from '../types';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({ isOpen, onClose }) => {
  const { addReflection, addHabit, t, language } = useRhythm();
  const [tab, setTab] = useState<'reflection' | 'habit'>('reflection');

  // Reflection form
  const [reflectionText, setReflectionText] = useState('');
  const [mood, setMood] = useState('Focused');

  // Habit form
  const [habitTitle, setHabitTitle] = useState('');
  const [habitSubtitle, setHabitSubtitle] = useState('');
  const [habitPillar, setHabitPillar] = useState<PillarId>('spiritual');
  const [habitTag, setHabitTag] = useState(language === 'id' ? 'Ibadah Harian' : 'Core Devotion');
  const [habitMode, setHabitMode] = useState<HabitMode>('Full Mode');

  if (!isOpen) return null;

  const handleSubmitReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    addReflection(reflectionText, mood);
    setReflectionText('');
    onClose();
  };

  const handleSubmitHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitTitle.trim()) return;
    addHabit({
      pillarId: habitPillar,
      title: habitTitle,
      subtitle: habitSubtitle || (language === 'id' ? 'Amalan istiqomah harian' : 'Consistent daily practice'),
      categoryTag: habitTag || 'Target',
      mode: habitMode,
      streakDays: 1,
      completed: false,
    });
    setHabitTitle('');
    setHabitSubtitle('');
    onClose();
  };

  const moodOptions = language === 'id'
    ? ['Tenang', 'Fokus', 'Bersyukur', 'Bersemangat', 'Tawadhu']
    : ['Serene', 'Focused', 'Grateful', 'Energized', 'Humbled'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#e6eeff] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#064e3b] text-[22px]">
              edit_note
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e]">
              {t.quickLogTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#707974] hover:bg-[#e6eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-2 bg-[#eff4ff]/60 border-b border-[#eff4ff]">
          <button
            type="button"
            onClick={() => setTab('reflection')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'reflection'
                ? 'bg-white text-[#064e3b] shadow-xs'
                : 'text-[#707974] hover:text-[#0d1c2e]'
            }`}
          >
            {t.tabReflection}
          </button>
          <button
            type="button"
            onClick={() => setTab('habit')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'habit'
                ? 'bg-white text-[#064e3b] shadow-xs'
                : 'text-[#707974] hover:text-[#0d1c2e]'
            }`}
          >
            {t.tabNewHabit}
          </button>
        </div>

        {/* Content */}
        {tab === 'reflection' ? (
          <form onSubmit={handleSubmitReflection} className="p-5 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1.5">
                {t.tabReflection}
              </label>
              <textarea
                required
                rows={3}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder={t.thoughtPlaceholder}
                className="w-full p-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] placeholder-[#bfc9c3] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1.5">
                {t.stateOfMind}
              </label>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(m)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      mood === m
                        ? 'bg-[#064e3b] text-white font-semibold'
                        : 'bg-[#e6eeff] text-[#0d1c2e] hover:bg-[#dce9ff]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#707974] hover:bg-[#eff4ff]"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#064e3b] text-white hover:bg-[#003527] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>{t.saveReflectionBtn}</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitHabit} className="p-5 flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1">
                {t.habitTitleLabel}
              </label>
              <input
                required
                type="text"
                value={habitTitle}
                onChange={(e) => setHabitTitle(e.target.value)}
                placeholder={language === 'id' ? "contoh: Shalat Dhuha, Hafalan 1 Ayat..." : "e.g. Shalat Dhuha, Memorize 1 Ayah..."}
                className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1">
                {t.habitSubtitleLabel}
              </label>
              <input
                type="text"
                value={habitSubtitle}
                onChange={(e) => setHabitSubtitle(e.target.value)}
                placeholder={language === 'id' ? "contoh: 4 raka'at sebelum Dzuhur" : "e.g. 4 raka'at before Dzuhur"}
                className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#404944] mb-1">
                  {t.pillarLabel}
                </label>
                <select
                  value={habitPillar}
                  onChange={(e) => {
                    const p = e.target.value as PillarId;
                    setHabitPillar(p);
                    if (p === 'spiritual') setHabitTag(language === 'id' ? 'Spiritual' : 'Core Devotion');
                    if (p === 'knowledge') setHabitTag(language === 'id' ? 'Studi' : 'Study');
                    if (p === 'lifestyle') setHabitTag(language === 'id' ? 'Gaya Hidup' : 'Wellness');
                  }}
                  className="w-full h-10 px-2.5 rounded-xl border border-[#e6eeff] text-xs text-[#0d1c2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                >
                  <option value="spiritual">{t.pillarSpiritual}</option>
                  <option value="knowledge">{t.pillarKnowledge}</option>
                  <option value="lifestyle">{t.pillarLifestyle}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#404944] mb-1">
                  {t.modeLabel}
                </label>
                <select
                  value={habitMode}
                  onChange={(e) => setHabitMode(e.target.value as HabitMode)}
                  className="w-full h-10 px-2.5 rounded-xl border border-[#e6eeff] text-xs text-[#0d1c2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
                >
                  <option value="Full Mode">{t.fullMode}</option>
                  <option value="Min Viable Mode">{t.minViableMode}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#707974] hover:bg-[#eff4ff]"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#064e3b] text-white hover:bg-[#003527] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>{t.createHabitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
