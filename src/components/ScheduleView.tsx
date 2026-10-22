import React, { useState, useEffect } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { RhythmBlock } from '../types';

interface ScheduleViewProps {
  onSelectBlock: (block: RhythmBlock) => void;
  onAddNewBlock: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  onSelectBlock,
  onAddNewBlock,
}) => {
  const { rhythmBlocks, updateRhythmBlock, showToast, t, language } = useRhythm();

  // Focus Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(25 * 60);
  const [activeSessionName, setActiveSessionName] = useState(
    language === 'id' ? 'Sesi Fokus Mendalam (Deep Sprint)' : 'Teaching & Pro (Focus Sprint)'
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && timerActive) {
      setTimerActive(false);
      showToast(language === 'id' ? 'Sesi fokus tuntas! +50 XP bonus diperoleh' : 'Focus session complete! +50 XP bonus earned');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSecondsLeft, language]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const prayerTimes = [
    { name: 'Subuh', time: '04:25', passed: true },
    { name: 'Terbit', time: '05:40', passed: true },
    { name: 'Dzuhur', time: '11:45', passed: false, current: true },
    { name: 'Ashar', time: '15:05', passed: false },
    { name: 'Maghrib', time: '17:50', passed: false },
    { name: 'Isya', time: '19:02', passed: false },
  ];

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-12 gap-5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-['Inter'] text-xs text-[#404944] uppercase tracking-wider font-semibold">
            {t.scheduleSubtitle}
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0d1c2e] font-bold tracking-tight">
            {t.scheduleTitle}
          </h1>
        </div>
        <button
          onClick={onAddNewBlock}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#064e3b] text-white text-xs font-semibold hover:bg-[#003527] transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>{t.addBlockBtn}</span>
        </button>
      </div>

      {/* Focus Timer Ribbon */}
      <div className="rounded-xl bg-gradient-to-r from-[#064e3b] to-[#00342f] text-white p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#89f5e7] text-[22px]">
              timer
            </span>
          </div>
          <div>
            <div className="font-['Plus_Jakarta_Sans'] font-bold text-sm">
              {activeSessionName}
            </div>
            <div className="text-xs text-[#b0f0d6]/80">
              {t.deepWorkSprint}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <span className="font-mono font-bold text-2xl tracking-wider text-white">
            {formatTimer(timerSecondsLeft)}
          </span>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timerActive
                ? 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                : 'bg-[#b0f0d6] text-[#002117] hover:bg-[#89f5e7]'
            }`}
          >
            {timerActive ? t.pauseFocus : t.startFocus}
          </button>
          <button
            onClick={() => {
              setTimerActive(false);
              setTimerSecondsLeft(25 * 60);
            }}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            title="Reset timer"
          >
            <span className="material-symbols-outlined text-[16px]">replay</span>
          </button>
        </div>
      </div>

      {/* Islamic Prayer Times Horizontal Bar */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-[#404944] uppercase tracking-wide">
          {t.prayerTimesTitle}
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {prayerTimes.map((p) => (
            <div
              key={p.name}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                p.current
                  ? 'bg-[#dce9ff] border-[#064e3b] text-[#064e3b] shadow-xs'
                  : p.passed
                  ? 'bg-white/60 border-[#e6eeff] text-[#707974]'
                  : 'bg-white border-[#e6eeff] text-[#0d1c2e]'
              }`}
            >
              <div className="text-[11px] font-medium">{p.name}</div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-sm mt-0.5">{p.time}</div>
              {p.current && (
                <span className="inline-block px-1.5 py-0.2 bg-[#064e3b] text-white text-[9px] rounded-full mt-1 font-semibold">
                  Upcoming
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Timeline of Blocks */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#404944] uppercase tracking-wide">
            Daily Cadence Blocks
          </span>
          <span className="text-xs text-[#707974]">{rhythmBlocks.length} Scheduled blocks</span>
        </div>

        <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e6eeff]">
          {rhythmBlocks.map((block) => {
            const isCompleted = block.status === 'Completed';
            const isInProgress = block.status === 'In Progress';

            return (
              <div key={block.id} className="relative group">
                {/* Timeline node dot */}
                <div
                  className={`absolute -left-6 top-4 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'border-[#064e3b] bg-[#064e3b] text-white'
                      : isInProgress
                      ? 'border-[#064e3b] ring-4 ring-[#b0f0d6]'
                      : 'border-[#bfc9c3]'
                  }`}
                >
                  {isCompleted && (
                    <span className="material-symbols-outlined text-[10px]">check</span>
                  )}
                </div>

                {/* Card */}
                <div
                  onClick={() => onSelectBlock(block)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
                    isInProgress
                      ? 'bg-[#eff4ff] border-[#064e3b] shadow-sm'
                      : 'bg-white border-[#e6eeff] shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#064e3b]">
                          {block.timeRange}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            isCompleted
                              ? 'bg-[#b0f0d6] text-[#002117]'
                              : isInProgress
                              ? 'bg-[#064e3b] text-white animate-pulse'
                              : 'bg-[#e6eeff] text-[#404944]'
                          }`}
                        >
                          {block.status}
                        </span>
                      </div>
                      <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e] mt-1">
                        {block.title}
                      </h3>
                      <p className="text-xs text-[#707974] mt-0.5">{block.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const nextStatus: RhythmBlock['status'] =
                            block.status === 'Completed'
                              ? 'Upcoming'
                              : block.status === 'Upcoming'
                              ? 'In Progress'
                              : 'Completed';
                          updateRhythmBlock(block.id, { status: nextStatus });
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#eff4ff] hover:bg-[#dce9ff] text-[#064e3b]"
                      >
                        {isCompleted ? 'Reopen' : isInProgress ? 'Finish' : 'Set Active'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
