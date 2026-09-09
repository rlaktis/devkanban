import { Task } from "@/types/kanban";

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Fix responsive navbar on mobile",
    description: "Hamburger menu fails to toggle on screens narrower than 640px.",
    priority: "urgent",
    status: "backlog",
    assignee: "Alex",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-2",
    title: "Integrate Stripe payment checkout",
    description: "Add webhook handler for invoice payment success and customer billing portal.",
    priority: "high",
    status: "in-progress",
    assignee: "Sam",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-3",
    title: "Refactor user profile avatar upload",
    description: "Crop uploaded images client-side before sending to S3 bucket.",
    priority: "medium",
    status: "in-review",
    assignee: "Taylor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-4",
    title: "Setup CI/CD deployment pipeline",
    description: "Automated GitHub Actions workflow for linting, testing, and Vercel preview deploys.",
    priority: "low",
    status: "done",
    assignee: "Jordan",
    createdAt: new Date().toISOString(),
  },
];