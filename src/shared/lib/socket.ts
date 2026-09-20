import { io, type Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '../types/board';

export type BoardSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SERVER_URL = 'http://localhost:5005';

export const socket: BoardSocket = io(SERVER_URL, { autoConnect: false });
