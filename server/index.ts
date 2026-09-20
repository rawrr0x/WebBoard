import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { registerSocketHandlers } from './socket.js';

const app = express();
const server = http.createServer(app);
const PORT = 5005;

const io = new Server(server, {
  cors: { origin: '*' },
});

app.get('/', (_req, res) => {
  res.send('WebBoard server is running');
});

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Board app listening on port ${PORT}`);
});
