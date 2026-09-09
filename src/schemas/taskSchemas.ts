import { z } from "zod";


export const taskSchema = z.object({
    title: z.string().trim().min(3, "Title must be atleast 3 characters"),
    description: z.string().max(500, "description can only be 500 characters").optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    status: z.enum(["backlog", "in-progress", "in-review", "done"]),
    assignee: z.string().optional(),
})


export type TaskFormData = z.infer<typeof taskSchema>;