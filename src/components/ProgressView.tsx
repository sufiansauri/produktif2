import React from 'react';
import { useRhythm } from '../context/RhythmContext';

export const ProgressView: React.FC = () => {
  const { user, pillarStats, reflections, t, language } = useRhythm();

  const daysOfWeek = language === 'id' ? [
    { day: 'Sen', date: '24', rate: 85, isToday: true },
    { day: 'Sel', date: '25', rate: 90, isToday: false },
    { day: 'Rab', date: '26', rate: 78, isToday: false },
    { day: 'Kam', date: '27', rate: 95, isToday: false },
    { day: 'Jum', date: '28', rate: 100, isToday: false },
    { day: 'Sab', date: '29', rate: 72, isToday: false },
    { day: 'Ahd', date: '30', rate: 88, isToday: false },
  ] : [
    { day: 'Mon', date: '24', rate: 85, isToday: true },
    { day: 'Tue', date: '25', rate: 90, isToday: false },
    { day: 'Wed', date: '26', rate: 78, isToday: false },
    { day: 'Thu', date: '27', rate: 95, isToday: false },
    { day: 'Fri', date: '28', rate: 100, isToday: false },
    { day: 'Sat', date: '29', rate: 72, isToday: false },
    { day: 'Sun', date: '30', rate: 88, isToday: false },
  ];

  const trophies = [
    {
      title: language === 'id' ? "Penjaga Al-Qur'an" : "Al-Qur'an Keeper",
      detail: language === 'id' ? '45 Hari Tilawah Istiqomah' : '45d Continuous Tilawah',
      icon: 'menu_book',
      color: 'bg-[#064e3b] text-[#b0f0d6]',
    },
    {
      title: language === 'id' ? 'Pejuang Shalat Jamaah' : 'Masjid Devotee',
      detail: language === 'id' ? '34 Hari Shalat 5 Waktu di Masjid' : "34d Shalat Jama'ah 5 waktu",
      icon: 'mosque',
      color: 'bg-[#00342f] text-[#89f5e7]',
    },
    {
      title: language === 'id' ? 'Disiplin Rumah Rapi' : 'Deep Home Care',
      detail: language === 'id' ? '30 Hari House Discipline' : '30d House Discipline',
      icon: 'cleaning_services',
      color: 'bg-[#904d00] text-[#ffdcc3]',
    },
    {
      title: language === 'id' ? 'Insinyur & Pengembang AI' : 'AI Builder Sprint',
      detail: language === 'id' ? '21 Hari Belajar Tech & LLM' : '21d Consistent Tech Study',
      icon: 'smart_toy',
      color: 'bg-[#004d46] text-[#89f5e7]',
    },
    {
      title: language === 'id' ? 'Pecinta Kebun & Alam' : 'Green Thumb',
      detail: language === 'id' ? '22 Hari Urban Garden & Kompos' : '22d Urban Garden & Nature',
      icon: 'potted_plant',
      color: 'bg-[#064e3b] text-[#80bea6]',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-12 gap-5">
      {/* Title */}
      <div>
        <span className="font-['Inter'] text-xs text-[#404944] uppercase tracking-wider font-semibold">
          {t.progressSubtitle}
        </span>
        <h1 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0d1c2e] font-bold tracking-tight">
          {t.progressTitle}
        </h1>
      </div>

      {/* Level & XP Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#064e3b] via-[#004d46] to-[#00342f] text-white shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-['Plus_Jakarta_Sans'] font-extrabold text-base text-[#89f5e7] border border-[#89f5e7]/30">
              L{user.level}
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-base leading-tight">
                {user.levelTitle}
              </div>
              <div className="text-xs text-[#b0f0d6]/80">Level {user.level} • 2,420 XP earned</div>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-bold text-[#b0f0d6] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            +{user.bonusXp} XP {language === 'id' ? 'Hari Ini' : 'Today'}
          </div>
        </div>

        {/* Progress to next level */}
        <div className="flex flex-col gap-1 pt-1">
          <div className="flex justify-between text-[11px] text-[#b0f0d6]">
            <span>{t.nextRank}: Istiqomah Sage (Level 9)</span>
            <span>82%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-[#89f5e7] rounded-full" style={{ width: '82%' }} />
          </div>
        </div>
      </div>

      {/* 7-Day Consistency Cadence */}
      <div className="p-4 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
            {t.weeklyCadence}
          </span>
          <span className="text-xs font-semibold text-[#064e3b]">Avg 85.4%</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {daysOfWeek.map((d) => (
            <div
              key={d.day}
              className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                d.isToday
                  ? 'bg-[#dce9ff] border-[#064e3b] shadow-xs ring-1 ring-[#064e3b]'
                  : 'bg-[#f8f9ff] border-[#eff4ff]'
              }`}
            >
              <span className="text-[11px] font-semibold text-[#404944]">{d.day}</span>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0d1c2e] my-0.5">
                {d.date}
              </span>
              <div className="w-full h-1.5 rounded-full bg-[#e6eeff] overflow-hidden mt-1">
                <div
                  className="h-full bg-[#064e3b] rounded-full"
                  style={{ width: `${d.rate}%` }}
                />
              </div>
              <span className="text-[9px] font-bold text-[#064e3b] mt-1">{d.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div className="p-4 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-3.5">
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
          Pillar Balance & Completion
        </span>

        {/* Spiritual */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]" />
              <span className="font-semibold text-[#0d1c2e]">Pilar Utama (Spiritual & Core)</span>
            </div>
            <span className="font-bold text-[#064e3b]">
              {pillarStats.spiritual.completed}/{pillarStats.spiritual.total} ({pillarStats.spiritual.percent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#e6eeff] overflow-hidden">
            <div
              className="h-full bg-[#064e3b] rounded-full transition-all"
              style={{ width: `${pillarStats.spiritual.percent}%` }}
            />
          </div>
        </div>

        {/* Knowledge */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004d46]" />
              <span className="font-semibold text-[#0d1c2e]">Pilar Pendukung (Knowledge & Skills)</span>
            </div>
            <span className="font-bold text-[#00342f]">
              {pillarStats.knowledge.completed}/{pillarStats.knowledge.total} ({pillarStats.knowledge.percent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#e6eeff] overflow-hidden">
            <div
              className="h-full bg-[#004d46] rounded-full transition-all"
              style={{ width: `${pillarStats.knowledge.percent}%` }}
            />
          </div>
        </div>

        {/* Lifestyle */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c]" />
              <span className="font-semibold text-[#0d1c2e]">Pilar Gaya Hidup (Family & Work)</span>
            </div>
            <span className="font-bold text-[#904d00]">
              {pillarStats.lifestyle.completed}/{pillarStats.lifestyle.total} ({pillarStats.lifestyle.percent}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#e6eeff] overflow-hidden">
            <div
              className="h-full bg-[#fe932c] rounded-full transition-all"
              style={{ width: `${pillarStats.lifestyle.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges / Milestones */}
      <div className="flex flex-col gap-2.5">
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
          Unlocked Milestone Badges
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {trophies.map((t) => (
            <div
              key={t.title}
              className="p-3 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex items-center gap-3"
            >
              <div
                className={`w-9 h-9 rounded-lg ${t.color} flex items-center justify-center shrink-0`}
              >
                <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0d1c2e]">
                  {t.title}
                </div>
                <div className="text-[11px] text-[#707974]">{t.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reflections Journal Log */}
      <div className="flex flex-col gap-2.5">
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
          Reflection Log Stream
        </span>
        {reflections.length === 0 ? (
          <div className="p-4 bg-white rounded-xl text-center text-xs text-[#707974]">
            No reflection notes logged yet.
          </div>
        ) : (
          reflections.map((r) => (
            <div
              key={r.id}
              className="p-3.5 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs text-[#707974]">
                <span className="font-semibold text-[#064e3b]">{r.date} • {r.timestamp}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#0d1c2e] font-medium text-[10px]">
                  {r.mood || 'Reflection'}
                </span>
              </div>
              <p className="text-xs text-[#0d1c2e] font-medium italic">
                "{r.text}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
