import React, { useState } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { Habit, PillarId, RhythmBlock } from '../types';

interface OverviewViewProps {
  onOpenQuickLog: () => void;
  onSelectHabit: (habit: Habit) => void;
  onSelectBlock: (block: RhythmBlock) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onOpenQuickLog,
  onSelectHabit,
  onSelectBlock,
}) => {
  const {
    habits,
    toggleHabit,
    updateTilawahPages,
    rhythmBlocks,
    updateRhythmBlock,
    user,
    cycleQuote,
    activeFilter,
    setActiveFilter,
    totalHabits,
    completedHabits,
    completionPercent,
    remainingHabits,
    pillarStats,
    selectedDate,
    showToast,
    t,
    language,
  } = useRhythm();

  const [tilawahEditing, setTilawahEditing] = useState(false);

  // Filter habits according to active filter
  const spiritualHabits = habits.filter((h) => h.pillarId === 'spiritual');
  const knowledgeHabits = habits.filter((h) => h.pillarId === 'knowledge');
  const lifestyleHabits = habits.filter((h) => h.pillarId === 'lifestyle');

  // SVG Circular Ring calculation (circumference = 2 * PI * 26 ≈ 163.36)
  const circumference = 163.36;
  const strokeDashoffset = circumference - (circumference * completionPercent) / 100;

  // Format current live time for display
  const currentFormattedTime = '09:45 AM';

  const renderHabitCard = (habit: Habit) => {
    // Special rendering for Tilawah Al-Qur'an with interactive reading progress
    if (habit.id === 'habit-5') {
      const currentPages = habit.progressCurrent ?? 16;
      const maxPages = habit.progressMax ?? 20;
      const percent = habit.progressPercent ?? Math.round((currentPages / maxPages) * 100);

      return (
        <div
          key={habit.id}
          className="p-3.5 rounded-xl bg-white shadow-sm border border-[#eff4ff] flex flex-col gap-2.5 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div
              className="flex items-start gap-3 min-w-0 cursor-pointer flex-1"
              onClick={() => onSelectHabit(habit)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTilawahEditing(!tilawahEditing);
                }}
                className="mt-0.5 w-6 h-6 rounded-md bg-[#00342f] text-white flex items-center justify-center shrink-0 hover:bg-[#004d46] transition-colors"
                title="Adjust Tilawah Pages"
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
              </button>
              <div className="flex flex-col min-w-0">
                <span
                  className={`font-['Inter'] text-base font-semibold truncate ${
                    habit.completed ? 'text-[#0d1c2e]' : 'text-[#0d1c2e]'
                  }`}
                >
                  {habit.title}
                </span>
                <span className="font-['Inter'] text-xs text-[#404944]">{habit.subtitle}</span>
              </div>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3]/50 shrink-0">
              <span
                className="material-symbols-outlined text-[14px] text-[#904d00]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="font-['Inter'] text-[11px] text-[#2f1500] font-bold">
                {habit.streakDays}d
              </span>
            </div>
          </div>

          {/* Reading Progress Bar with Page Controls */}
          <div className="flex flex-col gap-1.5 pl-9">
            <div className="flex justify-between items-center font-['Inter'] text-[11px] text-[#404944]">
              <span>{t.readingProgress}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#064e3b]">{percent}%</span>
                {tilawahEditing && (
                  <div className="flex items-center gap-1 bg-[#eff4ff] rounded-md px-1 py-0.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => updateTilawahPages(currentPages - 1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white text-[#0d1c2e] hover:bg-[#e6eeff] text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="text-[11px] font-semibold px-1">{currentPages}p</span>
                    <button
                      type="button"
                      onClick={() => updateTilawahPages(currentPages + 1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-white text-[#0d1c2e] hover:bg-[#e6eeff] text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-[#e6eeff] overflow-hidden">
              <div
                className="h-full bg-[#064e3b] rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#707974] pt-0.5">
              <span>{language === 'id' ? 'Target Juz 14 (1 Juz Sehari)' : 'Juz 14 target (1 Juz Daily)'}</span>
              <button
                type="button"
                onClick={() => setTilawahEditing(!tilawahEditing)}
                className="text-[#064e3b] font-semibold hover:underline"
              >
                {tilawahEditing ? t.doneEditing : t.quickUpdatePages}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Standard Habit Card
    return (
      <div
        key={habit.id}
        onClick={() => toggleHabit(habit.id)}
        className="group flex items-center justify-between p-3.5 rounded-xl bg-white shadow-sm border border-[#eff4ff] transition-all hover:border-[#dce9ff] hover:shadow cursor-pointer select-none"
      >
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {/* Checkbox button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleHabit(habit.id);
            }}
            className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-transform active:scale-90 ${
              habit.completed
                ? 'bg-[#064e3b] text-white shadow-xs'
                : 'bg-[#e6eeff] text-transparent hover:ring-2 hover:ring-[#064e3b]/30'
            }`}
            aria-label={`Toggle ${habit.title}`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ display: habit.completed ? 'block' : 'none' }}
            >
              check
            </span>
          </button>

          {/* Details */}
          <div className="flex flex-col min-w-0 pr-2">
            <span
              className={`font-['Inter'] text-[15px] font-medium truncate transition-colors ${
                habit.completed
                  ? 'text-[#707974] line-through'
                  : 'text-[#0d1c2e] font-semibold'
              }`}
            >
              {habit.title}
            </span>
            <span className="font-['Inter'] text-xs text-[#707974] mt-0.5 truncate">
              {habit.subtitle}
            </span>

            {/* Badges */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span
                className={`px-2 py-0.5 rounded-full font-['Inter'] text-[10px] font-semibold ${
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
                className={`px-2 py-0.5 rounded-full font-['Inter'] text-[10px] ${
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

        {/* Streak & More button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3]/50">
            <span
              className="material-symbols-outlined text-[14px] text-[#904d00]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-['Inter'] text-[11px] text-[#2f1500] font-bold">
              {habit.streakDays}d
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectHabit(habit);
            }}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[#bfc9c3] hover:text-[#0d1c2e] opacity-0 group-hover:opacity-100 transition-opacity"
            title="Edit habit details"
          >
            <span className="material-symbols-outlined text-[16px]">more_vert</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Greeting & Context */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['Inter'] text-xs text-[#404944] uppercase tracking-wider font-semibold">
              {selectedDate}
            </span>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0d1c2e] font-bold tracking-tight">
              {user.name}
            </h1>
          </div>

          {/* Consistent Streak badge */}
          <div
            onClick={() => showToast(`Alhamdulillah! ${user.streakDays} ${t.consistentPill}.`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdcc3]/60 border border-[#ffdcc3] shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <span
              className="material-symbols-outlined text-[18px] text-[#904d00]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-['Inter'] text-sm text-[#2f1500] font-bold">
              {user.streakDays}d {t.consistentPill}
            </span>
          </div>
        </div>
      </div>

      {/* Content Stream */}
      <div className="px-4 flex flex-col gap-5 pb-10">
        {/* Motivational Reflection Card */}
        <div className="relative overflow-hidden rounded-xl bg-[#064e3b] p-4 shadow-sm text-white border border-[#064e3b]">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#b0f0d6]/10 pointer-events-none" />
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-[#80bea6]/20 flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-white text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-['Inter'] text-[14.5px] text-white font-medium italic leading-snug">
                {user.quote}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="font-['Inter'] text-[11px] text-[#80bea6] uppercase tracking-wider font-semibold">
                  {user.quotePrinciple}
                </span>
                <button
                  type="button"
                  onClick={cycleQuote}
                  className="text-[11px] text-[#b0f0d6] hover:underline flex items-center gap-1 opacity-90 hover:opacity-100"
                  title="Next Principle"
                >
                  <span className="material-symbols-outlined text-[13px]">refresh</span>
                  <span>{t.inspireBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Progress & Rhythm Score Overview */}
        <div className="rounded-xl bg-white p-4 shadow-sm border border-[#eff4ff] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-xs text-[#404944] font-medium">
                {t.dailyCompletion}
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl text-[#064e3b] font-extrabold leading-none">
                  {completionPercent}%
                </span>
                <span className="font-['Inter'] text-sm text-[#404944] font-medium">{t.doneLabel}</span>
              </div>
            </div>

            {/* SVG Circular Ring Indicator */}
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  fill="transparent"
                  r="26"
                  stroke="#e6eeff"
                  strokeWidth="5"
                />
                <circle
                  cx="32"
                  cy="32"
                  fill="transparent"
                  r="26"
                  stroke="#064e3b"
                  strokeWidth="5.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#0d1c2e] font-bold">
                  {completedHabits}/{totalHabits}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#eff4ff]">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#404944]">{t.remaining}</span>
              <span className="font-['Plus_Jakarta_Sans'] text-base text-[#0d1c2e] font-bold">
                {remainingHabits} {t.habitsUnit}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#404944]">{t.bonusXp}</span>
              <span className="font-['Plus_Jakarta_Sans'] text-base text-[#064e3b] font-bold">
                +{user.bonusXp} XP
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#404944]">{t.focusScore}</span>
              <div className="flex items-center gap-1">
                <span className="font-['Plus_Jakarta_Sans'] text-base text-[#904d00] font-bold">
                  {user.focusScore}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#904d00]">
                  trending_up
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Time-Blocking Schedule Ribbon */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#064e3b] text-[20px]">
                schedule
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-base text-[#0d1c2e] font-bold">
                {t.todaysRhythm}
              </h2>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e6eeff] text-[#404944] font-['Inter'] text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#064e3b] animate-pulse" />
              {t.nowPrefix} {currentFormattedTime}
            </div>
          </div>

          {/* Timeline Blocks Scroll */}
          <div className="flex gap-2.5 overflow-x-auto pb-1.5 -mx-4 px-4 no-scrollbar">
            {rhythmBlocks.map((block) => {
              const isCurrent = block.status === 'In Progress';
              const isCompleted = block.status === 'Completed';

              return (
                <div
                  key={block.id}
                  onClick={() => onSelectBlock(block)}
                  className={`shrink-0 w-44 p-3 rounded-xl shadow-xs flex flex-col justify-between gap-2.5 border-l-4 transition-all hover:shadow cursor-pointer ${
                    isCurrent
                      ? 'bg-[#dce9ff] border-l-[#064e3b]'
                      : isCompleted
                      ? 'bg-white border-l-[#064e3b]'
                      : 'bg-white border-l-[#bfc9c3]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-['Inter'] text-[11px] ${
                        isCurrent
                          ? 'text-[#064e3b] font-semibold'
                          : 'text-[#404944] font-medium'
                      }`}
                    >
                      {block.timeRange}
                    </span>
                    {isCompleted ? (
                      <span
                        className="material-symbols-outlined text-[#064e3b] text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    ) : isCurrent ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#064e3b] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#064e3b]"></span>
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[#707974] text-[16px]">
                        {block.icon || 'schedule'}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-['Inter'] text-sm text-[#0d1c2e] font-bold truncate">
                      {block.title}
                    </p>
                    <span className="font-['Inter'] text-[11px] text-[#707974] truncate block">
                      {block.subtitle}
                    </span>
                  </div>

                  <span
                    className={`self-start px-2 py-0.5 rounded-full font-['Inter'] text-[10px] font-semibold ${
                      isCompleted
                        ? 'bg-[#b0f0d6] text-[#002117]'
                        : isCurrent
                        ? 'bg-[#064e3b] text-white'
                        : 'bg-[#e6eeff] text-[#404944]'
                    }`}
                  >
                    {block.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter Control Segment */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-['Inter'] text-xs transition-all ${
              activeFilter === 'all'
                ? 'bg-[#064e3b] text-white font-semibold shadow-xs'
                : 'bg-[#e6eeff] text-[#0d1c2e] font-medium hover:bg-[#dce9ff]'
            }`}
          >
            {t.allFilter} ({totalHabits})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('spiritual')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-['Inter'] text-xs transition-all ${
              activeFilter === 'spiritual'
                ? 'bg-[#064e3b] text-white font-semibold shadow-xs'
                : 'bg-[#e6eeff] text-[#0d1c2e] font-medium hover:bg-[#dce9ff]'
            }`}
          >
            {t.pillarSpiritual.split(' (')[0]} ({pillarStats.spiritual.total})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('knowledge')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-['Inter'] text-xs transition-all ${
              activeFilter === 'knowledge'
                ? 'bg-[#064e3b] text-white font-semibold shadow-xs'
                : 'bg-[#e6eeff] text-[#0d1c2e] font-medium hover:bg-[#dce9ff]'
            }`}
          >
            {t.pillarKnowledge.split(' (')[0]} ({pillarStats.knowledge.total})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('lifestyle')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-['Inter'] text-xs transition-all ${
              activeFilter === 'lifestyle'
                ? 'bg-[#064e3b] text-white font-semibold shadow-xs'
                : 'bg-[#e6eeff] text-[#0d1c2e] font-medium hover:bg-[#dce9ff]'
            }`}
          >
            {t.pillarLifestyle.split(' (')[0]} ({pillarStats.lifestyle.total})
          </button>
        </div>

        {/* Checklist Pillars Container */}
        <div className="flex flex-col gap-6">
          {/* ================= PILAR 1 ================= */}
          {(activeFilter === 'all' || activeFilter === 'spiritual') && (
            <section className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]" />
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#0d1c2e] font-bold">
                    {t.pillarSpiritual}
                  </h3>
                </div>
                <span className="font-['Inter'] text-[11px] font-bold text-[#064e3b] px-2 py-0.5 rounded-full bg-[#b0f0d6]">
                  {pillarStats.spiritual.completed}/{pillarStats.spiritual.total} {t.doneBadge}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {spiritualHabits.map(renderHabitCard)}
              </div>
            </section>
          )}

          {/* ================= PILAR 2 ================= */}
          {(activeFilter === 'all' || activeFilter === 'knowledge') && (
            <section className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#004d46]" />
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#0d1c2e] font-bold">
                    {t.pillarKnowledge}
                  </h3>
                </div>
                <span className="font-['Inter'] text-[11px] font-bold text-[#00342f] px-2 py-0.5 rounded-full bg-[#89f5e7]">
                  {pillarStats.knowledge.completed}/{pillarStats.knowledge.total} {t.doneBadge}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {knowledgeHabits.map(renderHabitCard)}
              </div>
            </section>
          )}

          {/* ================= PILAR 3 ================= */}
          {(activeFilter === 'all' || activeFilter === 'lifestyle') && (
            <section className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c]" />
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#0d1c2e] font-bold">
                    {t.pillarLifestyle}
                  </h3>
                </div>
                <span className="font-['Inter'] text-[11px] font-bold text-[#904d00] px-2 py-0.5 rounded-full bg-[#ffdcc3]">
                  {pillarStats.lifestyle.completed}/{pillarStats.lifestyle.total} {t.doneBadge}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {lifestyleHabits.map(renderHabitCard)}
              </div>
            </section>
          )}
        </div>

        {/* Quick Action / Add Target Bar */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenQuickLog}
            className="w-full py-3.5 px-4 rounded-xl bg-white shadow-sm hover:bg-[#eff4ff] border border-[#eff4ff] transition-all flex items-center justify-center gap-2 text-[#064e3b] font-['Inter'] text-sm font-bold active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>{t.quickLogBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
