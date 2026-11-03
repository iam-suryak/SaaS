import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Check,
  User,
  Users
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import CreateEventModal from './CreateEventModal';
import james3Img from '../../Images/James 3.png';
import james2Img from '../../Images/James 2.png';
import arroraImg from '../../Images/Arrora.png';

export default function CalendarView() {
  const { events, isAddEventOpen, setIsAddEventOpen } = useDashboard();
  
  // View mode matching Image 4 & Image 5: 'Month' (default in Image 4) | 'Year' (Image 5) | 'Day' | 'Week'
  const [viewMode, setViewMode] = useState('Month');
  const [searchPeople, setSearchPeople] = useState('');
  const [selectedMiniDate, setSelectedMiniDate] = useState(3);

  // People List matching Image 4 & 5
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

  // Months data for Year view matching Image 5
  const yearMonths = [
    { name: 'January 2021', daysInMonth: 31, startDayOffset: 5 },
    { name: 'February 2021', daysInMonth: 28, startDayOffset: 1 },
    { name: 'March 2021', daysInMonth: 31, startDayOffset: 1 },
    { name: 'April 2021', daysInMonth: 30, startDayOffset: 4 },
    { name: 'May 2021', daysInMonth: 31, startDayOffset: 6 },
    { name: 'Jun 2021', daysInMonth: 30, startDayOffset: 2 },
    { name: 'July 2021', daysInMonth: 31, startDayOffset: 4 },
    { name: 'August 2021', daysInMonth: 31, startDayOffset: 0 },
    { name: 'September 2021', daysInMonth: 30, startDayOffset: 3 },
    { name: 'October 2021', daysInMonth: 31, startDayOffset: 5 },
    { name: 'November 2021', daysInMonth: 30, startDayOffset: 1 },
    { name: 'December 2021', daysInMonth: 31, startDayOffset: 3, highlightDay: 2 }
  ];

  // Month grid for December 2021 matching Image 4
  const monthDays = [
    { day: '29', isCurrent: false },
    { day: '30', isCurrent: false },
    { day: '01', isCurrent: true },
    {
      day: '02',
      isCurrent: true,
      isSpecial: true,
      hasOrangeAccent: true,
      events: [
        { title: 'Free day', bg: 'bg-[#00CFDE]', text: 'text-white' },
        { title: 'Party Time', bg: 'bg-[#D946EF]', text: 'text-white' }
      ],
      hasMore: true
    },
    { day: '03', isCurrent: true },
    { day: '04', isCurrent: true },
    { day: '05', isCurrent: true },

    { day: '06', isCurrent: true },
    { day: '07', isCurrent: true },
    { day: '08', isCurrent: true },
    { day: '09', isCurrent: true },
    { day: '10', isCurrent: true },
    { day: '11', isCurrent: true },
    { day: '12', isCurrent: true },

    { day: '13', isCurrent: true },
    { day: '14', isCurrent: true },
    { day: '15', isCurrent: true },
    {
      day: '16',
      isCurrent: true,
      events: [
        { title: 'Victory day', bg: 'bg-[#FF9F43]', text: 'text-white' }
      ]
    },
    { day: '17', isCurrent: true },
    { day: '18', isCurrent: true },
    { day: '19', isCurrent: true },

    { day: '20', isCurrent: true },
    {
      day: '21',
      isCurrent: true,
      events: [
        { title: 'Invited by friends', bg: 'bg-[#D946EF]', text: 'text-white' }
      ]
    },
    { day: '22', isCurrent: true },
    { day: '23', isCurrent: true },
    { day: '24', isCurrent: true },
    {
      day: '25',
      isCurrent: true,
      events: [
        { title: 'Christmas Day', bg: 'bg-[#00CFDE]', text: 'text-white' }
      ]
    },
    { day: '26', isCurrent: true },

    { day: '27', isCurrent: true },
    { day: '28', isCurrent: true },
    { day: '29', isCurrent: true },
    { day: '30', isCurrent: true },
    { day: '31', isCurrent: true },
    { day: '01', isCurrent: false },
    { day: '02', isCurrent: false }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header: Title & View Switcher (Day, Week, Month, Year) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">
          Calendar
        </h1>

        {/* View Switcher Pills matching Image 4 & 5 */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#F0F2F8] shadow-soft-sm w-fit">
          {['Day', 'Week', 'Month', 'Year'].map((tab) => (
            <button
              key={tab}
              onClick={() => setViewMode(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === tab
                  ? 'bg-[#4379EE] text-white shadow-soft'
                  : 'text-[#8F9BBA] hover:text-[#1E293B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sub-panel: + Create Schedule, Mini Calendar, People, My Schedule */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* + Create Schedule Button */}
          <button
            onClick={() => setIsAddEventOpen(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.98] text-white text-sm font-bold shadow-soft flex items-center justify-center gap-2 transition-all"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Create Schedule</span>
          </button>

          {/* Mini Calendar Card matching design */}
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

            {/* Weekday headers */}
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

        {/* Right Calendar Area */}
        <div className="lg:col-span-8 xl:col-span-9">
          {/* MONTH VIEW: Image 4 */}
          {viewMode === 'Month' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] space-y-6">
              {/* Header Navigation */}
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-base sm:text-lg font-bold text-[#1E293B]">
                  December 2, 2021
                </h2>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <button className="p-1.5 hover:text-[#1E293B] hover:bg-slate-100 rounded-lg transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="p-1.5 hover:text-[#1E293B] hover:bg-slate-100 rounded-lg transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Month Grid Table */}
              <div className="border border-[#F0F2F8] rounded-2xl overflow-hidden">
                {/* Day of Week Headers */}
                <div className="grid grid-cols-7 text-center font-bold text-xs sm:text-sm text-slate-700 py-3.5 border-b border-[#F0F2F8] bg-[#FAFBFF]">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* 35 Calendar Cells (5 rows x 7 cols) */}
                <div className="grid grid-cols-7 divide-x divide-y divide-[#F0F2F8]">
                  {monthDays.map((item, index) => (
                    <div
                      key={index}
                      className={`min-h-[115px] sm:min-h-[130px] p-2.5 sm:p-3 transition-colors flex flex-col justify-between ${
                        !item.isCurrent
                          ? 'bg-slate-50/40 text-slate-300'
                          : 'bg-white hover:bg-blue-50/20'
                      }`}
                    >
                      {/* Cell Header: Date Number & Accent Bar */}
                      <div>
                        {item.hasOrangeAccent && (
                          <div className="w-full h-1 bg-[#FF7A00] rounded-full mb-1"></div>
                        )}
                        <span
                          className={`text-xs sm:text-sm font-bold block ${
                            item.isSpecial
                              ? 'text-[#FF7A00] text-base font-extrabold'
                              : !item.isCurrent
                              ? 'text-slate-300'
                              : 'text-slate-700'
                          }`}
                        >
                          {item.day}
                        </span>
                      </div>

                      {/* Event Badges */}
                      {item.events && (
                        <div className="space-y-1 my-auto">
                          {item.events.map((ev, evIdx) => (
                            <div
                              key={evIdx}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold text-center truncate ${ev.bg} ${ev.text} shadow-sm`}
                              title={ev.title}
                            >
                              {ev.title}
                            </div>
                          ))}
                          {item.hasMore && (
                            <div className="text-center pt-0.5">
                              <span className="text-[10px] font-bold text-[#4379EE] hover:underline cursor-pointer">
                                More
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Spacer if no events */}
                      {!item.events && <div className="h-6"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* YEAR VIEW: Image 5 */}
          {viewMode === 'Year' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE]">
              {/* 12 Months Grid: 4 rows x 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {yearMonths.map((m, mIdx) => (
                  <div key={mIdx} className="space-y-3">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                      {m.name}
                    </h3>

                    {/* Day Headers: S S M T W T F */}
                    <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400">
                      <span>S</span>
                      <span>S</span>
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                    </div>

                    {/* Mini Month Dates (5-6 rows) */}
                    <div className="grid grid-cols-7 text-center text-[11px] text-slate-600 gap-y-1.5 font-medium">
                      {/* Previous month leading days */}
                      {Array.from({ length: m.startDayOffset }).map((_, offsetIdx) => (
                        <span key={offsetIdx} className="text-slate-300">
                          {28 + offsetIdx}
                        </span>
                      ))}

                      {/* Days of this month */}
                      {Array.from({ length: m.daysInMonth }).map((_, dIdx) => {
                        const dayNum = dIdx + 1;
                        const isHighlighted = m.highlightDay === dayNum;
                        return (
                          <div key={dIdx} className="h-5 flex items-center justify-center">
                            {isHighlighted ? (
                              <span className="w-5 h-5 rounded-full bg-[#4379EE] text-white font-bold text-[10px] flex items-center justify-center shadow-soft-sm">
                                {dayNum}
                              </span>
                            ) : (
                              <span className="hover:text-[#4379EE] cursor-pointer">
                                {dayNum}
                              </span>
                            )}
                          </div>
                        );
                      })}

                      {/* Trailing days to fill 35 or 42 grid cells */}
                      {Array.from({
                        length: (35 - ((m.startDayOffset + m.daysInMonth) % 35)) % 7
                      }).map((_, trailIdx) => (
                        <span key={trailIdx} className="text-slate-300">
                          {trailIdx + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DAY VIEW */}
          {viewMode === 'Day' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F8]">
                <h2 className="text-lg font-bold text-[#1E293B]">
                  Thursday, December 2, 2021
                </h2>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#4379EE] text-xs font-bold">
                  2 Scheduled Events
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#00CFDE]/10 border border-[#00CFDE]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-10 rounded-full bg-[#00CFDE]"></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Free day</h4>
                      <p className="text-xs text-slate-500">All Day • Personal Time</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#00CFDE]">Confirmed</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#D946EF]/10 border border-[#D946EF]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-10 rounded-full bg-[#D946EF]"></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Party Time</h4>
                      <p className="text-xs text-slate-500">07:00 PM - 11:30 PM • Downtown Lounge</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#D946EF]">Evening Event</span>
                </div>
              </div>
            </div>
          )}

          {/* WEEK VIEW */}
          {viewMode === 'Week' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] space-y-6">
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-lg font-bold text-[#1E293B]">
                  Week 49 • Dec 01 - Dec 07, 2021
                </h2>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {['Sun 29', 'Mon 30', 'Tue 01', 'Wed 02', 'Thu 03', 'Fri 04', 'Sat 05'].map((wDay, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border min-h-[220px] flex flex-col justify-between ${idx === 3 ? 'bg-blue-50/20 border-[#4379EE]/30' : 'bg-white border-[#F0F2F8]'}`}>
                    <span className="text-xs font-bold text-slate-700">{wDay}</span>
                    {idx === 3 && (
                      <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-[#00CFDE] text-white text-[10px] font-bold">
                          Free day
                        </div>
                        <div className="p-2 rounded-lg bg-[#D946EF] text-white text-[10px] font-bold">
                          Party Time
                        </div>
                      </div>
                    )}
                    <div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      {isAddEventOpen && (
        <CreateEventModal onClose={() => setIsAddEventOpen(false)} />
      )}
    </div>
  );
}
