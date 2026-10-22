import React from 'react';
import { useRhythm } from '../context/RhythmContext';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useRhythm();

  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'overview', label: t.navOverview, icon: 'dashboard' },
    { id: 'checklist', label: t.navChecklist, icon: 'check_circle' },
    { id: 'schedule', label: t.navSchedule, icon: 'calendar_month' },
    { id: 'progress', label: t.navProgress, icon: 'trending_up' },
    { id: 'settings', label: t.navSettings, icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#eff4ff] shadow-[0_-4px_20px_rgba(13,28,46,0.05)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-200 ${
                isActive
                  ? "text-[#064e3b] font-semibold after:content-[''] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:bg-[#064e3b] after:rounded-full"
                  : 'text-[#707974] hover:text-[#0d1c2e]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[23px] transition-transform active:scale-90"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              <span className="font-['Inter'] text-[10px] tracking-tight mt-0.5 font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
