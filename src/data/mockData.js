import arroraImg from '../Images/Arrora.png';
import jamesImg from '../Images/james.png';
import robertImg from '../Images/Robert.png';
import bethanyImg from '../Images/Bethany.png';
import anneImg from '../Images/Anne.png';
import bethany2Img from '../Images/Bethany 2.png';
import james2Img from '../Images/James 2.png';
import jhonImg from '../Images/jhon.png';
import bethany3Img from '../Images/Bethany 3.png';
import james3Img from '../Images/James 3.png';

// Product Analytics Assets extracted directly from user's Figma design
import badgeTotalProduct from '../Images/product/badge-total-product.png';
import badgeTotalSales from '../Images/product/badge-total-sales.png';
import medalRank from '../Images/product/medal-rank.png';
import prodBluetooth from '../Images/product/prod-bluetooth.png';
import prodAirdot from '../Images/product/prod-airdot.png';
import prodShoes from '../Images/product/prod-shoes.png';
import prodTshirt from '../Images/product/prod-tshirt.png';
import prodWatch from '../Images/product/prod-watch.png';
import prodTop from '../Images/product/prod-top.png';
import donutCenterTrend from '../Images/product/donut-center-trend.png';

export const initialKpis = [
  {
    id: 'save-products',
    title: 'Save Products',
    value: '178+',
    icon: 'heart',
    iconBg: '#EBF4FF',
    iconColor: '#3B82F6',
    change: '+12.5%',
    isPositive: true
  },
  {
    id: 'stock-products',
    title: 'Stock Products',
    value: '20+',
    icon: 'cube',
    iconBg: '#FEF9C3',
    iconColor: '#F59E0B',
    change: '+4.2%',
    isPositive: true
  },
  {
    id: 'sales-products',
    title: 'Sales Products',
    value: '190+',
    icon: 'bag',
    iconBg: '#FEE2E2',
    iconColor: '#EF4444',
    change: '+28.4%',
    isPositive: true
  },
  {
    id: 'job-application',
    title: 'Job Application',
    value: '12+',
    icon: 'briefcase',
    iconBg: '#EDE9FE',
    iconColor: '#8B5CF6',
    change: '+8.1%',
    isPositive: true
  }
];

export const reportsChartData = [
  { time: '10am', value: 54, sales: '1,420' },
  { time: '11am', value: 32, sales: '980' },
  { time: '12am', value: 58, sales: '1,890' },
  { time: '01am', value: 38, sales: '1,240' },
  { time: '02am', value: 36, sales: '1,150' },
  { time: '03am', value: 50, sales: '2,678', isPeak: true },
  { time: '04am', value: 16, sales: '640' },
  { time: '05am', value: 68, sales: '2,420' },
  { time: '06am', value: 56, sales: '1,960' },
  { time: '07am', value: 74, sales: '2,890' },
];

export const analyticsData = {
  percentage: 80,
  label: 'Transactions',
  segments: [
    { name: 'Sale', value: 40, color: '#3B82F6' },
    { name: 'Distribute', value: 35, color: '#FBBF24' },
    { name: 'Return', value: 25, color: '#F87171' }
  ]
};

export const initialOrders = [
  {
    id: '1',
    trackingNo: '#876364',
    productName: 'Camera Lens',
    category: 'Electronics',
    price: '$178',
    priceNum: 178,
    totalOrder: 325,
    totalAmount: '$1,46,660',
    imageType: 'camera',
    imageColor: 'from-pink-100 to-rose-200'
  },
  {
    id: '2',
    trackingNo: '#876368',
    productName: 'Black Sleep Dress',
    category: 'Fashion',
    price: '$14',
    priceNum: 14,
    totalOrder: 53,
    totalAmount: '$46,660',
    imageType: 'dress',
    imageColor: 'from-slate-100 to-slate-200'
  },
  {
    id: '3',
    trackingNo: '#876412',
    productName: 'Argan Oil',
    category: 'Beauty',
    price: '$21',
    priceNum: 21,
    totalOrder: 78,
    totalAmount: '$3,46,676',
    imageType: 'bottle',
    imageColor: 'from-amber-100 to-amber-200'
  },
  {
    id: '4',
    trackingNo: '#876621',
    productName: 'EAU DE Parfum',
    category: 'Fragrance',
    price: '$32',
    priceNum: 32,
    totalOrder: 98,
    totalAmount: '$3,46,981',
    imageType: 'perfume',
    imageColor: 'from-yellow-100 to-yellow-200'
  }
];

