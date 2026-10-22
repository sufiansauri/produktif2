import React, { useState, useRef } from 'react';
import { useRhythm } from '../context/RhythmContext';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AVATARS = [
  {
    id: 'default',
    name: 'Praktisi Istiqomah (Bawaan)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'scholar',
    name: 'Penuntut Ilmu',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'creator',
    name: 'Tech & Digital Creator',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'nature',
    name: 'Pencinta Alam & Kebugaran',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'professional',
    name: 'Profesional & Eksekutif',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'leader',
    name: 'Pemimpin & Pengusaha',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
  },
];

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({ isOpen, onClose }) => {
  const { user, setProfilePhoto, t, language } = useRhythm();
  const [selectedPhoto, setSelectedPhoto] = useState(user.avatarUrl);
  const [customUrl, setCustomUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'id' ? 'Ukuran foto maksimal 5MB' : 'Max photo size is 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customUrl.trim()) {
      setSelectedPhoto(customUrl.trim());
      setCustomUrl('');
    }
  };

  const handleSave = () => {
    setProfilePhoto(selectedPhoto);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#e6eeff] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#064e3b] text-[22px]">
              account_circle
            </span>
            <div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e] block leading-tight">
                {t.photoModalTitle}
              </span>
              <span className="text-[11px] text-[#707974]">{t.photoModalSubtitle}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#707974] hover:bg-[#e6eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 max-h-[75vh] overflow-y-auto no-scrollbar">
          {/* Current Avatar Preview */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#f8f9ff] border border-[#eff4ff]">
            <span className="text-xs font-semibold text-[#404944] mb-2">{t.previewLabel}</span>
            <div className="relative">
              <img
                src={selectedPhoto}
                alt="Selected Avatar"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#b0f0d6] shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_AVATARS[0].url;
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#064e3b] text-white flex items-center justify-center shadow-md hover:bg-[#003527] transition-all"
                title={t.uploadPhoto}
              >
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
              </button>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0d1c2e] mt-2">
              {user.name}
            </span>
          </div>

          {/* Upload Button from Device */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-[#064e3b] bg-[#eff4ff] text-[#064e3b] font-['Inter'] text-xs font-bold hover:bg-[#dce9ff] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
              <span>{t.uploadPhoto}</span>
            </button>
          </div>

          {/* Preset Avatars Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#404944]">{t.chooseAvatar}</span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_AVATARS.map((preset) => {
                const isSelected = selectedPhoto === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    title={preset.name}
                    onClick={() => setSelectedPhoto(preset.url)}
                    className={`relative p-1 rounded-xl transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'ring-2 ring-[#064e3b] bg-[#b0f0d6]/30'
                        : 'hover:bg-[#eff4ff]'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom URL input */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#eff4ff]">
            <span className="text-xs font-semibold text-[#404944]">{t.photoUrlInput}</span>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 h-9 px-3 rounded-lg border border-[#e6eeff] text-xs text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
              />
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                className="px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#064e3b] text-xs font-bold hover:bg-[#dce9ff]"
              >
                {language === 'id' ? 'Gunakan' : 'Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eff4ff] bg-[#f8f9ff] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSelectedPhoto(PRESET_AVATARS[0].url)}
            className="text-xs text-[#707974] hover:text-[#ba1a1a] font-medium"
          >
            {t.removePhoto}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#707974] hover:bg-[#eff4ff]"
            >
              {t.cancelBtn}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#064e3b] text-white hover:bg-[#003527] transition-all"
            >
              {t.applyPhotoBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
