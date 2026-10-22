import React, { useState, useEffect } from 'react';
import { useRhythm } from '../context/RhythmContext';
import { RhythmBlock } from '../types';

interface BlockDetailModalProps {
  block: RhythmBlock | null;
  onClose: () => void;
}

export const BlockDetailModal: React.FC<BlockDetailModalProps> = ({ block, onClose }) => {
  const { updateRhythmBlock, t, language } = useRhythm();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [status, setStatus] = useState<RhythmBlock['status']>('Upcoming');

  useEffect(() => {
    if (block) {
      setTitle(block.title);
      setSubtitle(block.subtitle);
      setTimeRange(block.timeRange);
      setStatus(block.status);
    }
  }, [block]);

  if (!block) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateRhythmBlock(block.id, {
      title,
      subtitle,
      timeRange,
      status,
    });
    onClose();
  };

  const getStatusLabel = (s: RhythmBlock['status']) => {
    if (language === 'id') {
      switch (s) {
        case 'Completed': return 'Selesai';
        case 'In Progress': return 'Sedang Berjalan';
        case 'Upcoming': return 'Mendatang';
        case 'Planned': return 'Terencana';
      }
    }
    return s;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1c2e]/40 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#e6eeff] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-4 border-b border-[#eff4ff] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#064e3b] text-[20px]">
              schedule
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0d1c2e]">
              {language === 'id' ? 'Blok Ritme Waktu' : 'Rhythm Block'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#707974] hover:bg-[#e6eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {language === 'id' ? 'Rentang Waktu (contoh: 07:30 - 14:00)' : 'Time Range (e.g. 07:30 - 14:00)'}
            </label>
            <input
              type="text"
              required
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {language === 'id' ? 'Judul Blok Kegiatan' : 'Block Title'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {language === 'id' ? 'Keterangan Tugas / Fokus' : 'Description / Duty'}
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-[#e6eeff] text-sm text-[#0d1c2e] focus:outline-none focus:ring-2 focus:ring-[#064e3b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#404944] mb-1">
              {language === 'id' ? 'Status Pelaksanaan' : 'Current Cadence Status'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Completed', 'In Progress', 'Upcoming', 'Planned'] as RhythmBlock['status'][]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      status === s
                        ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-xs'
                        : 'bg-white border-[#e6eeff] text-[#404944] hover:bg-[#eff4ff]'
                    }`}
                  >
                    {getStatusLabel(s)}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#eff4ff]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#707974] hover:bg-[#eff4ff]"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#064e3b] text-white hover:bg-[#003527] transition-all"
            >
              {language === 'id' ? 'Perbarui Blok' : 'Update Block'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
