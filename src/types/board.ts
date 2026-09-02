export type TaskStatus = 'toDo' | 'inProgress' | 'inReview' | 'done';

export interface Task {
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
    createdAt: string,
}

export interface ServerToClientEvents {
    task_create: (data: string) => void,
    task_update: (data: string) => void,
    joined: (data: string) => void,
    online_users: (data: string) => void,
    tasks: (data: string) => void,
}

export interface ClientToServerEvents {
    task_create: (data: string) => void,
    task_update: (data: string) => void,
    join: (data: string) => void,
    leave: () => void,
}
