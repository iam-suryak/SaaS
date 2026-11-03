import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Layout from './components/layout/Layout';
import DashboardView from './components/dashboard/DashboardView';
import AnalyticsDeepDive from './components/analytics/AnalyticsDeepDive';
import InvoiceList from './components/invoices/InvoiceList';
import KanbanBoard from './components/schedule/KanbanBoard';
import ScheduleView from './components/schedule/ScheduleView';
import CalendarView from './components/calendar/CalendarView';
import ChatView from './components/messages/ChatView';
import NotificationCenter from './components/notifications/NotificationCenter';
import SettingsView from './components/settings/SettingsView';
import CustomerList from './components/customers/CustomerList';
import ProductAnalytics from './components/products/ProductAnalytics';
import AuthModals from './components/auth/AuthModals';
import AuthPages from './components/auth/AuthPages';
import UpgradeModal from './components/common/UpgradeModal';

function MainContent() {
  const { currentView, analyticsTab } = useDashboard();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'analytics':
        return analyticsTab === 'customer' ? <CustomerList /> : <ProductAnalytics />;
      case 'customers':
        return <CustomerList />;
      case 'products':
        return <ProductAnalytics />;
      case 'invoice':
        return <InvoiceList />;
      case 'schedule':
        return <ScheduleView />;
      case 'calendar':
        return <CalendarView />;
      case 'messages':
        return <ChatView />;
      case 'notification':
        return <NotificationCenter />;
      case 'settings':
        return <SettingsView />;
      case 'login':
        return <AuthPages initialView="login" />;
      case 'signup':
        return <AuthPages initialView="signup" />;
      case 'recover':
        return <AuthPages initialView="recover" />;
      case 'confirm':
        return <AuthPages initialView="confirm" />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <Layout>
      {renderView()}
      <AuthModals />
      <UpgradeModal />
    </Layout>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <MainContent />
    </DashboardProvider>
  );
}