export const initialTopProducts = [
  {
    id: 'tp-1',
    name: 'NIKE Shoes Black Pattern',
    price: '$87',
    rating: 5,
    category: 'Footwear',
    image: 'shoes'
  },
  {
    id: 'tp-2',
    name: 'iPhone 12',
    price: '$987',
    rating: 4,
    category: 'Smartphones',
    image: 'phone'
  }
];

export const initialInvoices = [
  {
    id: 'inv-1',
    invoiceId: '#876364',
    name: 'Arrora gaur',
    email: 'arroragaur@gmail.com',
    date: '12 Dec, 2020',
    status: 'Complete',
    starred: true,
    avatar: arroraImg,
    amount: '$3,250'
  },
  {
    id: 'inv-2',
    invoiceId: '#876123',
    name: 'James Mullican',
    email: 'jamesmullican@gmail.com',
    date: '10 Dec, 2020',
    status: 'Pending',
    starred: true,
    avatar: jamesImg,
    amount: '$1,420'
  },
  {
    id: 'inv-3',
    invoiceId: '#876213',
    name: 'Robert Bacins',
    email: 'robertbacins@gmail.com',
    date: '09 Dec, 2020',
    status: 'Complete',
    starred: false,
    avatar: robertImg,
    amount: '$850'
  },
  {
    id: 'inv-4',
    invoiceId: '#876987',
    name: 'Bethany Jackson',
    email: 'bethanyjackson@gmail.com',
    date: '09 Dec, 2020',
    status: 'Cancel',
    starred: false,
    avatar: bethanyImg,
    amount: '$640'
  },
  {
    id: 'inv-5',
    invoiceId: '#871345',
    name: 'Anne Jacob',
    email: 'annejacob@gmail.com',
    date: '10 Dec, 2020',
    status: 'Complete',
    starred: false,
    avatar: anneImg,
    amount: '$2,890'
  },
  {
    id: 'inv-6',
    invoiceId: '#872345',
    name: 'Bethany Jackson',
    email: 'bethanyjackson@gmail.com',
    date: '10 Dec, 2020',
    status: 'Pending',
    starred: true,
    avatar: bethany2Img,
    amount: '$1,150'
  },
  {
    id: 'inv-7',
    invoiceId: '#872346',
    name: 'James Mullican',
    email: 'jamesmullican@gmail.com',
    date: '10 Dec, 2020',
    status: 'Complete',
    starred: false,
    avatar: james2Img,
    amount: '$4,200'
  },
  {
    id: 'inv-8',
    invoiceId: '#873245',
    name: 'Jhon Deo',
    email: 'jhondeo32@gmail.com',
    date: '08 Dec, 2020',
    status: 'Complete',
    starred: true,
    avatar: jhonImg,
    amount: '$980'
  },
  {
    id: 'inv-9',
    invoiceId: '#876364',
    name: 'Bethany Jackson',
    email: 'bethanyjackson@gmail.com',
    date: '02 Dec, 2020',
    status: 'Cancel',
    starred: true,
    avatar: bethany3Img,
    amount: '$310'
  },
  {
    id: 'inv-10',
    invoiceId: '#878769',
    name: 'James Mullican',
    email: 'jamesmullican@gmail.com',
    date: '01 Dec, 2020',
    status: 'Pending',
    starred: false,
    avatar: james3Img,
    amount: '$1,750'
  }
];

