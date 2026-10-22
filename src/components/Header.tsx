import React from 'react';
import { useRhythm } from '../context/RhythmContext';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenPhotoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  onOpenPhotoModal,
}) => {
  const { activeTab, language, setLanguage, t, user } = useRhythm();

  const getSubTitle = () => {
    switch (activeTab) {
      case 'overview':
        return t.dashboard;
      case 'checklist':
        return t.checklistTab;
      case 'schedule':
        return t.scheduleTab;
      case 'progress':
        return t.progressTab;
      case 'settings':
        return t.settingsTab;
      default:
        return t.dashboard;
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f8f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#e6eeff]/60">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#064e3b] flex items-center justify-center text-white shadow-sm overflow-hidden shrink-0">
            <span className="material-symbols-outlined text-[20px] text-[#89f5e7]">
              all_inclusive
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[1.05rem] text-[#003527] tracking-tight leading-tight">
              {t.appTitle}
            </span>
            <span className="font-['Inter'] text-[11px] text-[#404944] font-normal leading-none">
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Pill */}
          <div className="flex items-center rounded-full bg-[#eff4ff] p-0.5 border border-[#e6eeff]">
            <button
              type="button"
              onClick={() => setLanguage('id')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                language === 'id'
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'text-[#707974] hover:text-[#0d1c2e]'
              }`}
              title="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'text-[#707974] hover:text-[#0d1c2e]'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 relative flex items-center justify-center rounded-full text-[#404944] hover:text-[#0d1c2e] hover:bg-[#e6eeff]/60 active:scale-95 transition-all"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[21px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#fe932c] ring-2 ring-[#f8f9ff]"></span>
          </button>

          {/* Profile Avatar with Photo Edit shortcut */}
          <div className="relative flex items-center">
            <button
              onClick={onOpenPhotoModal}
              className="relative flex items-center group active:scale-95 transition-all cursor-pointer"
              title="Atur Foto Profil"
            >
              <img
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#b0f0d6] group-hover:ring-[#064e3b] transition-all"
                src={user.avatarUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80';
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-[8px] ring-1 ring-white">
                ✎
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
