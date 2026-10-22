import React, { useState } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { Habit, PillarId, HabitMode } from '../types';

interface ChecklistViewProps {
  onSelectHabit: (habit: Habit) => void;
  onAddNewHabit: () => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  onSelectHabit,
  onAddNewHabit,
}) => {
  const {
    habits,
    toggleHabit,
    totalHabits,
    completedHabits,
    completionPercent,
    remainingHabits,
    showToast,
    t,
    language,
  } = useRhythm();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<'all' | PillarId>('all');
  const [selectedMode, setSelectedMode] = useState<'all' | HabitMode>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredHabits = habits.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPillar = selectedPillar === 'all' || h.pillarId === selectedPillar;
    const matchesMode = selectedMode === 'all' || h.mode === selectedMode;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && h.completed) ||
      (statusFilter === 'pending' && !h.completed);

    return matchesSearch && matchesPillar && matchesMode && matchesStatus;
  });

  const markAllComplete = () => {
    habits.forEach((h) => {
      if (!h.completed) toggleHabit(h.id);
    });
    showToast(language === 'id' ? 'Semua kebiasaan berhasil dicentang! +XP bertambah' : 'All habits marked completed! +XP awarded');
  };

  const resetAllHabits = () => {
    habits.forEach((h) => {
      if (h.completed) toggleHabit(h.id);
    });
    showToast(language === 'id' ? 'Semua kebiasaan diatur ulang ke pending' : 'All habits reset to pending');
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-12 gap-4">
      {/* Header Summary */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-['Inter'] text-xs text-[#404944] uppercase tracking-wider font-semibold">
            {t.checklistSubtitle}
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0d1c2e] font-bold tracking-tight">
            {t.checklistTitle}
          </h1>
        </div>
        <button
          onClick={onAddNewHabit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#064e3b] text-white text-xs font-semibold shadow-xs hover:bg-[#003527] transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>{t.addHabitBtn}</span>
        </button>
      </div>

      {/* Progress mini banner */}
      <div className="bg-white rounded-xl p-3.5 border border-[#eff4ff] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#b0f0d6] flex items-center justify-center text-[#064e3b] font-['Plus_Jakarta_Sans'] font-bold text-sm">
            {completionPercent}%
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
              {completedHabits} {language === 'id' ? 'dari' : 'of'} {totalHabits} {t.doneLabel}
            </div>
            <div className="text-xs text-[#707974]">{remainingHabits} {t.habitsLeft}</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={markAllComplete}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#eff4ff] text-[#064e3b] hover:bg-[#dce9ff]"
          >
            {t.checkAllBtn}
          </button>
          <button
            onClick={resetAllHabits}
            className="px-2.5 py-1 text-xs font-medium rounded-lg text-[#707974] hover:bg-[#eff4ff]"
          >
            {t.resetBtn}
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#707974]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full h-11 pl-9 pr-4 rounded-xl bg-white border border-[#e6eeff] text-sm text-[#0d1c2e] placeholder-[#707974] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#707974] hover:text-[#0d1c2e]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs & Badges */}
      <div className="flex flex-col gap-2">
        {/* Pillar filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedPillar('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
              selectedPillar === 'all'
                ? 'bg-[#064e3b] text-white font-semibold'
                : 'bg-[#e6eeff] text-[#0d1c2e]'
            }`}
          >
            {t.filterAllPillars}
          </button>
          <button
            onClick={() => setSelectedPillar('spiritual')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
              selectedPillar === 'spiritual'
                ? 'bg-[#064e3b] text-white font-semibold'
                : 'bg-[#e6eeff] text-[#0d1c2e]'
            }`}
          >
            Spiritual
          </button>
          <button
            onClick={() => setSelectedPillar('knowledge')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
              selectedPillar === 'knowledge'
                ? 'bg-[#064e3b] text-white font-semibold'
                : 'bg-[#e6eeff] text-[#0d1c2e]'
            }`}
          >
            Knowledge
          </button>
          <button
            onClick={() => setSelectedPillar('lifestyle')}
            className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all ${
              selectedPillar === 'lifestyle'
                ? 'bg-[#064e3b] text-white font-semibold'
                : 'bg-[#e6eeff] text-[#0d1c2e]'
            }`}
          >
            Lifestyle
          </button>
        </div>

        {/* Mode & Status quick pill bar */}
        <div className="flex items-center justify-between text-xs text-[#707974] pt-1">
          <div className="flex items-center gap-1.5">
            <span className="font-medium">Mode:</span>
            <button
              onClick={() => setSelectedMode('all')}
              className={`px-2 py-0.5 rounded ${
                selectedMode === 'all' ? 'bg-[#dce9ff] text-[#064e3b] font-bold' : ''
              }`}
            >
              {t.allFilter}
            </button>
            <button
              onClick={() => setSelectedMode('Full Mode')}
              className={`px-2 py-0.5 rounded ${
                selectedMode === 'Full Mode' ? 'bg-[#dce9ff] text-[#064e3b] font-bold' : ''
              }`}
            >
              {t.fullMode}
            </button>
            <button
              onClick={() => setSelectedMode('Min Viable Mode')}
              className={`px-2 py-0.5 rounded ${
                selectedMode === 'Min Viable Mode' ? 'bg-[#ffdcc3] text-[#904d00] font-bold' : ''
              }`}
            >
              {t.minViableMode}
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
              className={`px-2 py-0.5 rounded ${
                statusFilter === 'pending' ? 'bg-[#ffdad6] text-[#ba1a1a] font-bold' : ''
              }`}
            >
              Pending ({habits.filter((h) => !h.completed).length})
            </button>
          </div>
        </div>
      </div>

      {/* Habit List */}
      <div className="flex flex-col gap-2 pt-1">
        {filteredHabits.length === 0 ? (
          <div className="py-12 text-center text-[#707974] bg-white rounded-xl border border-[#eff4ff]">
            <span className="material-symbols-outlined text-[32px] text-[#bfc9c3] mb-1">
              search_off
            </span>
            <p className="text-sm font-medium">No habits match your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPillar('all');
                setSelectedMode('all');
                setStatusFilter('all');
              }}
              className="mt-2 text-xs text-[#064e3b] font-bold hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredHabits.map((habit) => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="group flex items-center justify-between p-3.5 rounded-xl bg-white shadow-xs border border-[#eff4ff] hover:border-[#dce9ff] transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHabit(habit.id);
                  }}
                  className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform active:scale-90 ${
                    habit.completed
                      ? 'bg-[#064e3b] text-white'
                      : 'bg-[#e6eeff] text-transparent hover:ring-2 hover:ring-[#064e3b]/30'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ display: habit.completed ? 'block' : 'none' }}
                  >
                    check
                  </span>
                </button>

                <div className="flex flex-col min-w-0 pr-2">
                  <span
                    className={`font-['Inter'] text-[15px] font-medium truncate ${
                      habit.completed
                        ? 'text-[#707974] line-through'
                        : 'text-[#0d1c2e] font-semibold'
                    }`}
                  >
                    {habit.title}
                  </span>
                  <span className="text-xs text-[#707974] truncate">{habit.subtitle}</span>

                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        habit.pillarId === 'spiritual'
                          ? 'bg-[#b0f0d6] text-[#002117]'
                          : habit.pillarId === 'knowledge'
                          ? 'bg-[#89f5e7] text-[#00201d]'
                          : 'bg-[#ffdcc3] text-[#2f1500]'
                      }`}
                    >
                      {habit.categoryTag}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] ${
                        habit.mode === 'Min Viable Mode'
                          ? 'bg-[#ffdcc3] text-[#6e3900] font-bold'
                          : 'bg-[#e6eeff] text-[#0d1c2e] font-medium'
                      }`}
                    >
                      {habit.mode}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3]/50">
                  <span
                    className="material-symbols-outlined text-[14px] text-[#904d00]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_fire_department
                  </span>
                  <span className="text-[11px] text-[#2f1500] font-bold">{habit.streakDays}d</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHabit(habit);
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#eff4ff] text-[#707974] transition-colors"
                  title="Edit details"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
