import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Check,
  CheckCircle2,
  MoreHorizontal,
  MessageSquare,
  Heart,
  SlidersHorizontal,
  Calendar,
  Clock,
  Layers,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  BarChart2,
  PieChart
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import AddTaskModal from './AddTaskModal';
import bracketsIconImg from '../../Images/icons/brackets-icon.png';
import landingPreviewUi from '../../Images/schedule/landing-preview-ui.png';
import landingPreview3d from '../../Images/schedule/landing-preview-3d.png';
import reviewDashboardUi from '../../Images/schedule/review-dashboard-ui.png';
import doneDashboardUi from '../../Images/schedule/done-dashboard-ui.png';
import cardCountsImg from '../../Images/schedule/card-counts.png';

// Import avatars from mock data / images
import jamesImg from '../../Images/james.png';
import robertImg from '../../Images/Robert.png';
import bethanyImg from '../../Images/Bethany.png';
import anneImg from '../../Images/Anne.png';

// Clean SVG App Icons matching the Figma screenshot
const FigmaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 38 57" fill="none" className="shrink-0">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

const IllustratorIcon = () => (
  <div className="w-5 h-5 rounded-md bg-[#330000] flex items-center justify-center text-[#FF9A00] font-black text-[10px] tracking-tight shrink-0 border border-[#FF9A00]/20">
    Ai
  </div>
);

const PhotoshopIcon = () => (
  <div className="w-5 h-5 rounded-md bg-[#001E36] flex items-center justify-center text-[#31A8FF] font-black text-[10px] tracking-tight shrink-0 border border-[#31A8FF]/20">
    Ps
  </div>
);

const BracketsIcon = () => (
  <img
    src={bracketsIconImg}
    alt="Web Design"
    className="w-5 h-5 object-contain shrink-0"
  />
);

