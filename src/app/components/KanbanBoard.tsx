"use client"
import { Task } from "@/types/kanban";
import { useKanban } from "../context/KanbanContext"
import { useMemo } from "react";
import CanbanColumn from "./CanbanColumn";

export default function KanbanBoard(){
    const { state } = useKanban();
    const { tasks, columns, searchQuery, priorityFilter} = state;
    
    const filteredTasks = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        return tasks.filter((task) => {
            const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
            const matchesSearch = query === ""
                || task.title.toLowerCase().includes(query)
                || task.description && task.description.toLowerCase().includes(query)

            return matchesPriority && matchesSearch;
        
        });
    }, [tasks, priorityFilter, searchQuery])
    return (
        /* BOARD WRAPPER */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {columns.map((column) => {
                    const columnTasks = filteredTasks.filter((task) => task.status === column.id);
                    return (
                        <CanbanColumn
                            key={column.id}
                            tasks={columnTasks}
                            column={column}
                        />
                    )
                })}
        </div>
    )
}