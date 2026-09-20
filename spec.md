# WebBoard — Project Specification

## Overview

WebBoard is a real-time collaborative task board. A user logs into a board by entering their name and a board number. The board has four columns: **To Do**, **In Progress**, **In Review**, **Done**. Multiple users can share the same board simultaneously, with changes synced in real time via WebSockets.

---

## Backend

### Stack
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Real-time**: Socket.io
- **Storage**: In-memory `Map` (no database)

### Storage Model

```
rooms: Map<boardId, Room>

Room {
  tasks: Map<taskId, Task>
  users: Map<socketId, userName>
}

Task {
  id: string          // uuid
  title: string
  description: string
  status: 'toDo' | 'inProgress' | 'inReview' | 'done'
  createdAt: string   // ISO date
}
```

### Socket Events

| Direction        | Event           | Payload                                      | Description                          |
|------------------|-----------------|----------------------------------------------|--------------------------------------|
| client → server  | `join`          | `{ boardId, userName }`                      | Join a board room                    |
| client → server  | `task_create`   | `{ boardId, task: Omit<Task, 'id'|'createdAt'> }` | Create a new task               |
| client → server  | `task_update`   | `{ boardId, task: Task }`                    | Update task fields (incl. status)    |
| client → server  | `task_delete`   | `{ boardId, taskId }`                        | Delete a task                        |
| client → server  | `leave`         | —                                            | Leave the board room                 |
| server → client  | `joined`        | `{ boardId, userName }`                      | Confirms successful join             |
| server → client  | `tasks`         | `Task[]`                                     | Full task list snapshot              |
| server → client  | `online_users`  | `string[]`                                   | Current usernames in room            |
| server → client  | `task_create`   | `Task`                                       | Broadcast new task to room           |
| server → client  | `task_update`   | `Task`                                       | Broadcast updated task to room       |
| server → client  | `task_delete`   | `{ taskId: string }`                         | Broadcast deleted task to room       |

### Best Practices
- Validate all incoming event payloads before processing.
- On `disconnect`, remove the user from the room and broadcast updated `online_users`.
- Keep server logic in separate modules: `server/index.js` (bootstrap), `server/socket.js` (Socket.io handlers), `server/store.js` (Map-based storage).

---

## Frontend

### Stack
- **Framework**: React 19 + TypeScript
- **Build tool**: Vite
- **State management**: Zustand
- **Styling**: CSS Modules
- **Real-time**: Socket.io-client

### Architecture: Feature-Based

```
src/
├── app/
│   ├── App.tsx              # Root: renders Login or Board based on auth store
│   └── main.tsx             # ReactDOM entry point
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm/
│   │   │       ├── LoginForm.tsx
│   │   │       └── LoginForm.module.css
│   │   ├── store/
│   │   │   └── authStore.ts     # Zustand store: userName, boardId, actions
│   │   └── index.ts             # Public API of the feature
│   └── board/
│       ├── components/
│       │   ├── Board/
│       │   │   ├── Board.tsx
│       │   │   └── Board.module.css
│       │   ├── Column/
│       │   │   ├── Column.tsx
│       │   │   └── Column.module.css
│       │   ├── TaskCard/
│       │   │   ├── TaskCard.tsx
│       │   │   └── TaskCard.module.css
│       │   └── TaskForm/
│       │       ├── TaskForm.tsx
│       │       └── TaskForm.module.css
│       ├── store/
│       │   └── boardStore.ts    # Zustand store: tasks[], onlineUsers[], actions
│       ├── hooks/
│       │   └── useSocket.ts     # Socket.io lifecycle tied to board session
│       └── index.ts
├── shared/
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── lib/
│   │   └── socket.ts            # Socket.io singleton instance
│   └── types/
│       └── board.ts             # Shared Task type and socket event types
```

### State Management (Zustand)

**`authStore`**
```ts
interface AuthStore {
  userName: string | null
  boardId: string | null
  login: (userName: string, boardId: string) => void
  logout: () => void
}
```

**`boardStore`**
```ts
interface BoardStore {
  tasks: Task[]
  onlineUsers: string[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  setOnlineUsers: (users: string[]) => void
}
```

### Best Practices
- Features are self-contained: each feature exports only through its `index.ts`.
- No cross-feature imports except through `shared/`.
- Socket event subscriptions live in `useSocket` hook, initialized once on board mount and cleaned up on unmount.
- `boardStore` is mutated only from within `useSocket` (server → client) and from user action handlers (client → server + optimistic local update).
- `shared/components` contains only generic, stateless UI primitives.
- All types are co-located with the feature that owns them; types needed across features go in `shared/types`.

---

## Communication Flow

```
User fills LoginForm
  → authStore.login(userName, boardId)
  → App renders <Board />
  → useSocket connects socket, emits `join`
  → server responds with `joined` + `tasks` + `online_users`
  → boardStore.setTasks / setOnlineUsers

User creates task
  → TaskForm submits
  → socket.emit('task_create', payload)
  → server stores task, broadcasts `task_create` to room
  → all clients: boardStore.addTask(task)

User drags/moves task to new column
  → socket.emit('task_update', { ...task, status: newStatus })
  → server updates task in Map, broadcasts `task_update`
  → all clients: boardStore.updateTask(task)
```

---

## Constraints
- No persistence layer — all data lives in server memory and is lost on restart.
- No authentication or authorization — board access is by number only.
- Socket server runs on port **5005**; frontend dev server proxies or connects directly.
- Project need to be realized with TypeScript
