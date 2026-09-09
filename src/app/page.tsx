"use client"
import KanbanBoard from "./components/KanbanBoard";
import TaskModal from "./components/TaskModal";
import { useKanban } from "./context/KanbanContext";

export default function Home() {
  const { state, dispatch} = useKanban();
  return (
    /* PAGE WRAPPER */
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">

      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <h1 className="text-xl font-bold tracking-tight text-white">
            DevKanban
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">

          <input
            type="text"
            placeholder="Search Tasks..."
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value})}
            className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition w-full sm:w-56"
          />

          <select className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition cursor-pointer"
            value={state.priorityFilter}
            onChange={(e) => dispatch({type: "SET_PRIORITY_FILTER", payload: e.target.value as any})}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          
          <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-indigo-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
            onClick={() => dispatch({type: "OPEN_MODAL", payload: { mode: "create"}})}
          >
            + New Task
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto flex flex-col gap-6">
        <KanbanBoard/>
      </main>

      <TaskModal/>
    </div>
  );
}
