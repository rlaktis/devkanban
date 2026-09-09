import { ColumnId, Task } from "@/types/kanban";
import { useKanban } from "../context/KanbanContext";
import PriorityBadge from "./PriorityBadge";

type TaskCardProps = {
    task: Task;
}
export default function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useKanban();

  const COLUMN_ORDER: ColumnId[] = ["backlog", "in-progress", "in-review", "done"];
  const currentIndex = COLUMN_ORDER.indexOf(task.status);
  const prevStatus = COLUMN_ORDER[currentIndex - 1];
  const nextStatus = COLUMN_ORDER[currentIndex + 1];

  return (
    /* CARD WRAPPER */
    <div className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-3 group">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2">
        {/* PRIORITY BADGE */}
        <div>
          <PriorityBadge priority={task.priority} />
        </div>

        {/* REMOVE + EDIT */}
        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
          <button
            className="text-xs px-2 py-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            onClick={() =>
              dispatch({
                type: "OPEN_MODAL",
                payload: {
                  mode: "edit",
                  taskToEdit: task,
                },
              })
            }
          >
            EDIT
          </button>

          <button
            className="text-xs px-2 py-1 rounded bg-slate-700/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition cursor-pointer font-bold"
            onClick={() =>
              dispatch({
                type: "DELETE_TASK",
                payload: {
                  id: task.id,
                },
              })
            }
          >
            ✕
          </button>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-sm font-semibold text-slate-100 leading-snug break-words">
        {task.title}
      </h3>

      {/* DESCRIPTION */}
      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed break-words">
          {task.description}
        </p>
      )}

      {/* ASSIGNEE */}
      {task.assignee && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 border-t border-slate-700/40">
          <span>👤 {task.assignee}</span>
        </div>
      )}

      {/* FOOTER (MOVE CONTROLS) */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-700/40 text-xs">
        {prevStatus ? (
          <button
            onClick={() =>
              dispatch({
                type: "MOVE_TASK",
                payload: {
                  id: task.id,
                  targetStatus: prevStatus,
                },
              })
            }
            className="px-2.5 py-1 rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition font-medium cursor-pointer"
          >
            ← Move Left
          </button>
        ) : (
          <div />
        )}

        {nextStatus && (
          <button
            onClick={() =>
              dispatch({
                type: "MOVE_TASK",
                payload: {
                  id: task.id,
                  targetStatus: nextStatus,
                },
              })
            }
            className="px-2.5 py-1 rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition font-medium cursor-pointer ml-auto"
          >
            Move Right →
          </button>
        )}
      </div>
    </div>
  );
}