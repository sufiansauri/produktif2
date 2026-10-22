import React, { useState } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { INITIAL_USER } from '../data/initialData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPhotoModal: () => void;
}

const ROLE_PRESETS = [
  'Praktisi Istiqomah',
  'Penuntut Ilmu',
  'Tech & AI Builder',
  'Akademisi & Peneliti',
  'Pelari & Penggiat Sehat',
  'Pengusaha & Profesional',
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenPhotoModal,
}) => {
  const { user, updateUser, showToast, t, language } = useRhythm();

  const [name, setName] = useState(user.name);
  const [levelTitle, setLevelTitle] = useState(user.levelTitle);
  const [bio, setBio] = useState(user.bio || '');
  const [quote, setQuote] = useState(user.quote);
  const [quotePrinciple, setQuotePrinciple] = useState(user.quotePrinciple);
  const [tilawahTarget, setTilawahTarget] = useState(user.tilawahDailyTargetPages || 20);
  const [wakeUpTime, setWakeUpTime] = useState(user.wakeUpTime || '04:00');
  const [sleepTime, setSleepTime] = useState(user.sleepTime || '22:00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (language === 'id' ? 'Sahabat Rhythm' : 'Rhythm Seeker');
    updateUser({
      name: finalName,
      levelTitle: levelTitle.trim() || 'Praktisi Istiqomah',
      bio: bio.trim(),
      quote: quote.trim() || user.quote,
      quotePrinciple: quotePrinciple.trim() || user.quotePrinciple,
      tilawahDailyTargetPages: Number(tilawahTarget) || 20,
      wakeUpTime,
      sleepTime,
    });
    showToast(t.profileUpdatedToast);
    onClose();
  };

  const handleResetToGeneral = () => {
    setName('Sahabat Rhythm');
    setLevelTitle('Praktisi Istiqomah');
    setBio('Membangun ritme harian teratur antara spiritualitas, produktivitas, dan keluarga.');
    setQuote('"Disiplin adalah jembatan antara ketaatan spiritual dan karya yang bermakna."');
    setQuotePrinciple('Prinsip Ritme Harian');
    setTilawahTarget(20);
    setWakeUpTime('04:00');
    setSleepTime('22:00');
    showToast(language === 'id' ? 'Formulir direset ke profil umum' : 'Reset to general profile form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-[#e6eeff] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#064e3b] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e] leading-tight">
                {t.editProfileTitle}
              </h2>
              <p className="text-[11px] text-[#707974] leading-none mt-0.5">
                {t.editProfileSubtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#707974] hover:bg-[#e6eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {/* Avatar & Quick Change */}
          <div className="p-3.5 rounded-xl bg-[#f8f9ff] border border-[#e6eeff] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-13 h-13 rounded-full object-cover ring-2 ring-[#064e3b] shadow-xs"
              />
              <div>
                <span className="text-xs font-bold text-[#0d1c2e] block leading-tight">
                  {name || user.name}
                </span>
                <span className="text-[11px] text-[#707974]">
                  {levelTitle || user.levelTitle}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPhotoModal();
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#064e3b] text-[#064e3b] text-xs font-bold hover:bg-[#b0f0d6]/20 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
              <span>{t.changePhotoBtn}</span>
            </button>
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.displayNameLabel} <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'id' ? 'Contoh: Ahmad, Sarah, Sahabat Istiqomah' : 'e.g., Alex, Sarah, Cadence Seeker'}
              className="w-full h-10 px-3 rounded-lg border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
            <span className="text-[10px] text-[#707974] mt-0.5 block">
              {language === 'id'
                ? 'Nama ini akan tampil di salam utama dan dashboard harian Anda.'
                : 'This name appears in your greetings and dashboard header.'}
            </span>
          </div>

          {/* Role / Title Field */}
          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.titleRoleLabel}
            </label>
            <input
              type="text"
              value={levelTitle}
              onChange={(e) => setLevelTitle(e.target.value)}
              placeholder="Contoh: Praktisi Istiqomah"
              className="w-full h-10 px-3 rounded-lg border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
            {/* Quick role suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {ROLE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setLevelTitle(preset)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                    levelTitle === preset
                      ? 'bg-[#064e3b] text-white border-[#064e3b]'
                      : 'bg-[#eff4ff] text-[#404944] border-[#dce9ff] hover:bg-[#dce9ff]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Bio / Vision */}
          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {t.bioLabel}
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={language === 'id' ? 'Tuliskan visi atau fokus hidup Anda saat ini...' : 'Describe your current life vision or focus...'}
              className="w-full p-2.5 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          {/* Quote & Principle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#404944] mb-1">
                {t.quoteLabel}
              </label>
              <textarea
                rows={2}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Kata mutiara atau prinsip penyemangat..."
                className="w-full p-2.5 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
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
                placeholder="Prinsip Ritme Harian"
                className="w-full h-9 px-3 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#404944] mb-1">
                {t.tilawahTargetLabel}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={tilawahTarget}
                onChange={(e) => setTilawahTarget(Number(e.target.value))}
                className="w-full h-9 px-3 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>
          </div>

          {/* Time Cadence Targets */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#f8f9ff] border border-[#eff4ff]">
            <div>
              <label className="block text-[11px] font-semibold text-[#404944] mb-1">
                {t.wakeUpLabel}
              </label>
              <input
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#404944] mb-1">
                {t.sleepLabel}
              </label>
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] bg-white focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
            </div>
          </div>

          {/* Reset Helper */}
          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToGeneral}
              className="text-[11px] text-[#707974] hover:text-[#064e3b] font-medium flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[13px]">restart_alt</span>
              <span>{t.generalProfileReset}</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eff4ff]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707974] hover:bg-[#eff4ff]"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#064e3b] text-white hover:bg-[#003527] transition-all flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>{t.saveProfileBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
