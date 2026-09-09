# DevKanban // Task & Productivity Board

A sleek, modern Kanban task management dashboard built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Zod** schema validation.

---

##  Features

- ** Centralized Action Reducer & Store (`context/KanbanContext.tsx`):**
  - Global `useReducer` state engine handling pure immutable state transitions across actions (`ADD_TASK`, `MOVE_TASK`, `EDIT_TASK`, `DELETE_TASK`, `SET_SEARCH_QUERY`, `SET_PRIORITY_FILTER`, `OPEN_MODAL`, `CLOSE_MODAL`, `INIT_TASKS`).
  - Fail-safe `useKanban()` custom consumer hook with automatic provider boundary error checking.

- ** 4-Stage Kanban Pipeline:**
  - **Backlog**: Staged backlog tasks and future ideas.
  - **In Progress**: Active items currently under development.
  - **In Review**: Items undergoing code review or QA verification.
  - **Done**: Shipped and completed tasks.
  - Individual column task counter badges and subtle empty-state placeholders.

- ** Dynamic Card Shift Controls (`components/TaskCard.tsx`):**
  - Context-aware Move Left (`←`) and Move Right (`→`) buttons that dynamically compute adjacent column targets and hide at pipeline boundaries (`Backlog` and `Done`).

- ** Controlled Task Modal with Zod Validation (`components/TaskModal.tsx`):**
  - **Runtime Schema Validation (`schemas/taskSchemas.ts`)**: Validates title length, description constraints, priority enums, and column status with real-time inline error messaging.
  - **Dual-Mode Create / Edit Support**: Pre-fills task values when editing and pre-selects column status when adding from a specific column.
  - **Backdrop Overlay**: Click-outside backdrop dismissal with `e.stopPropagation()` event handling.

- ** In-Memory Analytics & Search Filtering (`useMemo`):**
  - **Real-Time Text Search**: Instant case-insensitive matching across task titles and descriptions.
  - **Priority Filter Dropdown**: Instant filter by priority level (`All`, `Low`, `Medium`, `High`, `Urgent`).
  - **Optimized Memoization**: Caches filtered task lists to avoid redundant calculations across card movements.

- ** Tagged Priority Badges (`components/PriorityBadge.tsx`):**
  - Color-coded priority tags (`Low`, `Medium`, `High`, `Urgent`) powered by a type-safe lookup dictionary (`Record<Priority, ...>`).

- ** LocalStorage Persistence with Hydration Safety:**
  - Automatic bidirectional synchronization with browser `localStorage` (`devkanban_tasks`).
  - Gated hydration check (`isHydrated`) to prevent Next.js SSR hydration mismatch errors on initial page load.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Schema Validation:** [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

##  Project Architecture

```text
src/
├── app/
│   ├── components/
│   │   ├── CanbanColumn.tsx      # Single column wrapper with counter pill & card list
│   │   ├── KanbanBoard.tsx       # Responsive 4-column CSS grid container & useMemo filtering
│   │   ├── PriorityBadge.tsx     # Color-coded priority pill indicator with typed lookup
│   │   ├── TaskCard.tsx          # Individual task card with edit, delete & move triggers
│   │   └── TaskModal.tsx         # Controlled dialog form with Zod schema validation
│   ├── context/
│   │   └── KanbanContext.tsx     # Centralized store, pure reducer & localStorage sync
│   ├── tasks/
│   │   └── tasks.ts              # Default seed mock tasks for first-time onboarding
│   ├── globals.css               # Global Tailwind CSS styles & dark theme defaults
│   ├── layout.tsx                # Root layout wrapping application with KanbanProvider
│   └── page.tsx                  # Main dashboard header toolbar & board view
├── schemas/
│   └── taskSchemas.ts            # Zod validation schema & inferred TaskFormData type
└── types/
    └── kanban.ts                 # TypeScript interfaces for Task, Column, Priority & Actions
```

---

##  Getting Started

### Prerequisites
Make sure you have **Node.js 18+** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OvatTheLegend/devkanban.git
   cd devkanban
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---