export default function KanbanBoard({ onSwitchToScheduleList }) {
  const { isAddTaskOpen, setIsAddTaskOpen } = useDashboard();

  // Active view tab: 'Timeline' (matching user's latest screenshot!), 'Board', 'List'
  const [activeTab, setActiveTab] = useState('Timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  // Timeline State & Data matching user's uploaded screenshot & previous data
  const [timelineCategory, setTimelineCategory] = useState('todo');
  const [timelineMonth, setTimelineMonth] = useState('December 2021');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const [timelineTasks, setTimelineTasks] = useState([
    {
      id: 'tl-1',
      title: 'Grapich Design',
      checked: false,
      leftPercent: 18.75, // Day '02'
      timeSlot: '09.00 AM',
      badges: [
        { label: 'Low', bg: 'bg-[#FF808B]', text: 'text-white' },
        { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
      ],
      categories: ['todo', 'doing']
    },
    {
      id: 'tl-2',
      title: 'Dashboard Design',
      checked: true,
      leftPercent: 27, // Day '03' - '04'
      timeSlot: '11.00 AM',
      badges: [
        { label: 'High', bg: 'bg-[#00CFDE]', text: 'text-white' },
        { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
      ],
      categories: ['todo', 'done']
    },
    {
      id: 'tl-3',
      title: 'Logo Design',
      checked: true,
      leftPercent: 18.75, // Day '02'
      timeSlot: '01.00 PM',
      badges: [
        { label: 'High', bg: 'bg-[#00CFDE]', text: 'text-white' },
        { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
      ],
      categories: ['todo', 'done']
    },
    {
      id: 'tl-4',
      title: 'Web Design',
      checked: true,
      leftPercent: 41.5, // Day '06' - '07'
      timeSlot: '03.00 PM',
      badges: [
        { label: 'High', bg: 'bg-[#00CFDE]', text: 'text-white' },
        { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
      ],
      categories: ['todo', 'doing']
    }
  ]);

  const timelineDates = ['9', '30', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];
  const timelineHours = [
    '09.00 AM',
    '10.00 AM',
    '11.00 AM',
    '12.00 PM',
    '01.00 PM',
    '02.00 PM',
    '03.00 PM',
    '04.00 PM',
    '05.00 PM'
  ];

  const handleToggleTimelineTask = (taskId) => {
    setTimelineTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, checked: !t.checked } : t))
    );
  };

  // Columns & Cards data matching the Figma Board screenshot 100%
  const [boardColumns, setBoardColumns] = useState([
    {
      id: 'todo',
      title: 'ToDo',
      cards: [
        {
          id: 'todo-1',
          title: 'Dashboard Design',
          checked: false,
          badges: [
            { label: 'Low', bg: 'bg-[#FF808B]', text: 'text-white' },
            { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
          ],
          description: 'Discussion for management dashboard ui design'
        },
        {
          id: 'todo-2',
          title: 'Landing page Design',
          checked: false,
          badges: [
            { label: 'Medium', bg: 'bg-[#FF9F43]', text: 'text-white' },
            { label: 'At risk', bg: 'bg-[#EA5455]', text: 'text-white' }
          ],
          description: 'Discussion for management dashboard ui design'
        },
        {
          id: 'todo-3',
          title: 'E-Shop Mobile App',
          checked: false,
          badges: [
            { label: 'High', bg: 'bg-[#00CFDE]', text: 'text-white' }
          ],
          description: 'Discussion for management dashboard ui design'
        },
        {
          id: 'todo-4',
          title: 'Dashboard Design',
          checked: false,
          badges: [
            { label: 'Low', bg: 'bg-[#FF808B]', text: 'text-white' },
            { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
          ],
          description: 'Discussion for management dashboard ui design'
        }
      ]
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      cards: [
        {
          id: 'prog-1',
          title: 'Dashboard Design',
          checked: true,
          badges: [
            { label: 'High', bg: 'bg-[#00CFDE]', text: 'text-white' },
            { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
          ],
          description: 'Discussion for management dashboard ui design'
        },
        {
          id: 'prog-2',
          title: 'Landing page Design',
          checked: true,
          badges: [
            { label: 'Low', bg: 'bg-[#FF808B]', text: 'text-white' }
          ],
          description: 'Discussion for management dashboard ui design',
          previewType: 'dual-apps'
        },
        {
          id: 'prog-3',
          title: 'E-Shop Mobile App',
          checked: false,
          badges: [
            { label: 'Low', bg: 'bg-[#FF808B]', text: 'text-white' },
            { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
          ],
          description: 'Discussion for management dashboard ui design'
        }
      ]
    },
    {
      id: 'in_review',
      title: 'In Review',
      cards: [
        {
          id: 'rev-1',
          title: 'Dashboard Design',
          checked: true,
          badges: [
            { label: 'Medium', bg: 'bg-[#FF9F43]', text: 'text-white' }
          ],
          description: 'Discussion for management dashboard ui design',
          previewType: 'stories-ui'
        },
        {
          id: 'rev-2',
          title: 'E-Shop Mobile App',
          checked: true,
          badges: [
            { label: 'Low', bg: 'bg-[#FF808B]', text: 'text-white' }
          ],
          description: 'Discussion for management dashboard ui design',
          previewType: 'dual-apps'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        {
          id: 'done-1',
          title: 'Dashboard Design',
          checked: true,
          badges: [
            { label: 'High', bg: 'bg-[#00CFDE]', text: 'text-white' },
            { label: 'On Track', bg: 'bg-[#FED766]', text: 'text-[#785E00]' }
          ],
          description: 'Discussion for management dashboard ui design',
          previewType: 'dashboards-dual'
        }
      ]
    }
  ]);

  // Toggle checkbox in Board view
  const handleToggleBoardCheck = (colId, cardId) => {
    setBoardColumns(prev =>
      prev.map(col =>
        col.id === colId
          ? {
              ...col,
              cards: col.cards.map(c =>
                c.id === cardId ? { ...c, checked: !c.checked } : c
              )
            }
          : col
      )
    );
  };

  // Task Groups for List View (from previous screenshot)
  const [taskGroups, setTaskGroups] = useState({
    todo: [
      {
        id: 'todo-1',
        name: 'Ui Design',
        type: 'figma',
        startDate: '03/12/2021',
        endDate: '5/12/2021',
        members: '5 Member',
        status: 'Pending',
        checked: false
      },
      {
        id: 'todo-2',
        name: 'Logo Design',
        type: 'ai',
        startDate: '03/12/2021',
        endDate: '5/12/2021',
        members: '5 Member',
        status: 'Pending',
        checked: false
      }
    ],
    doing: [
      {
        id: 'doing-1',
        name: 'Grapich Design',
        type: 'ps',
        startDate: '03/12/2021',
        endDate: '5/12/2021',
        members: '5 Member',
        status: 'Running',
        checked: true
      },
      {
        id: 'doing-2',
        name: 'Web Design',
        type: 'brackets',
        startDate: '03/12/2021',
        endDate: '5/12/2021',
        members: '5 Member',
        status: 'Running',
        checked: true
      }
    ],
    done: [
      {
        id: 'done-1',
        name: 'Logo Design',
        type: 'ai',
        startDate: '01/12/2021',
        endDate: '3/12/2021',
        members: '5 Member',
        status: 'Done',
        checked: true
      }
    ]
  });

  const handleToggleCheck = (groupKey, taskId) => {
    setTaskGroups(prev => ({
      ...prev,
      [groupKey]: prev[groupKey].map(t =>
        t.id === taskId ? { ...t, checked: !t.checked } : t
      )
    }));
  };

  const handleDeleteRow = (groupKey, taskId) => {
    setTaskGroups(prev => ({
      ...prev,
      [groupKey]: prev[groupKey].filter(t => t.id !== taskId)
    }));
  };

  const renderAppIcon = (type) => {
    switch (type) {
      case 'figma':
        return <FigmaIcon />;
      case 'ai':
        return <IllustratorIcon />;
      case 'ps':
        return <PhotoshopIcon />;
      case 'xd':
      case 'brackets':
      case 'web':
        return <BracketsIcon />;
      default:
        return <BracketsIcon />;
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#FFF4EB] text-[#FF9F43]">
            Pending
          </span>
        );
      case 'Running':
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#EBF0FF] text-[#4379EE]">
            Running
          </span>
        );
      case 'Done':
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#E8F8F0] text-[#10B981]">
            Done
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  // Mockup Banner 1: Stories UI Preview matching user's uploaded high-res asset
  const renderStoriesBanner = () => (
    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-[#F0F2F8] shadow-xs group/img">
      <img
        src={reviewDashboardUi}
        alt="In Review Stories Dashboard UI"
        className="w-full h-auto max-h-52 object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
      />
    </div>
  );

  // Mockup Banner 2: Dual Previews matching user's uploaded high-res assets
  const renderDualAppsBanner = () => (
    <div className="grid grid-cols-2 gap-2">
      <div className="h-24 rounded-2xl overflow-hidden bg-slate-50 border border-[#F0F2F8] shadow-xs group/img">
        <img
          src={landingPreviewUi}
          alt="Landing UI preview"
          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="h-24 rounded-2xl overflow-hidden bg-slate-50 border border-[#F0F2F8] shadow-xs group/img">
        <img
          src={landingPreview3d}
          alt="3D Shapes preview"
          className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );

  // Mockup Banner 3: Done Dashboard UI Preview matching user's uploaded high-res asset
  const renderDualDashboardsBanner = () => (
    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-[#F0F2F8] shadow-xs group/img">
      <img
        src={doneDashboardUi}
        alt="Done Dashboard Design UI"
        className="w-full h-auto max-h-52 object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
      />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header: Task Preview Title + Action Button at top right */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1E293B] tracking-tight">
          Task Preview
        </h1>

        {/* Action Button: Filter on Board, + Add Task on Timeline and List matching Figma */}
        {activeTab === 'Board' ? (
          <button
            onClick={() => setFilterActive(!filterActive)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#546FFF] hover:bg-[#435EEB] active:scale-[0.98] text-white text-xs font-bold shadow-soft transition-all"
          >
            <span>Filter</span>
            <SlidersHorizontal size={14} />
          </button>
        ) : (
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#546FFF] hover:bg-[#435EEB] active:scale-[0.98] text-white text-xs font-bold shadow-soft transition-all"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Task</span>
          </button>
        )}
      </div>

      {/* Second Row: View Switcher (List, Board, Timeline) & Right Control (Month or Search) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* View Switcher: List, Board, Timeline */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-[#F0F2F8] shadow-soft-sm w-fit">
          {['List', 'Board', 'Timeline'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#546FFF] text-white shadow-soft'
                  : 'text-[#8F9BBA] hover:text-[#1E293B]'
              }`}
            >
              {tab}
            </button>
          ))}
          {onSwitchToScheduleList && (
            <button
              onClick={onSwitchToScheduleList}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-all border-l border-slate-100 ml-1"
            >
              Schedule List
            </button>
          )}
        </div>

        {/* Right Control: Month Dropdown for Timeline, Search Bar for Board/List */}
        {activeTab === 'Timeline' ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#1E293B] text-xs font-bold shadow-xs hover:border-[#546FFF]/40 transition-colors"
            >
              <span>{timelineMonth}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {showMonthDropdown && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30">
                {['November 2021', 'December 2021', 'January 2022', 'February 2022'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setTimelineMonth(m);
                      setShowMonthDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                      timelineMonth === m ? 'text-[#546FFF] font-bold bg-[#546FFF]/5' : 'text-slate-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2.5 w-60 sm:w-72 bg-white rounded-xl border border-[#F0F2F8] text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#546FFF] transition-colors shadow-soft-sm"
            />
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        )}
      </div>

      {/* BOARD VIEW: 100% Match with latest Figma Screenshot */}
      {activeTab === 'Board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {boardColumns.map((col) => (
            <div key={col.id} className="space-y-4">
              {/* Column Title matching screenshot (No count badge!) */}
              <h2 className="font-bold text-[#1E293B] text-base px-1">
                {col.title}
              </h2>

              {/* Stack of Cards */}
              <div className="space-y-4">
                {col.cards
                  .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((card) => (
                    <div
                      key={card.id}
                      className="bg-white rounded-3xl p-5 shadow-soft border border-[#F4F7FE] transition-all hover:shadow-soft-lg space-y-3"
                    >
                      {/* Top Row: Checkbox, Title, Three Dots */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 flex-1 overflow-hidden">
                          {/* Circle Checkbox matching screenshot */}
                          <button
                            type="button"
                            onClick={() => handleToggleBoardCheck(col.id, card.id)}
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                              card.checked
                                ? 'bg-[#546FFF] text-white shadow-soft-sm'
                                : 'border-2 border-slate-300 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {card.checked && <Check size={11} strokeWidth={3} />}
                          </button>

                          <h3 className="font-bold text-xs sm:text-sm text-[#1E293B] truncate">
                            {card.title}
                          </h3>
                        </div>

                        {/* Three dots menu */}
                        <button className="text-slate-300 hover:text-slate-600 transition-colors p-1">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>

                      {/* Badges Row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {card.badges.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${badge.bg} ${badge.text}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {card.description}
                      </p>

                      {/* Mockup Preview Graphic (if card has one) */}
                      {card.previewType === 'stories-ui' && renderStoriesBanner()}
                      {card.previewType === 'dual-apps' && renderDualAppsBanner()}
                      {card.previewType === 'dashboards-dual' && renderDualDashboardsBanner()}

                      {/* Bottom Row: Avatars Stack + Comment/Like Counts */}
                      <div className="flex items-center justify-between pt-1">
                        {/* 4 Avatars + Cyan Plus */}
                        <div className="flex items-center -space-x-1.5">
                          <img
                            src={jamesImg}
                            alt="assignee"
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                          <img
                            src={bethanyImg}
                            alt="assignee"
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                          <img
                            src={robertImg}
                            alt="assignee"
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                          <img
                            src={anneImg}
                            alt="assignee"
                            className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                          />
                          <div className="w-6 h-6 rounded-full bg-[#00CFDE] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                            +
                          </div>
                        </div>

                        {/* Exact counts icon matching uploaded screenshot */}
                        <div className="flex items-center">
                          <img
                            src={cardCountsImg}
                            alt="112 comments, 1.2k likes"
                            className="h-4 sm:h-[18px] object-contain shrink-0 select-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW (Previous Screen with To Do, Doing, Done tables) */}
      {activeTab === 'List' && (
        <div className="space-y-6">
          {/* 1. To Do Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-[#F4F7FE] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1E293B]">To Do</h2>
              <button className="text-xs font-bold text-[#546FFF] hover:underline">
                See More
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F0F2F8] text-slate-700 font-bold">
                    <th className="pb-3 pl-2 w-28 font-semibold">Check Box</th>
                    <th className="pb-3 font-semibold">
                      Task Name <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Start Date <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      End Date <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Member <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Status <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 text-right pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F9FD]">
                  {taskGroups.todo
                    .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-3">
                          <button
                            type="button"
                            onClick={() => handleToggleCheck('todo', item.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              item.checked
                                ? 'bg-[#546FFF] border-[#546FFF] text-white'
                                : 'border-slate-300 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {item.checked && <Check size={13} strokeWidth={3} />}
                          </button>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3 font-bold text-[#546FFF]">
                            {renderAppIcon(item.type)}
                            <span className="hover:underline cursor-pointer">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-600 font-medium">{item.startDate}</td>
                        <td className="py-4 text-[#EA5455] font-medium">{item.endDate}</td>
                        <td className="py-4 text-slate-600 font-medium">{item.members}</td>
                        <td className="py-4">{renderStatusBadge(item.status)}</td>
                        <td className="py-4 text-right pr-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="w-7 h-7 rounded-full bg-[#EBF4FF] text-[#546FFF] hover:bg-[#d8e6ff] flex items-center justify-center transition-colors"
                              title="Edit task"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteRow('todo', item.id)}
                              className="w-7 h-7 rounded-full bg-[#FEECEB] text-[#EA5455] hover:bg-[#ffd9d6] flex items-center justify-center transition-colors"
                              title="Delete task"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Doing Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-[#F4F7FE] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1E293B]">Doing</h2>
              <button className="text-xs font-bold text-[#546FFF] hover:underline">
                See More
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F0F2F8] text-slate-700 font-bold">
                    <th className="pb-3 pl-2 w-28 font-semibold">Check Box</th>
                    <th className="pb-3 font-semibold">
                      Task Name <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Start Date <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      End Date <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Member <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Status <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 text-right pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F9FD]">
                  {taskGroups.doing
                    .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-3">
                          <button
                            type="button"
                            onClick={() => handleToggleCheck('doing', item.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              item.checked
                                ? 'bg-[#546FFF] border-[#546FFF] text-white'
                                : 'border-slate-300 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {item.checked && <Check size={13} strokeWidth={3} />}
                          </button>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3 font-bold text-[#546FFF]">
                            {renderAppIcon(item.type)}
                            <span className="hover:underline cursor-pointer">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-600 font-medium">{item.startDate}</td>
                        <td className="py-4 text-[#EA5455] font-medium">{item.endDate}</td>
                        <td className="py-4 text-slate-600 font-medium">{item.members}</td>
                        <td className="py-4">{renderStatusBadge(item.status)}</td>
                        <td className="py-4 text-right pr-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="w-7 h-7 rounded-full bg-[#EBF4FF] text-[#546FFF] hover:bg-[#d8e6ff] flex items-center justify-center transition-colors"
                              title="Edit task"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteRow('doing', item.id)}
                              className="w-7 h-7 rounded-full bg-[#FEECEB] text-[#EA5455] hover:bg-[#ffd9d6] flex items-center justify-center transition-colors"
                              title="Delete task"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Done Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-soft border border-[#F4F7FE] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1E293B]">Done</h2>
              <button className="text-xs font-bold text-[#546FFF] hover:underline">
                See More
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F0F2F8] text-slate-700 font-bold">
                    <th className="pb-3 pl-2 w-28 font-semibold">Check Box</th>
                    <th className="pb-3 font-semibold">
                      Task Name <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Start Date <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      End Date <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Member <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 font-semibold">
                      Status <span className="text-[10px] text-slate-400">▾</span>
                    </th>
                    <th className="pb-3 text-right pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F9FD]">
                  {taskGroups.done
                    .filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pl-3">
                          <button
                            type="button"
                            onClick={() => handleToggleCheck('done', item.id)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              item.checked
                                ? 'bg-[#546FFF] border-[#546FFF] text-white'
                                : 'border-slate-300 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {item.checked && <Check size={13} strokeWidth={3} />}
                          </button>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3 font-bold text-[#546FFF]">
                            {renderAppIcon(item.type)}
                            <span className="hover:underline cursor-pointer">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-600 font-medium">{item.startDate}</td>
                        <td className="py-4 text-[#EA5455] font-medium">{item.endDate}</td>
                        <td className="py-4 text-slate-600 font-medium">{item.members}</td>
                        <td className="py-4">{renderStatusBadge(item.status)}</td>
                        <td className="py-4 text-right pr-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="w-7 h-7 rounded-full bg-[#EBF4FF] text-[#546FFF] hover:bg-[#d8e6ff] flex items-center justify-center transition-colors"
                              title="Edit task"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteRow('done', item.id)}
                              className="w-7 h-7 rounded-full bg-[#FEECEB] text-[#EA5455] hover:bg-[#ffd9d6] flex items-center justify-center transition-colors"
                              title="Delete task"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TIMELINE VIEW: 100% Match with uploaded Task Preview Timeline Figma Screenshot */}
      {activeTab === 'Timeline' && (
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Sub-panel: Category Selector (To Do, Doing, Done) */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-soft border border-[#F4F7FE] w-full lg:w-48 xl:w-56 shrink-0 flex flex-col gap-3 min-h-[580px]">
            <button
              type="button"
              onClick={() => setTimelineCategory('todo')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                timelineCategory === 'todo'
                  ? 'bg-[#546FFF] text-white shadow-md shadow-[#546FFF]/25'
                  : 'text-[#1E293B] hover:bg-slate-50'
              }`}
            >
              <span>To Do</span>
              <svg
                className={`w-2 h-2.5 transition-transform ${
                  timelineCategory === 'todo' ? 'text-white' : 'text-slate-300'
                }`}
                viewBox="0 0 10 12"
                fill="currentColor"
              >
                <path d="M0 0L10 6L0 12V0Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setTimelineCategory('doing')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                timelineCategory === 'doing'
                  ? 'bg-[#546FFF] text-white shadow-md shadow-[#546FFF]/25'
                  : 'text-[#1E293B] hover:bg-slate-50'
              }`}
            >
              <span>Doing</span>
              <svg
                className={`w-2 h-2.5 transition-transform ${
                  timelineCategory === 'doing' ? 'text-white' : 'text-slate-300'
                }`}
                viewBox="0 0 10 12"
                fill="currentColor"
              >
                <path d="M0 0L10 6L0 12V0Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setTimelineCategory('done')}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-xs font-bold transition-all ${
                timelineCategory === 'done'
                  ? 'bg-[#546FFF] text-white shadow-md shadow-[#546FFF]/25'
                  : 'text-[#1E293B] hover:bg-slate-50'
              }`}
            >
              <span>Done</span>
              <svg
                className={`w-2 h-2.5 transition-transform ${
                  timelineCategory === 'done' ? 'text-white' : 'text-slate-300'
                }`}
                viewBox="0 0 10 12"
                fill="currentColor"
              >
                <path d="M0 0L10 6L0 12V0Z" />
              </svg>
            </button>
          </div>

          {/* Right Timeline Schedule Grid */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] flex-1 overflow-x-auto min-w-0 w-full">
            <div className="min-w-[950px]">
              {/* Date Headers: 16 Columns */}
              <div className="flex items-center mb-6">
                {/* Time spacer */}
                <div className="w-20 shrink-0" />

                {/* 16 Date Columns */}
                <div className="flex-1 grid grid-cols-[repeat(16,minmax(0,1fr))] items-center">
                  {timelineDates.map((date, idx) => (
                    <div key={idx} className="flex justify-center items-center">
                      {date === '02' ? (
                        <span className="w-8 h-8 rounded-lg bg-[#546FFF] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-[#546FFF]/30">
                          {date}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold text-xs">
                          {date}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Rows Container with subtle vertical guidelines */}
              <div className="relative">
                {/* Subtle vertical column guides */}
                <div className="absolute inset-0 flex pointer-events-none">
                  <div className="w-20 shrink-0" />
                  <div className="flex-1 grid grid-cols-[repeat(16,minmax(0,1fr))]">
                    {timelineDates.map((_, i) => (
                      <div key={i} className="border-r border-[#F8F9FD] h-full last:border-r-0" />
                    ))}
                  </div>
                </div>

                {/* Hourly Slots (09.00 AM to 05.00 PM) */}
                {timelineHours.slice(0, -1).map((hour) => {
                  // Find if there is a task scheduled in this hour slot
                  const task = timelineTasks.find(
                    t =>
                      t.timeSlot === hour &&
                      (timelineCategory === 'todo' || t.categories.includes(timelineCategory))
                  );

                  return (
                    <div key={hour} className="flex items-start">
                      {/* Time Label */}
                      <div className="w-20 shrink-0 -mt-2.5 text-[11px] font-semibold text-slate-400 select-none">
                        {hour}
                      </div>

                      {/* Grid Interval Row */}
                      <div className="flex-1 h-[70px] border-b border-[#F0F2F8] relative">
                        {task && (
                          <div
                            style={{ left: `${task.leftPercent}%` }}
                            onClick={() => handleToggleTimelineTask(task.id)}
                            className="absolute top-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-[#EAEFF8] px-4 py-2.5 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-all cursor-pointer group"
                          >
                            {/* Checkbox Radio Circle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleTimelineTask(task.id);
                              }}
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                task.checked
                                  ? 'bg-[#546FFF] text-white shadow-xs'
                                  : 'border-2 border-slate-300 group-hover:border-[#546FFF] bg-white'
                              }`}
                            >
                              {task.checked && <Check size={11} strokeWidth={3} />}
                            </button>

                            {/* Title */}
                            <span className="font-bold text-[#1E293B] text-xs sm:text-[13px] whitespace-nowrap">
                              {task.title}
                            </span>

                            {/* Avatars */}
                            <div className="flex items-center -space-x-2 shrink-0">
                              <img
                                src={jamesImg}
                                alt="Member"
                                className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-2xs"
                              />
                              <img
                                src={robertImg}
                                alt="Member"
                                className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-2xs"
                              />
                              <img
                                src={bethanyImg}
                                alt="Member"
                                className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-2xs"
                              />
                              <img
                                src={anneImg}
                                alt="Member"
                                className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-2xs"
                              />
                              <div className="w-6 h-6 rounded-full bg-[#00CFDE] text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-2xs">
                                +
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-1.5 shrink-0">
                              {task.badges.map((badge, bIdx) => (
                                <span
                                  key={bIdx}
                                  className={`px-3 py-1 rounded-full text-[11px] font-bold ${badge.bg} ${badge.text} shadow-2xs`}
                                >
                                  {badge.label}
                                </span>
                              ))}
                            </div>

                            {/* More / Actions Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors shrink-0 ml-1"
                              title="Options"
                            >
                              <MoreHorizontal size={15} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Final Row: 05.00 PM Bottom Label */}
                <div className="flex items-start">
                  <div className="w-20 shrink-0 -mt-2.5 text-[11px] font-semibold text-slate-400 select-none">
                    05.00 PM
                  </div>
                  <div className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddTaskOpen && (
        <AddTaskModal onClose={() => setIsAddTaskOpen(false)} />
      )}
    </div>
  );
}
