import React, { useState, useRef, useEffect } from 'react';
import { useRhythm } from '../context/RhythmContext';

interface SettingsViewProps {
  onOpenPhotoModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenPhotoModal }) => {
  const {
    user,
    updateUser,
    setProfilePhoto,
    resetToDefault,
    habits,
    rhythmBlocks,
    showToast,
    language,
    setLanguage,
    t,
  } = useRhythm();

  const [name, setName] = useState(user.name);
  const [quote, setQuote] = useState(user.quote);
  const [quotePrinciple, setQuotePrinciple] = useState(user.quotePrinciple);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setInstallPrompt(null);
      showToast(language === 'id' ? 'Aplikasi berhasil dipasang di perangkat!' : 'App installed on device!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as { standalone?: boolean }).standalone) {
      setIsStandalone(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [language, showToast]);

  const handleTriggerInstall = async () => {
    if (!installPrompt) {
      showToast(
        language === 'id'
          ? 'Buka menu browser (titik 3 ⋮ di Chrome) > pilih "Install aplikasi"'
          : 'Open browser menu (three dots ⋮ in Chrome) > tap "Install app"'
      );
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast(language === 'id' ? 'Pemasangan aplikasi berhasil!' : 'Installation accepted!');
    }
    setInstallPrompt(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      quote,
      quotePrinciple,
    });
    showToast(language === 'id' ? 'Profil & prinsip ritme berhasil disimpan' : 'Profile & principles saved successfully');
  };

  const handleQuickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'id' ? 'Ukuran foto maksimal 5MB' : 'Max photo size is 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const exportData = () => {
    const data = {
      user,
      habits,
      rhythmBlocks,
      language,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rhythm-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast(language === 'id' ? 'Cadangan data berhasil diekspor!' : 'Rhythm backup exported!');
  };

  return (
    <div className="flex flex-col w-full px-4 pt-4 pb-16 gap-5">
      {/* Title */}
      <div>
        <span className="font-['Inter'] text-xs text-[#404944] uppercase tracking-wider font-semibold">
          {t.settingsSubtitle}
        </span>
        <h1 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#0d1c2e] font-bold tracking-tight">
          {t.settingsTitle}
        </h1>
      </div>

      {/* Profile & Photo Settings Card */}
      <div className="p-4 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e]">
            {t.profileSection}
          </span>
          <span className="text-[11px] font-semibold text-[#064e3b] bg-[#b0f0d6] px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        {/* Avatar customizer row */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-[#f8f9ff] border border-[#e6eeff]">
          <div className="relative group cursor-pointer" onClick={onOpenPhotoModal}>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-3 ring-[#b0f0d6] group-hover:ring-[#064e3b] shadow-sm transition-all"
            />
            <button
              type="button"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-xs shadow-md"
              title={t.changePhotoBtn}
            >
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-1.5">
            <div>
              <div className="text-sm font-bold text-[#0d1c2e]">{user.name}</div>
              <div className="text-xs text-[#707974]">{user.levelTitle} • Lvl {user.level}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onOpenPhotoModal}
                className="px-3 py-1.5 rounded-lg bg-[#064e3b] text-white text-xs font-bold hover:bg-[#003527] transition-all flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px]">tune</span>
                <span>{t.changePhotoBtn}</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleQuickUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#e6eeff] text-[#0d1c2e] text-xs font-semibold hover:bg-[#eff4ff] transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">upload</span>
                <span>{t.uploadPhoto}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details Form */}
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.displayNameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.quoteLabel}
            </label>
            <textarea
              rows={2}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.quoteTagLabel}
            </label>
            <input
              type="text"
              value={quotePrinciple}
              onChange={(e) => setQuotePrinciple(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <button
            type="submit"
            className="mt-1 py-2 px-4 rounded-lg bg-[#064e3b] text-white text-xs font-bold hover:bg-[#003527] transition-all self-end flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">save</span>
            <span>{t.saveProfileBtn}</span>
          </button>
        </form>
      </div>

      {/* Language Selection Card */}
      <div className="p-4 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#064e3b] text-[20px]">
            translate
          </span>
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
            {t.languageLabel}
          </span>
        </div>
        <p className="text-xs text-[#707974]">
          {language === 'id'
            ? 'Pilih bahasa tampilan untuk semua menu, checklist kebiasaan, dan navigasi.'
            : 'Select interface language for menus, habit checklist, and navigation.'}
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
              language === 'id'
                ? 'bg-[#eff4ff] border-[#064e3b] ring-2 ring-[#064e3b]/30 shadow-xs'
                : 'bg-white border-[#e6eeff] hover:bg-[#f8f9ff]'
            }`}
          >
            <span className="text-xl">🇮🇩</span>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0d1c2e]">
                Bahasa Indonesia
              </div>
              <div className="text-[10px] text-[#707974]">Aktif / Terpilih</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
              language === 'en'
                ? 'bg-[#eff4ff] border-[#064e3b] ring-2 ring-[#064e3b]/30 shadow-xs'
                : 'bg-white border-[#e6eeff] hover:bg-[#f8f9ff]'
            }`}
          >
            <span className="text-xl">🇬🇧</span>
            <div>
              <div className="font-['Plus_Jakarta_Sans'] font-bold text-xs text-[#0d1c2e]">
                English
              </div>
              <div className="text-[10px] text-[#707974]">English Version</div>
            </div>
          </button>
        </div>
      </div>

      {/* Cadence Architecture Overview */}
      <div className="p-4 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-2.5">
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
          {t.pillarsFramework}
        </span>
        <div className="space-y-2 text-xs text-[#404944] leading-relaxed">
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
            <span className="font-bold text-[#064e3b]">
              {language === 'id' ? 'Pilar 1 (Spiritual & Core):' : 'Pillar 1 (Spiritual & Core):'}
            </span>{' '}
            {language === 'id'
              ? "Fondasi ibadah shalat berjamaah 5 waktu di masjid, tilawah Al-Qur'an harian, zikir pagi petang, serta tahajjud sepertiga malam."
              : "Grounding worship, 5-daily congregational prayers, daily Quran tilawah, morning/evening adhkar, and night prayer."}
          </div>
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
            <span className="font-bold text-[#00342f]">
              {language === 'id' ? 'Pilar 2 (Knowledge & Skills):' : 'Pillar 2 (Knowledge & Skills):'}
            </span>{' '}
            {language === 'id'
              ? 'Pengembangan kapasitas intelektual: belajar arsitektur AI, coding aplikasi, membaca kitab/buku tafsir, dan latihan public speaking.'
              : 'Intellectual growth: AI architecture study, software engineering sprints, book reading, and communication practice.'}
          </div>
          <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
            <span className="font-bold text-[#904d00]">
              {language === 'id' ? 'Pilar 3 (Family & Lifestyle):' : 'Pillar 3 (Family & Lifestyle):'}
            </span>{' '}
            {language === 'id'
              ? 'Ketahanan fisik & keharmonisan rumah tangga: mendidik anak, disiplin kebersihan rumah, lari maraton, dan merawat kebun.'
              : 'Physical endurance & domestic harmony: educating children, home cleanliness, running endurance, and urban gardening.'}
          </div>
        </div>
      </div>

      {/* Mobile Installation Guide Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#eff4ff] to-[#f8f9ff] border border-[#dce9ff] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#064e3b] text-[20px]">
              smartphone
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
              {t.mobileReadyTitle}
            </span>
          </div>
          {isStandalone ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#064e3b] bg-[#b0f0d6] px-2.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              {language === 'id' ? 'Terpasang di HP' : 'Installed'}
            </span>
          ) : (
            <span className="text-[11px] font-medium text-[#707974] bg-white px-2 py-0.5 rounded-full border border-[#e6eeff]">
              PWA Ready
            </span>
          )}
        </div>

        <p className="text-xs text-[#404944] leading-relaxed">
          {language === 'id'
            ? 'Aplikasi ini didesain sebagai Progressive Web App (PWA) yang dapat dipasang langsung di layar utama smartphone tanpa lewat Play Store, hemat memori, dan dapat berjalan offline.'
            : 'Designed as a Progressive Web App (PWA) installable directly to your smartphone home screen without Play Store, lightweight, and offline capable.'}
        </p>

        {/* 1-Tap Install Button */}
        {!isStandalone && (
          <button
            type="button"
            onClick={handleTriggerInstall}
            className="w-full py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#003527] text-white font-['Plus_Jakarta_Sans'] font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>{language === 'id' ? 'Pasang Aplikasi Sekarang (Android / HP)' : 'Install App Now (Android / Mobile)'}</span>
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-white border border-[#e6eeff]">
            <div className="font-bold text-[#064e3b] flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">phone_android</span>
              <span>Android (Google Chrome)</span>
            </div>
            <p className="text-[11px] text-[#707974] leading-normal">
              {language === 'id'
                ? 'Klik tombol hijau di atas, atau klik tombol titik tiga (⋮) di Chrome > pilih "Install aplikasi" / "Tambahkan ke Layar Utama".'
                : 'Tap the green button above, or tap the three-dots (⋮) in Chrome > choose "Install app" / "Add to Home screen".'}
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-[#e6eeff]">
            <div className="font-bold text-[#064e3b] flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[15px]">phone_iphone</span>
              <span>iOS / iPhone (Safari)</span>
            </div>
            <p className="text-[11px] text-[#707974] leading-normal">
              {language === 'id'
                ? 'Buka di Safari > Tekan tombol Share (kotak dengan panah ke atas) > gulir ke bawah dan pilih "Add to Home Screen".'
                : 'Open in Safari > Tap the Share icon (square with arrow up) > scroll down and tap "Add to Home Screen".'}
            </p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="p-4 rounded-xl bg-white border border-[#eff4ff] shadow-xs flex flex-col gap-3">
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e]">
          {t.dataManagement}
        </span>
        <p className="text-xs text-[#707974]">
          {t.dataDesc}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={exportData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#eff4ff] text-[#064e3b] text-xs font-semibold hover:bg-[#dce9ff] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>{t.exportBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const confirmMsg = language === 'id'
                ? 'Kembalikan seluruh kebiasaan dan jadwal ke data awal?'
                : 'Reset habits and schedule back to initial demo data?';
              if (confirm(confirmMsg)) {
                resetToDefault();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold hover:bg-[#ffdad6]/80 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>{t.resetDemoBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
