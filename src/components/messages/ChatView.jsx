import React, { useState } from 'react';
import {
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

// Import images for chat attachments and contacts
import reviewDashboardUi from '../../Images/schedule/review-dashboard-ui.png';
import doneDashboardUi from '../../Images/schedule/done-dashboard-ui.png';

import robertImg from '../../Images/Robert.png';
import jamesImg from '../../Images/james.png';
import james2Img from '../../Images/James 2.png';
import james3Img from '../../Images/James 3.png';
import jhonImg from '../../Images/jhon.png';
import bethanyImg from '../../Images/Bethany.png';
import arroraImg from '../../Images/Arrora.png';

export default function ChatView() {
  const [activeTab, setActiveTab] = useState('Personal'); // 'All' | 'Personal' | 'Teams'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContactId, setActiveContactId] = useState('c-3'); // John Carilo active by default matching Image 5
  const [inputText, setInputText] = useState('');

  // Contacts list matching Image 5
  const contacts = [
    {
      id: 'c-1',
      name: 'Shelby Goode',
      avatar: jamesImg,
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
      time: '1 min ago',
      online: true
    },
    {
      id: 'c-2',
      name: 'Robert Bacins',
      avatar: robertImg,
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
      time: '9 min ago',
      online: true
    },
    {
      id: 'c-3',
      name: 'John Carilo',
      avatar: james2Img,
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
      time: '15 min ago',
      online: true
    },
    {
      id: 'c-4',
      name: 'Adriene Watson',
      avatar: arroraImg,
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
      time: '21 min ago',
      online: true
    },
    {
      id: 'c-5',
      name: 'Jhon Deo',
      avatar: jhonImg,
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
      time: '29 min ago',
      online: false
    },
    {
      id: 'c-6',
      name: 'Mark Ruffalo',
      avatar: james3Img,
      lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
      time: '45 min ago',
      online: true
    },
    {
      id: 'c-7',
      name: 'Bethany Jackson',
      avatar: bethanyImg,
      lastMessage: 'Lorem Ipsum is simply dummy text',
      time: '1h ago',
      online: false
    }
  ];

  // Messages in active conversation matching Image 5
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'them',
      text: 'Lorem Ipsum is simply',
      hasAvatar: false
    },
    {
      id: 'm-2',
      sender: 'them',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '09:02 PM',
      hasAvatar: true
    },
    {
      id: 'm-3',
      sender: 'them',
      isAttachment: true,
      hasAvatar: false
    },
    {
      id: 'm-4',
      sender: 'them',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      time: '09:04 PM',
      hasAvatar: true
    }
  ]);

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[2];

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: 'me',
        text: inputText.trim(),
        time: timeStr
      }
    ]);
    setInputText('');
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-[#F4F7FE] overflow-hidden min-h-[720px] grid grid-cols-1 lg:grid-cols-12 animate-fade-in">
      {/* Left Column: Messages List (4 cols) */}
      <div className="lg:col-span-4 border-r border-[#F0F2F8] flex flex-col justify-between">
        <div>
          {/* Header: Title & Circular Blue Plus Button */}
          <div className="p-6 pb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1E293B] tracking-tight">
              Message
            </h2>
            <button
              className="w-8 h-8 rounded-full bg-[#546FFF] hover:bg-[#435EEB] active:scale-95 text-white flex items-center justify-center shadow-soft transition-all"
              title="New Message"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Search Box */}
          <div className="px-6 mb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F9FD] rounded-xl border border-transparent focus:border-[#546FFF] focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Tabs: All, Personal, Teams */}
          <div className="flex items-center px-6 border-b border-[#F0F2F8] gap-8 text-xs font-semibold text-slate-400 select-none">
            {['All', 'Personal', 'Teams'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 relative transition-colors ${
                  activeTab === tab
                    ? 'text-[#546FFF] font-bold'
                    : 'hover:text-slate-700'
                }`}
              >
                <span>{tab}</span>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#546FFF] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div className="divide-y divide-[#F8F9FD] overflow-y-auto max-h-[540px]">
            {filteredContacts.map((contact) => {
              const isActive = contact.id === activeContactId;
              return (
                <div
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  className={`p-4 sm:px-6 flex items-center gap-3.5 cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#F4F7FF]'
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  {/* Avatar with Online Dot */}
                  <div className="relative shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    />
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  {/* Name, Snippet & Time */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E293B] truncate">
                        {contact.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {contact.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate leading-tight">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Active Conversation (8 cols) */}
      <div className="lg:col-span-8 flex flex-col justify-between bg-[#FCFCFD]">
        {/* Top Header Bar */}
        <div className="p-4 px-6 border-b border-[#F0F2F8] bg-white flex items-center justify-between">
          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1E293B]">
                {activeContact.name}
              </h3>
              <p className="text-[11px] text-slate-400">Online</p>
            </div>
          </div>

          {/* Action Buttons: Phone, Video, More */}
          <div className="flex items-center gap-2 text-slate-500">
            <button
              className="w-9 h-9 rounded-full bg-white border border-[#E9EFF8] hover:text-[#546FFF] hover:border-[#546FFF] flex items-center justify-center transition-all shadow-soft-sm"
              title="Voice Call"
            >
              <Phone size={15} />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-white border border-[#E9EFF8] hover:text-[#546FFF] hover:border-[#546FFF] flex items-center justify-center transition-all shadow-soft-sm"
              title="Video Call"
            >
              <Video size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-full bg-white border border-[#E9EFF8] hover:text-[#546FFF] hover:border-[#546FFF] flex items-center justify-center transition-all shadow-soft-sm"
              title="More Options"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Messages Feed matching Image 5 */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Bubble 1: Incoming */}
          <div className="flex items-start gap-3">
            <div className="w-8 shrink-0"></div>
            <div className="bg-[#546FFF] text-white px-5 py-3 rounded-2xl rounded-tl-sm text-xs sm:text-sm font-medium shadow-soft-sm max-w-lg">
              Lorem Ipsum is simply
            </div>
          </div>

          {/* Bubble 2: Incoming with avatar, time and three dots */}
          <div className="flex items-end gap-3 group">
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-white mb-1"
            />
            <div className="bg-[#546FFF] text-white px-5 py-3.5 rounded-2xl rounded-bl-sm text-xs sm:text-sm font-medium shadow-soft-sm max-w-xl relative">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <span className="block text-right text-[10px] text-white/70 pt-1 font-normal">
                09:02 PM
              </span>
            </div>
            <button className="text-slate-300 hover:text-slate-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Bubble 3: Attached Image Previews matching Image 5 */}
          <div className="flex items-center gap-3 pl-11 group">
            <button className="text-slate-300 hover:text-slate-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {/* Left attached card: Stories UI Preview */}
              <div className="rounded-2xl overflow-hidden bg-white border border-[#E9EFF8] shadow-soft-sm hover:shadow-soft transition-all">
                <img
                  src={reviewDashboardUi}
                  alt="Attached stories UI"
                  className="w-full h-36 object-cover object-top"
                />
              </div>

              {/* Right attached card: Analytics Dashboard Preview */}
              <div className="rounded-2xl overflow-hidden bg-white border border-[#E9EFF8] shadow-soft-sm hover:shadow-soft transition-all">
                <img
                  src={doneDashboardUi}
                  alt="Attached analytics UI"
                  className="w-full h-36 object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Bubble 4: Incoming with avatar, time and three dots */}
          <div className="flex items-end gap-3 group">
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-2 ring-white mb-1"
            />
            <div className="bg-[#546FFF] text-white px-5 py-3.5 rounded-2xl rounded-bl-sm text-xs sm:text-sm font-medium shadow-soft-sm max-w-xl relative">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <span className="block text-right text-[10px] text-white/70 pt-1 font-normal">
                09:04 PM
              </span>
            </div>
            <button className="text-slate-300 hover:text-slate-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Dynamic User Sent Messages */}
          {messages.slice(4).map((msg) => (
            <div key={msg.id} className="flex justify-end gap-3">
              <div className="bg-slate-100 text-slate-800 px-5 py-3 rounded-2xl rounded-br-sm text-xs sm:text-sm font-medium shadow-soft-sm max-w-md">
                <p>{msg.text}</p>
                {msg.time && (
                  <span className="block text-right text-[10px] text-slate-400 pt-1">
                    {msg.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Input Bar matching Image 5 */}
        <div className="p-4 px-6 bg-white border-t border-[#F0F2F8]">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 bg-[#F8F9FD] rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-[#546FFF] focus-within:bg-white transition-all shadow-soft-sm"
          >
            {/* Attachment paperclip */}
            <button
              type="button"
              className="text-slate-400 hover:text-[#546FFF] p-1 transition-colors"
              title="Attach File"
            >
              <Paperclip size={18} />
            </button>

            {/* Input */}
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none"
            />

            {/* Emoji Smile */}
            <button
              type="button"
              className="text-slate-400 hover:text-amber-500 p-1 transition-colors"
              title="Insert Emoji"
            >
              <Smile size={18} />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              className="text-[#546FFF] hover:text-[#435EEB] p-1 transition-colors active:scale-95"
              title="Send Message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
