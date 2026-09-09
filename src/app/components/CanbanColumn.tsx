import { Column, ColumnId, Task } from "@/types/kanban";
import TaskCard from "./TaskCard";
import { useKanban } from "../context/KanbanContext";

type CanbanColumnProps = {
    tasks: Task[];
    column: Column;
}

export default function CanbanColumn({ tasks, column }: CanbanColumnProps) {
  const { dispatch } = useKanban();

  return (
    /* COLUMN WRAPPER */
    <div className="flex-1 min-w-[280px] bg-slate-900/40 rounded-2xl border border-slate-800/80 p-4 flex flex-col gap-4 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="font-bold text-sm tracking-wide text-slate-200 flex items-center gap-2 uppercase">
          {column.title}
        </div>

        <div className="bg-slate-800 text-slate-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-slate-700/50">
          {tasks.length}
        </div>
      </div>

      {/* CARDS */}
      <div className="flex-1 flex flex-col gap-3 min-h-[120px]">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-28 border-2 border-dashed border-slate-800/80 rounded-xl text-xs text-slate-500 font-medium">
            No tasks in this column
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      {/* ADD CARD */}
      <button
        className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-700/60 hover:border-slate-500 bg-slate-800/20 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer flex items-center justify-center gap-1.5"
        onClick={() =>
          dispatch({
            type: "OPEN_MODAL",
            payload: {
              mode: "create",
              initialStatus: column.id,
            },
          })
        }
      >
        + Add Card
      </button>
    </div>
  );
}