export const initialTasks = [
  {
    id: 'task-1',
    column: 'todo',
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'Low',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: false,
    assignees: [
      jamesImg,
      robertImg,
      bethanyImg,
      anneImg
    ]
  },
  {
    id: 'task-2',
    column: 'todo',
    title: 'Landing page Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'Medium',
    status: 'At risk',
    comments: 112,
    likes: '1.2k',
    completed: false,
    assignees: [
      jhonImg,
      bethany3Img,
      james3Img,
      james2Img
    ]
  },
  {
    id: 'task-3',
    column: 'todo',
    title: 'E-Shop Mobile App',
    description: 'Discussion for management dashboard ui design',
    priority: 'High',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: false,
    assignees: [
      jamesImg,
      robertImg,
      bethanyImg,
      anneImg
    ]
  },
  {
    id: 'task-4',
    column: 'todo',
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'Low',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: false,
    assignees: [
      jhonImg,
      bethany3Img,
      james3Img,
      james2Img
    ]
  },
  {
    id: 'task-5',
    column: 'in_progress',
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'High',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: true,
    assignees: [
      jamesImg,
      robertImg,
      bethanyImg,
      anneImg
    ]
  },
  {
    id: 'task-6',
    column: 'in_progress',
    title: 'Landing page Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'Low',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: true,
    hasImages: true,
    assignees: [
      jhonImg,
      bethany3Img,
      james3Img,
      james2Img
    ]
  },
  {
    id: 'task-7',
    column: 'in_progress',
    title: 'E-Shop Mobile App',
    description: 'Discussion for management dashboard ui design',
    priority: 'Low',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: false,
    assignees: [
      jamesImg,
      robertImg,
      bethanyImg,
      anneImg
    ]
  },
  {
    id: 'task-8',
    column: 'in_review',
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'Medium',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: true,
    hasBanner: true,
    assignees: [
      jamesImg,
      robertImg,
      bethanyImg,
      anneImg
    ]
  },
  {
    id: 'task-9',
    column: 'in_review',
    title: 'E-Shop Mobile App',
    description: 'Discussion for management dashboard ui design',
    priority: 'Low',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: true,
    hasImages: true,
    assignees: [
      jhonImg,
      bethany3Img,
      james3Img,
      james2Img
    ]
  },
  {
    id: 'task-10',
    column: 'done',
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    priority: 'High',
    status: 'On Track',
    comments: 112,
    likes: '1.2k',
    completed: true,
    hasBanner: true,
    assignees: [
      jamesImg,
      robertImg,
      bethanyImg,
      anneImg
    ]
  }
];

export const initialChats = [
  {
    id: 'chat-1',
    user: {
      name: 'Easin Arafat',
      role: 'Lead UI/UX Designer',
      status: 'online',
      avatar: jhonImg
    },
    unread: 2,
    lastTime: '10:45 AM',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hi! Could you take a look at the newly updated Base SaaS Dashboard screens in Figma?', time: '10:30 AM' },
      { id: 'm2', sender: 'me', text: 'Hey Easin! Absolutely, checking the layout, spacing, and typography right now.', time: '10:35 AM' },
      { id: 'm3', sender: 'them', text: 'Great! Notice the reports chart spline curve and the custom 3-segment analytics donut chart. Make sure those are responsive too!', time: '10:40 AM' },
      { id: 'm4', sender: 'them', text: 'Here are the design assets and color tokens.', time: '10:45 AM', hasAttachment: true }
    ]
  },
  {
    id: 'chat-2',
    user: {
      name: 'Anne Jacob',
      role: 'Finance Manager',
      status: 'online',
      avatar: anneImg
    },
    unread: 0,
    lastTime: '09:30 AM',
    messages: [
      { id: 'm1', sender: 'them', text: 'Invoice #871345 has been processed and status is updated to Complete.', time: '09:30 AM' }
    ]
  },
  {
    id: 'chat-3',
    user: {
      name: 'Robert Bacins',
      role: 'Product Lead',
      status: 'away',
      avatar: robertImg
    },
    unread: 0,
    lastTime: 'Yesterday',
    messages: [
      { id: 'm1', sender: 'them', text: 'Will send the updated design file soon. The Kanban board cards look great.', time: 'Yesterday' }
    ]
  },
  {
    id: 'chat-4',
    user: {
      name: 'Bethany Jackson',
      role: 'Customer Success',
      status: 'offline',
      avatar: bethanyImg
    },
    unread: 0,
    lastTime: 'Oct 28',
    messages: [
      { id: 'm1', sender: 'them', text: 'Thank you for the quick turnaround on the customer contact directory!', time: 'Oct 28' }
    ]
  }
];

