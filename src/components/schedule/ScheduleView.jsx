import React, { useState } from 'react';
import ScheduleListView from './ScheduleListView';
import KanbanBoard from './KanbanBoard';

export default function ScheduleView() {
  // 'board' matches latest Figma screenshot (Board List / Task Preview Board) by default!
  const [activeSubView, setActiveSubView] = useState('board');

  if (activeSubView === 'list') {
    return (
      <ScheduleListView
        onSwitchToTaskPreview={() => setActiveSubView('board')}
      />
    );
  }

  return (
    <KanbanBoard
      onSwitchToScheduleList={() => setActiveSubView('list')}
    />
  );
}
