/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RhythmProvider, useRhythm } from './context/RhythmContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewView } from './components/OverviewView';
import { ChecklistView } from './components/ChecklistView';
import { ScheduleView } from './components/ScheduleView';
import { ProgressView } from './components/ProgressView';
import { SettingsView } from './components/SettingsView';
import { QuickLogModal } from './components/QuickLogModal';
import { NotificationModal } from './components/NotificationModal';
import { HabitDetailModal } from './components/HabitDetailModal';
import { BlockDetailModal } from './components/BlockDetailModal';
import { ProfilePhotoModal } from './components/ProfilePhotoModal';
import { Toast } from './components/Toast';
import { Habit, RhythmBlock } from './types';

function RhythmApp() {
  const { activeTab, setActiveTab, toastMessage } = useRhythm();

  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<RhythmBlock | null>(null);

  return (
    <div className="bg-[#f8f9ff] font-['Inter'] text-[#0d1c2e] flex flex-col min-h-screen selection:bg-[#b0f0d6] selection:text-[#003527]">
      {/* Fixed Header with direct photo edit trigger and language switch */}
      <Header
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('settings')}
        onOpenPhotoModal={() => setPhotoModalOpen(true)}
      />

      {/* Main Content View with desktop centering and mobile padding */}
      <main className="flex flex-col relative w-full max-w-2xl mx-auto pt-16 pb-24 min-h-screen">
        {activeTab === 'overview' && (
          <OverviewView
            onOpenQuickLog={() => setQuickLogOpen(true)}
            onSelectHabit={(habit) => setSelectedHabit(habit)}
            onSelectBlock={(block) => setSelectedBlock(block)}
          />
        )}

        {activeTab === 'checklist' && (
          <ChecklistView
            onSelectHabit={(habit) => setSelectedHabit(habit)}
            onAddNewHabit={() => setQuickLogOpen(true)}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            onSelectBlock={(block) => setSelectedBlock(block)}
            onAddNewBlock={() =>
              setSelectedBlock({
                id: `block-${Date.now()}`,
                timeRange: '14:30 - 15:45',
                startTime: '14:30',
                endTime: '15:45',
                title: 'Deep Cadence Session',
                subtitle: 'Targeted focused output',
                status: 'Planned',
                icon: 'schedule',
              })
            }
          />
        )}

        {activeTab === 'progress' && <ProgressView />}

        {activeTab === 'settings' && (
          <SettingsView onOpenPhotoModal={() => setPhotoModalOpen(true)} />
        )}
      </main>

      {/* Bottom Floating Navigation */}
      <BottomNav />

      {/* Interactive Modals */}
      <QuickLogModal isOpen={quickLogOpen} onClose={() => setQuickLogOpen(false)} />
      <NotificationModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <ProfilePhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
      />
      <HabitDetailModal habit={selectedHabit} onClose={() => setSelectedHabit(null)} />
      <BlockDetailModal block={selectedBlock} onClose={() => setSelectedBlock(null)} />

      {/* Ambient Toast feedback */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default function App() {
  return (
    <RhythmProvider>
      <RhythmApp />
    </RhythmProvider>
  );
}