export const initialCustomers = [
  {
    id: 'cust-1',
    name: 'John Deo',
    firstName: 'John',
    lastName: 'Deo',
    email: 'johndoe2211@gmail.com',
    phone: '+33757005467',
    gender: 'Male',
    role: 'UI/UX Designer',
    address: '2231 / Sycamore Lake Road',
    avatar: jhonImg,
    largeAvatar: jhonImg,
    company: 'Apex Technologies',
    ordersCount: 24,
    totalSpent: '$14,250',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 38 },
        { label: 'Feb', value: 85, isPeak: true, peakBadge: 'Feb 2.33k' },
        { label: 'Mar', value: 54 },
        { label: 'Apr', value: 42 },
        { label: 'May', value: 68 },
        { label: 'Jun', value: 50 }
      ],
      gauge1: 70,
      gauge2: 60
    }
  },
  {
    id: 'cust-2',
    name: 'Shelby Goode',
    firstName: 'Shelby',
    lastName: 'Goode',
    email: 'shelbygoode41@gmail.com',
    phone: '+33757005467',
    gender: 'Female',
    role: 'Product Lead',
    address: '1420 / Highland Avenue',
    avatar: bethany2Img,
    company: 'Goode Design Studio',
    ordersCount: 18,
    totalSpent: '$9,820',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 45 },
        { label: 'Feb', value: 65 },
        { label: 'Mar', value: 82, isPeak: true, peakBadge: 'Mar 1.95k' },
        { label: 'Apr', value: 55 },
        { label: 'May', value: 70 },
        { label: 'Jun', value: 62 }
      ],
      gauge1: 85,
      gauge2: 55
    }
  },
  {
    id: 'cust-3',
    name: 'Robert Bacins',
    firstName: 'Robert',
    lastName: 'Bacins',
    email: 'robertbacins4182@.com',
    phone: '+33757005467',
    gender: 'Male',
    role: 'Senior Developer',
    address: '908 / Elmwood Drive',
    avatar: robertImg,
    company: 'Bacins Global Corp',
    ordersCount: 8,
    totalSpent: '$3,410',
    status: 'Pending',
    performance: {
      months: [
        { label: 'Jan', value: 30 },
        { label: 'Feb', value: 52 },
        { label: 'Mar', value: 60 },
        { label: 'Apr', value: 45 },
        { label: 'May', value: 84, isPeak: true, peakBadge: 'May 2.10k' },
        { label: 'Jun', value: 70 }
      ],
      gauge1: 65,
      gauge2: 75
    }
  },
  {
    id: 'cust-4',
    name: 'John Carilo',
    firstName: 'John',
    lastName: 'Carilo',
    email: 'john carilo182@.com',
    phone: '+33757805467',
    gender: 'Male',
    role: 'Full Stack Engineer',
    address: '3310 / Riverbed Park',
    avatar: james2Img,
    company: 'Carilo Tech',
    ordersCount: 15,
    totalSpent: '$7,900',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 40 },
        { label: 'Feb', value: 60 },
        { label: 'Mar', value: 55 },
        { label: 'Apr', value: 80, isPeak: true, peakBadge: 'Apr 1.80k' },
        { label: 'May', value: 50 },
        { label: 'Jun', value: 65 }
      ],
      gauge1: 60,
      gauge2: 65
    }
  },
  {
    id: 'cust-5',
    name: 'Adriene Watson',
    firstName: 'Adriene',
    lastName: 'Watson',
    email: 'adrienewatson82@.com',
    phone: '+83757305467',
    gender: 'Female',
    role: 'Brand Designer',
    address: '4221 / Sunset Vista Way',
    avatar: arroraImg,
    company: 'Watson Creative',
    ordersCount: 22,
    totalSpent: '$11,400',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 50 },
        { label: 'Feb', value: 70 },
        { label: 'Mar', value: 65 },
        { label: 'Apr', value: 60 },
        { label: 'May', value: 75 },
        { label: 'Jun', value: 88, isPeak: true, peakBadge: 'Jun 2.45k' }
      ],
      gauge1: 90,
      gauge2: 70
    }
  },
  {
    id: 'cust-6',
    name: 'Jhon Deo',
    firstName: 'Jhon',
    lastName: 'Deo',
    email: 'jhondeo24823@.com',
    phone: '+63475700546',
    gender: 'Male',
    role: 'Graphic Designer',
    address: '1102 / Birchwood Lane',
    avatar: jhonImg,
    company: 'Deo Media Studio',
    ordersCount: 14,
    totalSpent: '$5,820',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 35 },
        { label: 'Feb', value: 55 },
        { label: 'Mar', value: 48 },
        { label: 'Apr', value: 62 },
        { label: 'May', value: 58 },
        { label: 'Jun', value: 78, isPeak: true, peakBadge: 'Jun 1.75k' }
      ],
      gauge1: 55,
      gauge2: 60
    }
  },
  {
    id: 'cust-7',
    name: 'Mark Ruffalo',
    firstName: 'Mark',
    lastName: 'Ruffalo',
    email: 'markruffalo3735@.com',
    phone: '+33757005467',
    gender: 'Male',
    role: 'Marketing Specialist',
    address: '5561 / Grand View Terrace',
    avatar: james3Img,
    company: 'Ruffalo & Sons',
    ordersCount: 19,
    totalSpent: '$8,950',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 42 },
        { label: 'Feb', value: 68 },
        { label: 'Mar', value: 85, isPeak: true, peakBadge: 'Mar 2.05k' },
        { label: 'Apr', value: 50 },
        { label: 'May', value: 64 },
        { label: 'Jun', value: 58 }
      ],
      gauge1: 75,
      gauge2: 65
    }
  },
  {
    id: 'cust-8',
    name: 'Bethany Jackson',
    firstName: 'Bethany',
    lastName: 'Jackson',
    email: 'bethanyjackson5@.com',
    phone: '+33757005467',
    gender: 'Female',
    role: 'Customer Support Lead',
    address: '7823 / Whispering Pines Way',
    avatar: bethanyImg,
    company: 'Jackson & Partners',
    ordersCount: 31,
    totalSpent: '$22,600',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 60 },
        { label: 'Feb', value: 75 },
        { label: 'Mar', value: 68 },
        { label: 'Apr', value: 92, isPeak: true, peakBadge: 'Apr 2.80k' },
        { label: 'May', value: 70 },
        { label: 'Jun', value: 74 }
      ],
      gauge1: 80,
      gauge2: 70
    }
  },
  {
    id: 'cust-9',
    name: 'Christine Huston',
    firstName: 'Christine',
    lastName: 'Huston',
    email: 'christinehuston4@.com',
    phone: '+33757005467',
    gender: 'Male',
    role: 'QA Engineer',
    address: '2904 / Meadow Valley Road',
    avatar: bethany3Img,
    company: 'Huston Tech',
    ordersCount: 11,
    totalSpent: '$4,350',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 32 },
        { label: 'Feb', value: 48 },
        { label: 'Mar', value: 54 },
        { label: 'Apr', value: 66 },
        { label: 'May', value: 80, isPeak: true, peakBadge: 'May 1.90k' },
        { label: 'Jun', value: 60 }
      ],
      gauge1: 68,
      gauge2: 58
    }
  },
  {
    id: 'cust-10',
    name: 'Anne Jacob',
    firstName: 'Anne',
    lastName: 'Jacob',
    email: 'annejacob2@ummoh.com',
    phone: '+33757005467',
    gender: 'Male',
    role: 'Financial Analyst',
    address: '8114 / Golden Hills Lane',
    avatar: anneImg,
    company: 'Jacob Creative Co',
    ordersCount: 12,
    totalSpent: '$6,750',
    status: 'Inactive',
    performance: {
      months: [
        { label: 'Jan', value: 48 },
        { label: 'Feb', value: 62 },
        { label: 'Mar', value: 58 },
        { label: 'Apr', value: 74 },
        { label: 'May', value: 80 },
        { label: 'Jun', value: 89, isPeak: true, peakBadge: 'Jun 2.60k' }
      ],
      gauge1: 82,
      gauge2: 74
    }
  },
  {
    id: 'cust-11',
    name: 'James Mullican',
    firstName: 'James',
    lastName: 'Mullican',
    email: 'jamesmullican5346@.com',
    phone: '+33757005467',
    gender: 'Male',
    role: 'Operations Director',
    address: '6740 / Timberline Ridge',
    avatar: jamesImg,
    company: 'Mullican Global',
    ordersCount: 17,
    totalSpent: '$9,100',
    status: 'Active',
    performance: {
      months: [
        { label: 'Jan', value: 55 },
        { label: 'Feb', value: 70 },
        { label: 'Mar', value: 64 },
        { label: 'Apr', value: 58 },
        { label: 'May', value: 76 },
        { label: 'Jun', value: 85, isPeak: true, peakBadge: 'Jun 2.50k' }
      ],
      gauge1: 88,
      gauge2: 80
    }
  }
];

