import React, { createContext, useContext, useState } from 'react';
import {
  initialKpis,
  reportsChartData,
  analyticsData,
  initialOrders,
  initialTopProducts,
  initialInvoices,
  initialTasks,
  initialChats,
  initialCustomers,
  initialEvents,
  initialTopSellingTable
} from '../data/mockData';
import avatarImg from '../Images/avatar.png';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [kpis, setKpis] = useState(initialKpis);
  const [orders, setOrders] = useState(initialOrders);
  const [topProducts, setTopProducts] = useState(initialTopProducts);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [tasks, setTasks] = useState(initialTasks);
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [customers, setCustomers] = useState(initialCustomers);
  const [events, setEvents] = useState(initialEvents);
  const [dateRange, setDateRange] = useState({ from: '10-06-2021', to: '10-10-2021' });
  const [analyticsTab, setAnalyticsTab] = useState('product'); // 'product' | 'customer'
  const [topSellingProducts, setTopSellingProducts] = useState(initialTopSellingTable);
  
  // Modals
  const [authModal, setAuthModal] = useState(null); // 'login' | 'signup' | 'recover' | 'confirm' | null
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // User
  const [currentUser, setCurrentUser] = useState({
    name: 'Easin Arafat',
    email: 'easin.arafat@base.design',
    plan: 'Free Account',
    avatar: avatarImg
  });

  // Invoice Handlers
  const addInvoice = (newInv) => {
    setInvoices(prev => [
      {
        id: `inv-${Date.now()}`,
        invoiceId: `#${Math.floor(100000 + Math.random() * 900000)}`,
        starred: false,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        ...newInv
      },
      ...prev
    ]);
  };

  const toggleInvoiceStar = (id) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, starred: !inv.starred } : inv));
  };

  const deleteInvoices = (ids) => {
    setInvoices(prev => prev.filter(inv => !ids.includes(inv.id)));
  };

  // Task Handlers
  const addTask = (newTask) => {
    setTasks(prev => [
      {
        id: `task-${Date.now()}`,
        comments: 0,
        likes: '0',
        completed: false,
        assignees: [currentUser.avatar],
        ...newTask
      },
      ...prev
    ]);
  };

  const moveTask = (taskId, newColumn) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: newColumn } : t));
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Chat Handlers
  const sendMessage = (chatId, text) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastTime: timeStr,
          messages: [
            ...c.messages,
            { id: `m-${Date.now()}`, sender: 'me', text, time: timeStr }
          ]
        };
      }
      return c;
    }));
  };

  // Event Handlers
  const addEvent = (newEvent) => {
    setEvents(prev => [...prev, { id: `ev-${Date.now()}`, attendees: 1, ...newEvent }]);
  };

  // Customer Handlers
  const addCustomer = (newCust) => {
    const newId = `cust-${Date.now()}`;
    const created = {
      id: newId,
      name: `${newCust.firstName || ''} ${newCust.lastName || ''}`.trim() || newCust.name || 'New Customer',
      firstName: newCust.firstName || '',
      lastName: newCust.lastName || '',
      email: newCust.email || '',
      phone: newCust.phone || '+33757005467',
      gender: newCust.gender || 'Male',
      role: newCust.role || 'Client Member',
      address: newCust.address || '742 / Evergreen Terrace',
      company: newCust.company || 'Enterprise Corp',
      ordersCount: 0,
      totalSpent: '$0',
      status: 'Active',
      avatar: newCust.avatar || (newCust.gender === 'Female' ? initialCustomers[1].avatar : initialCustomers[0].avatar),
      performance: {
        months: [
          { label: 'Jan', value: 35 },
          { label: 'Feb', value: 75, isPeak: true, peakBadge: 'Feb 1.85k' },
          { label: 'Mar', value: 50 },
          { label: 'Apr', value: 40 },
          { label: 'May', value: 65 },
          { label: 'Jun', value: 55 }
        ],
        gauge1: 70,
        gauge2: 60
      },
      ...newCust
    };
    setCustomers(prev => [created, ...prev]);
    return created;
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const updateCustomer = (id, updatedFields) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        const merged = { ...c, ...updatedFields };
        if (updatedFields.firstName || updatedFields.lastName) {
          merged.name = `${merged.firstName || ''} ${merged.lastName || ''}`.trim();
        }
        return merged;
      }
      return c;
    }));
  };

  const addProduct = (newProd) => {
    setTopSellingProducts(prev => [
      {
        id: `tsp-${Date.now()}`,
        sn: prev.length + 1,
        isMedal: false,
        price: newProd.price || '$12',
        totalOrder: newProd.totalOrder || '10,000 Piece',
        totalSales: newProd.totalSales || '$1,20,000',
        ...newProd
      },
      ...prev
    ]);
  };

  const upgradeToPro = () => {
    setCurrentUser(prev => ({ ...prev, plan: 'Pro Account' }));
    setIsUpgradeModalOpen(false);
  };

  return (
    <DashboardContext.Provider value={{
      currentView,
      setCurrentView,
      sidebarExpanded,
      setSidebarExpanded,
      kpis,
      reportsChartData,
      analyticsData,
      orders,
      topProducts,
      invoices,
      tasks,
      chats,
      activeChatId,
      setActiveChatId,
      customers,
      events,
      dateRange,
      setDateRange,
      authModal,
      setAuthModal,
      isAddInvoiceOpen,
      setIsAddInvoiceOpen,
      isAddTaskOpen,
      setIsAddTaskOpen,
      isAddEventOpen,
      setIsAddEventOpen,
      isAddCustomerOpen,
      setIsAddCustomerOpen,
      isAddProductOpen,
      setIsAddProductOpen,
      analyticsTab,
      setAnalyticsTab,
      topSellingProducts,
      setTopSellingProducts,
      addProduct,
      isUpgradeModalOpen,
      setIsUpgradeModalOpen,
      currentUser,
      setCurrentUser,
      addInvoice,
      toggleInvoiceStar,
      deleteInvoices,
      addTask,
      moveTask,
      toggleTaskComplete,
      sendMessage,
      addEvent,
      addCustomer,
      deleteCustomer,
      updateCustomer,
      upgradeToPro
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
