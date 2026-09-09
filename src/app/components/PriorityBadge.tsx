import { Priority } from "@/types/kanban";

type PriorityBadgeProps = {
    priority: Priority;
}

const PRIORITY_CONFIG: Record<Priority, {label: string; className: string}> = {
    low: {
        label: "Low",
        className: "bg-slate-500/15 text-slate-400 border-slate-500/30",
    },
    medium: {
        label: "Medium",
        className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    high: {
        label: "High",
        className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    urgent: {
        label: "Urgent",
        className: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    },
}

export default function PriorityBadge( {
    priority,
}: PriorityBadgeProps){
    const config = PRIORITY_CONFIG[priority]
    return (
        <span className={`inline-flex items-center px-2 py-0.5 
            rounded-full text-xs font-medium border ${config.className}`}>
            {config.label}
        </span>
    )
}