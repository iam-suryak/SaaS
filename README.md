# Base - SaaS Admin Dashboard (React.js)

A pixel-perfect implementation of the **Base SaaS Admin Dashboard UI Kit** designed in Figma. Built with **React 18**, **Tailwind CSS**, and modern component-driven architecture.

## 🚀 Features & Modules

### 1. Dashboard Overview
* **4 Metric KPI Cards**: Save Products (`178+`), Stock Products (`20+`), Sales Products (`190+`), Job Applications (`12+`).
* **Interactive Reports Spline Chart**: Smooth cubic bezier curve with gradient strokes, gradient area fill, and interactive hover tooltip showing Sales (`2,678`) at 03am with dashed guide line.
* **Custom Analytics 3-Segment Donut**: Segmented breakdown of Transactions (Sale: 40%, Distribute: 35%, Return: 25%) with center total `80%` and interactive hover legend.
* **Recent Orders Table**: Real orders with tracking numbers, product thumbnails, price, pill badge total order count, and total amount with sortable columns.
* **Top Selling Products**: NIKE Shoes Black Pattern, iPhone 12, rating stars, and pricing cards.

### 2. Invoice Management (`/invoice`)
* Complete invoice data table with checkboxes for multi-select.
* Status pills: `Complete` (Green), `Pending` (Amber), `Cancel` (Red).
* Status filters (`All`, `Complete`, `Pending`, `Cancel`).
* Bulk actions & deletion.
* Interactive **+ Add New Invoice** modal with instant state update.
* Star favorite toggle for high-priority invoices.

### 3. Task Preview & Schedule Kanban Board (`/schedule`)
* View switcher: **Board**, **List**, **Timeline**.
* 4 Columns: **ToDo**, **In Progress**, **In Review**, **Done**.
* Cards with priority tags (`Low`, `Medium`, `High`) and status badges (`On Track`, `At risk`).
* UI mockup and image attachments.
* Comments, likes count, and stacked avatar group.
* Interactive **+ Add Task** modal and card status mover.

### 4. Calendar & Event Scheduler (`/calendar`)
* Month grid view, day view, and year view.
* Current day highlight and colored event badges.
* Interactive **Create Event** modal with category color picker and date/time selector.

### 5. Messages & Chat System (`/messages`)
* Split-view chat layout: Contact conversation list with unread counter badges and status indicators (Online/Away/Offline).
* Interactive messaging thread: Sent/Received bubbles with timestamp, file attachment preview card (`Base_SaaS_Dashboard.fig`), and real-time message sending.

### 6. Analytics Deep Dive (`/analytics`)
* In-depth conversion metrics, revenue trends, and comparative performance.

### 7. Customer Directory (`/customers`)
* Contact directory with company name, email, phone, total spend, order count, and **Add Customer** modal.

### 8. Settings & Profile (`/settings`)
* User profile editing (`Easin Arafat`), notification toggles, billing & plan management, security settings.

### 9. Authentication & Onboarding Modals
* **Sign In** screen with Figma illustration and remember me.
* **Sign Up** screen with illustration.
* **Recover Password** flow and confirmation success screen.

### 10. Responsive & Collapsible Sidebar
* Toggle between collapsed icon mode and expanded sidebar mode.
* Hanging lamp promotional card with **Upgrade Now** CTA and Pro upgrade modal.

---

## 🛠️ Technology Stack
* **React 18**
* **Vite** (Blazing fast bundling & HMR)
* **Tailwind CSS** (Custom palette, typography, shadows)
* **Lucide React** (Clean, modern SVG iconography)
* **Plus Jakarta Sans** (Figma design typography)

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
```bash
npm run preview
```