export const initialEvents = [
  {
    id: 'ev-1',
    title: 'Product Roadmap Sync',
    date: '2026-11-04',
    time: '10:00 AM - 11:30 AM',
    category: 'Product',
    color: '#605BFF',
    attendees: 5
  },
  {
    id: 'ev-2',
    title: 'Q4 Budget & Revenue Review',
    date: '2026-11-06',
    time: '02:00 PM - 03:00 PM',
    category: 'Finance',
    color: '#10B981',
    attendees: 8
  },
  {
    id: 'ev-3',
    title: 'Dashboard UX Design Review',
    date: '2026-11-10',
    time: '03:30 PM - 04:30 PM',
    category: 'Design',
    color: '#F59E0B',
    attendees: 4
  },
  {
    id: 'ev-4',
    title: 'All-Hands Company Meeting',
    date: '2026-11-15',
    time: '11:00 AM - 12:30 PM',
    category: 'Company',
    color: '#3B82F6',
    attendees: 32
  }
];

export const initialProductKpis = {
  totalProduct: {
    title: 'Total Product',
    value: '5,00,874',
    badge: '+1400 New Added',
    icon: badgeTotalProduct,
    strokeColor: '#4379EE'
  },
  totalSales: {
    title: 'Total Sales',
    value: '2,34,888',
    badge: '+1000 Sales Today',
    icon: badgeTotalSales,
    strokeColor: '#FFC542'
  }
};

