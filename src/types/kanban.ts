export type Priority = ("low" | "medium" | "high" | "urgent");

export type ColumnId = ("backlog" | "in-progress" | "in-review" | "done");

export type Column = {
    id: ColumnId;
    title: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    status: ColumnId;
    assignee?: string;
    createdAt: string;
}

export interface ModalState {
    isOpen: boolean;
    mode: "create" | "edit"
    initialStatus?: ColumnId;
    taskToEdit?: Task;
}

export interface BoardState{
    tasks: Task[];
    columns: Column[];
    searchQuery: string;
    priorityFilter: Priority | "all";
    modalState: ModalState;

}

export type KanbanAction = (
    | {type: "ADD_TASK"; payload: Omit<Task, "id" | "createdAt">}
    | {type: "MOVE_TASK"; payload: {id: string, targetStatus: ColumnId}}
    | {type: "EDIT_TASK"; payload: {id: string, updates: Partial<Omit<Task,"id">>}}
    | {type: "DELETE_TASK"; payload: {id: string}}
    | {type: "SET_SEARCH_QUERY"; payload: string} 
    | {type: "SET_PRIORITY_FILTER"; payload: Priority | "all"}
    | {type: "OPEN_MODAL"; payload: {mode: "create" | "edit", initialStatus?: ColumnId, taskToEdit?: Task}}
    | {type: "CLOSE_MODAL";}
    | {type: "INIT_TASKS"; payload: Task[]}
)
