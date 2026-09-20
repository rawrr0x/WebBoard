---
name: WebBoard project context
description: Real-time collaborative task board - React 19 + Vite + Socket.io + Zustand, feature-based architecture, in-memory backend
type: project
---

WebBoard is a real-time collaborative task board with 4 columns (To Do, In Progress, In Review, Done). Users join by name + board number. Backend is Express 5 + Socket.io on port 5005, frontend is React 19 + TypeScript + Vite + Zustand + CSS Modules.

**Why:** University project (hw6) requiring specific feature-based architecture with Zustand stores, socket.io singleton, and TypeScript throughout (including backend).

**How to apply:** Plans must follow the spec.md directory structure exactly. Backend must be split into index.ts, socket.ts, store.ts. Frontend uses features/auth and features/board with barrel exports. Zustand replaces React Context for state. The server currently uses plain JS and JSON.stringify for socket events - needs migration to TypeScript with proper typed events.
