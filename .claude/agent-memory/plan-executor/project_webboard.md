---
name: WebBoard project architecture
description: Architecture, conventions, and key decisions for the WebBoard real-time task board project
type: project
---

Feature-based frontend architecture with Zustand state management. React 19 + TypeScript + Vite frontend, Express + Socket.io backend.

**Why:** Plan required migration from old context/hooks/components structure to spec-defined feature-based layout.

**How to apply:** When editing this project, respect the feature isolation — auth and board features communicate only through shared/. No cross-feature imports except Board→auth for logout.

Key facts:
- Server runs on port 5005 (tsx index.ts)
- Frontend connects via socket.io-client to http://localhost:5005
- Backend uses NodeNext moduleResolution — .js extensions required in TS import paths
- authStore (Zustand): userName, boardId, login, logout
- boardStore (Zustand): tasks[], onlineUsers[], CRUD actions
- useSocket hook manages socket lifecycle (connect on mount, disconnect on unmount)
- socket singleton in shared/lib/socket.ts with autoConnect: false
- All shared types in src/shared/types/board.ts (Task, TaskStatus, socket event interfaces)
