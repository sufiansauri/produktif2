import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-[#233144] text-[#eaf1ff] font-['Inter'] text-xs font-semibold shadow-xl z-50 transition-all flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150 border border-white/10">
      <span className="material-symbols-outlined text-[16px] text-[#89f5e7]">
        bolt
      </span>
      <span>{message}</span>
    </div>
  );
};
