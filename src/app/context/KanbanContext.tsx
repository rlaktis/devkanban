"use client";
import { BoardState, Column, KanbanAction, Task } from "@/types/kanban"
import { createContext, useContext, useEffect, useReducer, useRef, useState, type ReactNode } from "react"
import { INITIAL_TASKS } from "../tasks/tasks";

const INITIAL_COLUMNS: Column[] = [
  { id: "backlog", title: "Backlog" },
  { id: "in-progress", title: "In Progress" },
  { id: "in-review", title: "In Review" },
  { id: "done", title: "Done" },
];

const initialState: BoardState = {
    tasks: INITIAL_TASKS,
    columns: INITIAL_COLUMNS,
    searchQuery: "",
    priorityFilter: "all",
    modalState: {
        isOpen: false,
        mode: "create",
    }
}

interface KanbanContextType {
    state: BoardState,
    dispatch: React.Dispatch<KanbanAction>,
}

const KanbanContext = createContext<KanbanContextType | null>(null);

function kanbanReducer(state: BoardState, action: KanbanAction) : BoardState{
    switch (action.type){
        case "ADD_TASK": {
            const id = crypto.randomUUID();
            const createdAt = new Date().toString();
            const newTask : Task = {
                ...action.payload,
                id,
                createdAt,
            };
            
            return {
                ...state,
                tasks: [...state.tasks, newTask],
                modalState: {
                    ...state.modalState,
                    isOpen: false,
                },
            };
        }
        case "DELETE_TASK": {
            const updatedTasks: Task[] = state.tasks.filter((task) => task.id !== action.payload.id)
            return {
                ...state,
                tasks: updatedTasks,
            }
        } 
        case "EDIT_TASK": {
            const updatedTasks = state.tasks.map((task) => task.id === action.payload.id
                ?  {...task, ...action.payload.updates}
                :  task
            )

            return {
                ...state,
                tasks: updatedTasks,
                modalState: {
                    ...state.modalState,
                    isOpen: false,
                }
            }
        }
        case "MOVE_TASK": {
            const updatedTasks = state.tasks.map((task) => task.id === action.payload.id
                ? {...task, status: action.payload.targetStatus}
                : task
            )

            return {
                ...state,
                tasks: updatedTasks,
            }
        }
        case "SET_SEARCH_QUERY":{
            return {
                ...state,
                searchQuery: action.payload,
            }
        }
        case "SET_PRIORITY_FILTER":{
            return {
                ...state,
                priorityFilter: action.payload,
            }
        }
        case "OPEN_MODAL":{
            return {
                ...state,
                modalState: {
                    isOpen: true,
                    ...action.payload,
                }
            }
        }
            
        case "CLOSE_MODAL":{
            return {
                ...state,
                modalState: {
                    isOpen: false,
                    mode: "create",
                }
            }
        }
        case "INIT_TASKS":{
            return {
                ...state,
                tasks: action.payload,
            }
        }
        default:
            return state;
    }
}

export default function KanbanProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(kanbanReducer, initialState);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const savedTasks = localStorage.getItem("devkanban_tasks");
            if (savedTasks) {
                dispatch({
                    type: "INIT_TASKS",
                    payload: JSON.parse(savedTasks),
                });
            }
        } catch (error) {
            console.error("Failed to load tasks from localStorage", error);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem("devkanban_tasks", JSON.stringify(state.tasks));
        } catch (error) {
            console.error("Failed to save tasks to localStorage", error);
        }
    }, [state.tasks, isHydrated]);

    return (
        <KanbanContext.Provider 
            value={{ state, dispatch }}
        >
            {children}
        </KanbanContext.Provider>
    );
}

export function useKanban() {
    const context = useContext(KanbanContext);

    if (!context){
        throw new Error("useKanban must me used within a KanbanProvider")
    }

    return context;
}