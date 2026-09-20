# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Before you start work, read @spec.md file.

## Commands

### Frontend (root directory)
```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript compile + Vite build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Backend (`server/` directory)
```bash
cd server && node index.js   # Start Socket.io server on port 5005
```

Both must run simultaneously for the app to work.

## Specification

Full project spec is in [`spec.md`](./spec.md). Read it before making significant changes. Key points:

- **Backend**: Express.js + Socket.io, in-memory `Map` storage (no DB), logic split across `server/index.js`, `server/socket.js`, `server/store.js`.
- **Frontend**: Feature-based architecture (`src/features/auth/`, `src/features/board/`, `src/shared/`). State via **Zustand** (`authStore`, `boardStore`). No cross-feature imports except through `src/shared/`.
- **Real-time flow**: `useSocket` hook (in `board` feature) manages socket lifecycle and feeds `boardStore` from server events.

## Architecture

### Frontend (`src/`)

```
src/
├── app/            # App.tsx root, main.tsx entry
├── features/
│   ├── auth/       # LoginForm component + authStore (Zustand)
│   └── board/      # Board, Column, TaskCard, TaskForm + boardStore + useSocket
└── shared/
    ├── components/ # Generic UI: Button, Input, Modal
    ├── lib/        # socket.ts singleton
    └── types/      # Shared Task type and socket event types
```

- `authStore`: `userName`, `boardId`, `login()`, `logout()`
- `boardStore`: `tasks[]`, `onlineUsers[]`, mutated only from `useSocket` and user action handlers
- Each feature exports through its own `index.ts`

### Backend (`server/`)

- Storage: `Map<boardId, { tasks: Map<taskId, Task>, users: Map<socketId, userName> }>`
- Socket events (client→server): `join`, `task_create`, `task_update`, `task_delete`, `leave`
- Socket events (server→client): `joined`, `tasks`, `online_users`, `task_create`, `task_update`, `task_delete`
- Task statuses: `toDo | inProgress | inReview | done`
