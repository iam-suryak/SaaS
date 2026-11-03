import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import AuthPages from './AuthPages';

export default function AuthModals() {
  const { authModal, setAuthModal } = useDashboard();

  if (!authModal) return null;

  return (
    <AuthPages
      initialView={authModal}
      onClose={() => setAuthModal(null)}
    />
  );
}
