import React from 'react';
import { useRhythm } from '../context/RhythmContext';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useRhythm();

  if (!isOpen) return null;

  const notifications = language === 'id' ? [
    {
      id: '1',
      title: 'Konsistensi 12 Hari Tercapai!',
      desc: 'MashaAllah! Ritme harian Anda di ketiga pilar terjaga kokoh selama 12 hari berturut-turut.',
      time: '10m lalu',
      icon: 'local_fire_department',
      iconColor: 'text-[#904d00] bg-[#ffdcc3]',
    },
    {
      id: '2',
      title: 'Waktu Shalat Dzuhur',
      desc: "Segera bersiap menuju masjid kampus untuk shalat berjamaah awal waktu.",
      time: '1 jam lalu',
      icon: 'mosque',
      iconColor: 'text-[#064e3b] bg-[#b0f0d6]',
    },
    {
      id: '3',
      title: 'Target Tilawah Berjalan Baik',
      desc: 'Saat ini Juz 14 (16/20 halaman). Tersisa 4 halaman lagi menuju 100% target juz hari ini!',
      time: '3 jam lalu',
      icon: 'menu_book',
      iconColor: 'text-[#00342f] bg-[#89f5e7]',
    },
    {
      id: '4',
      title: 'Rutinitas Fajr Berhasil Tuntas',
      desc: 'Zikir Pagi dan Tahajjud tercatat dengan sempurna (+40 bonus XP).',
      time: '4 jam lalu',
      icon: 'verified',
      iconColor: 'text-[#064e3b] bg-[#b0f0d6]',
    },
  ] : [
    {
      id: '1',
      title: '12d Consistency Streak Reached!',
      desc: 'MashaAllah! Your daily cadence across all three pillars has stayed solid for 12 days.',
      time: '10m ago',
      icon: 'local_fire_department',
      iconColor: 'text-[#904d00] bg-[#ffdcc3]',
    },
    {
      id: '2',
      title: 'Dzuhur Prayer Approaching',
      desc: "Prepare to pause campus teaching duties and head to mosque for congregational prayer.",
      time: '1h ago',
      icon: 'mosque',
      iconColor: 'text-[#064e3b] bg-[#b0f0d6]',
    },
    {
      id: '3',
      title: 'Tilawah Target on Track',
      desc: 'Currently at Juz 14 (16/20 pages). 4 pages remaining to hit 100% daily juz!',
      time: '3h ago',
      icon: 'menu_book',
      iconColor: 'text-[#00342f] bg-[#89f5e7]',
    },
    {
      id: '4',
      title: 'Fajr Routine Completed',
      desc: 'Morning Adhkar and Tahajjud successfully logged with +40 bonus XP.',
      time: '4h ago',
      icon: 'verified',
      iconColor: 'text-[#064e3b] bg-[#b0f0d6]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#e6eeff] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#064e3b] text-[20px]">
              notifications
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e]">
              {t.notificationsTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#707974] hover:bg-[#e6eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-xl bg-white border border-[#eff4ff] hover:border-[#dce9ff] transition-all flex items-start gap-3 shadow-xs"
            >
              <div
                className={`w-9 h-9 rounded-xl ${n.iconColor} flex items-center justify-center shrink-0`}
              >
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0d1c2e] truncate">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-[#707974] shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-[#404944] mt-0.5 leading-relaxed">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#eff4ff] bg-[#f8f9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#064e3b] text-white hover:bg-[#003527] transition-all"
          >
            {t.dismissBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
