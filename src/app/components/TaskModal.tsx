import { useEffect, useState } from "react";
import { useKanban } from "../context/KanbanContext"
import { TaskFormData, taskSchema } from "@/schemas/taskSchemas";

export default function TaskModal(){
    const { state, dispatch } = useKanban();
    const { modalState } = state;
    
    const DEFAULT_FORM: TaskFormData = {
        title: "",
        description: "",
        priority: "medium",
        status: "backlog",
        assignee: "",
    }

    const [formData, setFormData] = useState<TaskFormData>(DEFAULT_FORM);
    const [errors, setErrors] = useState<Record<string,string>>({})

    useEffect(() => {
        if (modalState.mode === "edit" && modalState.taskToEdit){
            setFormData({
                title: modalState.taskToEdit.title,
                description: modalState.taskToEdit.description || "",
                priority: modalState.taskToEdit.priority,
                status: modalState.taskToEdit.status,
                assignee: modalState.taskToEdit.assignee || "",
            });
        } else {
            setFormData({
                ...DEFAULT_FORM,
                status: modalState.initialStatus || "backlog",
            });
            setErrors({});
        }
    }, [modalState.isOpen, modalState.mode, modalState.taskToEdit, modalState.initialStatus])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = taskSchema.safeParse(formData);

        if (!result.success){
            const fieldErrors: Record<string,string> = {};
            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                fieldErrors[fieldName] = issue.message;
            });
            setErrors(fieldErrors)
        } else {
            setErrors({});
            if (modalState.mode === "create"){
                dispatch({
                    type: "ADD_TASK",
                    payload: result.data,
                })
            }

            else if (modalState.mode === "edit" && modalState.taskToEdit) {
                dispatch({
                    type: "EDIT_TASK",
                    payload: {
                        id: modalState.taskToEdit.id,
                        updates: result.data,
                    }
                })
            }
        }
    }
    if (!modalState.isOpen) return null;
    return (
        /* BACKDROP */
        <div 
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => dispatch({type: "CLOSE_MODAL"})}
        >
            {/* DIALOG CARD */}
            <div 
                className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 flex flex-col gap-5 text-slate-100 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h2 className="text-lg font-bold text-white">
                        {modalState.mode === "create"
                            ? "Create New Task"
                            : "Edit Task"
                        }
                    </h2>

                    <button
                        type="button"
                        onClick={() => dispatch({type: "CLOSE_MODAL"})}
                        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer text-lg leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* FORM BODY */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* TITLE */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">Task Title <span className="text-rose-400">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. Implement optimistic UI updates"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className={`bg-slate-800/90 border rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 transition ${
                                errors.title ? "border-rose-500/80 focus:ring-rose-500/40" : "border-slate-700/80 focus:ring-indigo-500/50 focus:border-indigo-500"
                            }`}
                        />
                        {errors.title && <p className="text-xs text-rose-400 font-medium">{errors.title}</p>}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Detailed notes, criteria, or steps..."
                            value={formData.description || ""}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition resize-none"
                        />
                        {errors.description && <p className="text-xs text-rose-400 font-medium">{errors.description}</p>}
                    </div>

                    {/* PRIORITY & STATUS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-300">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                                className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition cursor-pointer"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-300">Column Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition cursor-pointer"
                            >
                                <option value="backlog">Backlog</option>
                                <option value="in-progress">In Progress</option>
                                <option value="in-review">In Review</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>

                    {/* ASSIGNEE */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">Assignee</label>
                        <input
                            type="text"
                            placeholder="e.g. Alex Johnson"
                            value={formData.assignee || ""}
                            onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                            className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                        />
                    </div>
                    
                    {/* BUTTON WRAPPER */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 mt-2">
                        <button
                            type="button"
                            onClick={() => dispatch({type: "CLOSE_MODAL"})}
                            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold px-5 py-2 rounded-xl shadow-sm hover:shadow-indigo-500/20 transition cursor-pointer"
                        >
                            {modalState.mode === "create" ? "Create Task 🚀" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}