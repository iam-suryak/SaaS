import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
  CheckCircle2,
  List,
  Kanban
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import CreateEventModal from '../calendar/CreateEventModal';
import james3Img from '../../Images/James 3.png';
import james2Img from '../../Images/James 2.png';
import arroraImg from '../../Images/Arrora.png';

export default function ScheduleListView({ onSwitchToTaskPreview }) {
  const { isAddEventOpen, setIsAddEventOpen } = useDashboard();

  // Search people
  const [searchPeople, setSearchPeople] = useState('');
  const [selectedMiniDate, setSelectedMiniDate] = useState(3);
  const [selectAll, setSelectAll] = useState(false);

  // Initial Schedule list items matching Image 6
  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      date: '12 Dec, 2021',
      time: '10.15AM',
      location: 'Office Meeting',
      checked: false
    },
    {
      id: 2,
      date: '10 Dec, 2021',
      time: '11.20AM',
      location: 'Home',
      checked: false
    },
    {
      id: 3,
      date: '09 Dec, 2021',
      time: '11.45AM',
      location: 'Friends Zone',
      checked: false
    },
    {
      id: 4,
      date: '08 Dec, 2021',
      time: '12.15PM',
      location: 'Office Meeting',
      checked: false
    },
    {
      id: 5,
      date: '07 Dec, 2021',
      time: '01.20PM',
      location: 'Home',
      checked: false
    },
    {
      id: 6,
      date: '05 Dec, 2021',
      time: '10.15AM',
      location: 'Meeting Outside',
      checked: false
    },
    {
      id: 7,
      date: '04 Dec, 2021',
      time: '11.15AM',
      location: 'Office Meeting',
      checked: false
    },
    {
      id: 8,
      date: '04 Dec, 2021',
      time: '01.25PM',
      location: 'Home',
      checked: false
    },
    {
      id: 9,
      date: '02 Dec, 2021',
      time: '10.15AM',
      location: 'Friends',
      checked: false
    },
    {
      id: 10,
      date: '01 Dec, 2021',
      time: '04.30PM',
      location: 'Meeting Outside',
      checked: false
    }
  ]);

  // People List matching designs
  const people = [
    {
      id: 1,
      name: 'Eddie Lobanovskiy',
      email: 'lobanovskiy@gmail.com',
      avatar: james3Img
    },
    {
      id: 2,
      name: 'Alexey Stave',
      email: 'alexeyst@gmail.com',
      avatar: james2Img
    },
    {
      id: 3,
      name: 'Anton Tkacheve',
      email: 'tkacheveanton@gmail.com',
      avatar: arroraImg
    }
  ];

  const filteredPeople = people.filter(
    p => p.name.toLowerCase().includes(searchPeople.toLowerCase()) ||
         p.email.toLowerCase().includes(searchPeople.toLowerCase())
  );

  // Toggle select all
  const handleSelectAll = () => {
    const nextVal = !selectAll;
    setSelectAll(nextVal);
    setScheduleItems(prev => prev.map(item => ({ ...item, checked: nextVal })));
  };

  // Toggle individual item
  const handleToggleItem = (id) => {
    setScheduleItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Delete item
  const handleDeleteItem = (id) => {
    setScheduleItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header: Schedule List Title, View Switcher, and + Add New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">
            Schedule List
          </h1>

          {onSwitchToTaskPreview && (
            <button
              onClick={onSwitchToTaskPreview}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-[#F0F2F8] shadow-soft-sm transition-all"
            >
              <Kanban size={14} className="text-[#4379EE]" />
              <span>Task Preview</span>
            </button>
          )}
        </div>

        {/* + Add New Button at top right */}
        <button
          onClick={() => setIsAddEventOpen(true)}
          className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.98] text-white text-xs font-bold shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add New</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sub-Panel matching design */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* + Create Schedule Button */}
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.98] text-white text-sm font-bold shadow-soft flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Create Schedule</span>
          </button>

          {/* Mini Calendar Widget */}
          <div className="bg-white rounded-3xl p-5 shadow-soft border border-[#F4F7FE] space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#1E293B]">
              <span>December 2, 2021</span>
              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-1 hover:text-[#1E293B] hover:bg-slate-50 rounded">
                  <ChevronLeft size={15} />
                </button>
                <button className="p-1 hover:text-[#1E293B] hover:bg-slate-50 rounded">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Days letters */}
            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">
              <span>S</span>
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-7 text-center text-xs gap-y-2 text-slate-600 font-medium">
              <span className="text-slate-300">29</span>
              <span className="text-slate-300">30</span>
              <span>1</span>
              <span>2</span>
              <button
                onClick={() => setSelectedMiniDate(3)}
                className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedMiniDate === 3
                    ? 'bg-[#4379EE] text-white shadow-soft-sm'
                    : 'hover:bg-slate-100'
                }`}
              >
                3
              </button>
              <span>4</span>
              <span>5</span>

              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>

              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
              <span>18</span>
              <span>19</span>

              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
              <span>25</span>
              <span>26</span>

              <span>27</span>
              <span>28</span>
              <span>29</span>
              <span>30</span>
              <span>31</span>
              <span className="text-slate-300">1</span>
              <span className="text-slate-300">2</span>
            </div>
          </div>

          {/* People Section */}
          <div className="bg-white rounded-3xl p-5 shadow-soft border border-[#F4F7FE] space-y-4">
            <h3 className="text-sm font-bold text-[#1E293B]">People</h3>

            {/* Search for People */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for People"
                value={searchPeople}
                onChange={(e) => setSearchPeople(e.target.value)}
                className="w-full pl-3 pr-9 py-2.5 bg-[#F8F9FD] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-xl text-xs text-slate-700 placeholder:text-slate-400 outline-none transition-colors"
              />
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* People List */}
            <div className="space-y-3.5 pt-1">
              {filteredPeople.map((person) => (
                <div key={person.id} className="flex items-center gap-3 group">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-[#1E293B] truncate group-hover:text-[#4379EE] transition-colors">
                      {person.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate">
                      {person.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Schedule Button */}
          <button className="w-full py-3 px-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#4379EE] hover:bg-blue-50/20 text-[#4379EE] text-xs font-bold shadow-soft-sm transition-all text-center">
            My Schedule
          </button>
        </div>

        {/* Right Schedule Items List */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-3">
          {/* Header Row */}
          <div className="px-5 py-2 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleSelectAll}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  selectAll
                    ? 'bg-[#4379EE] border-[#4379EE] text-white'
                    : 'border-slate-300 hover:border-slate-400 bg-white'
                }`}
              >
                {selectAll && <Check size={13} strokeWidth={3} />}
              </button>
              <span className="cursor-pointer hover:text-slate-800">
                Date <span className="text-[10px]">▾</span>
              </span>
            </div>

            <div className="flex items-center gap-16 sm:gap-24 md:gap-32 pr-20">
              <span className="cursor-pointer hover:text-slate-800">
                Time <span className="text-[10px]">▾</span>
              </span>
              <span className="cursor-pointer hover:text-slate-800">
                Location <span className="text-[10px]">▾</span>
              </span>
            </div>
          </div>

          {/* Schedule Item Rows */}
          {scheduleItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl px-5 py-4 shadow-soft border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-soft-md ${
                item.checked ? 'border-[#4379EE] bg-blue-50/10' : 'border-[#F4F7FE]'
              }`}
            >
              {/* Left: Checkbox & Date */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleToggleItem(item.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                    item.checked
                      ? 'bg-[#4379EE] border-[#4379EE] text-white'
                      : 'border-slate-300 hover:border-slate-400 bg-white'
                  }`}
                >
                  {item.checked && <Check size={13} strokeWidth={3} />}
                </button>

                <div className="flex items-center gap-2.5 font-bold text-xs sm:text-sm text-slate-800">
                  <CalendarIcon size={16} className="text-[#4379EE] shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Middle: Time & Location */}
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 md:gap-14 flex-1 pl-0 sm:pl-6">
                {/* Time */}
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-800">
                  <Clock size={16} className="text-slate-700 shrink-0" />
                  <span>{item.time}</span>
                </div>

                {/* Location Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBF0FF] text-[#4379EE] text-xs font-semibold">
                  <MapPin size={14} className="shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  className="w-7 h-7 rounded-full bg-[#FFF8E7] text-[#FF9F43] hover:bg-[#ffeed0] flex items-center justify-center transition-colors"
                  title="Edit schedule"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="w-7 h-7 rounded-full bg-[#FEECEB] text-[#EA5455] hover:bg-[#ffd9d6] flex items-center justify-center transition-colors"
                  title="Delete schedule"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      {isAddEventOpen && (
        <CreateEventModal onClose={() => setIsAddEventOpen(false)} />
      )}
    </div>
  );
}