export const initialTopSellingTable = [
  {
    id: 'tsp-1',
    sn: 1,
    isMedal: true,
    medalIcon: medalRank,
    name: 'Blutooth Devices',
    price: '$10',
    totalOrder: '34,666 Piece',
    totalSales: '$3,46,660',
    thumb: prodBluetooth
  },
  {
    id: 'tsp-2',
    sn: 2,
    isMedal: true,
    medalIcon: medalRank,
    name: 'Airdot',
    price: '$15',
    totalOrder: '20,000 Piece',
    totalSales: '$3,00,000',
    thumb: prodAirdot
  },
  {
    id: 'tsp-3',
    sn: 3,
    isMedal: true,
    medalIcon: medalRank,
    name: 'Shoes',
    price: '$10',
    totalOrder: '15,000 Piece',
    totalSales: '$1,50,000',
    thumb: prodShoes
  },
  {
    id: 'tsp-4',
    sn: 4,
    isMedal: false,
    name: 'Kids T-Shirt',
    price: '$12',
    totalOrder: '10,000 Piece',
    totalSales: '$1,20,000',
    thumb: prodTshirt
  },
  {
    id: 'tsp-5',
    sn: 5,
    isMedal: false,
    name: 'Smart Watch',
    price: '$12',
    totalOrder: '10,000 Piece',
    totalSales: '$1,20,000',
    thumb: prodWatch
  },
  {
    id: 'tsp-6',
    sn: 6,
    isMedal: false,
    name: 'Girls Top',
    price: '$12',
    totalOrder: '10,000 Piece',
    totalSales: '$1,20,000',
    thumb: prodTop
  }
];

export const initialProductAddByMonth = [
  { month: 'Jan', value: 23400, display: '23,400', color: '#FF6B4A' },
  { month: 'Feb', value: 15000, display: '15,000', color: '#4379EE' },
  { month: 'Mar', value: 30000, display: '30,000', color: '#FF6B4A' },
  { month: 'Apr', value: 22000, display: '22,000', color: '#4379EE' },
  { month: 'May', value: 10000, display: '10,000', color: '#4379EE' },
  { month: 'Jun', value: 23400, display: '23,400', color: '#FF6B4A' },
  { month: 'Jul', value: 5000, display: '5,000', color: '#4379EE' }
];

export const initialProductSalesAnalytics = {
  totalSales: { percent: 55, color: '#4379EE', label: 'Total Sales' },
  totalOrder: { percent: 30, color: '#FFC542', label: 'Total Order' },
  orderCancel: { percent: 15, color: '#FF6B4A', label: 'Order Cancel' },
  centerIcon: donutCenterTrend
};

export {
  badgeTotalProduct,
  badgeTotalSales,
  medalRank,
  prodBluetooth,
  prodAirdot,
  prodShoes,
  prodTshirt,
  prodWatch,
  prodTop,
  donutCenterTrend
};
