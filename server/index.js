import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = 5005;

const rooms = new Map();

app.get('/', (req, res) => {
  res.send('Real-Time tasks board')
});

// task: {
//     id: string,
//     status: string,
//     title: string,
//     description: string,
// }

const getRoom = (roomName) => {
  if (!rooms.has(roomName)) {
    rooms.set(roomName, { users: new Map(), tasks: [] });
  }

  return rooms.get(roomName);
};

const broadcastOnlineUsers = (roomName) => {
  const room = rooms.get(roomName);

  if (!room) return;

  const users = Array.from(room.users.values());
  io.to(roomName).emit('online_users', JSON.stringify(users));
};

const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    const { userName, roomName } = JSON.parse(data);

    const isNewRoom = !rooms.has(roomName);
    const room = getRoom(roomName);

    socket.data.userName = userName;
    socket.data.roomName = roomName;

    console.log(userName + ' connected');

    socket.join(roomName);
    room.users.set(socket.id, userName);

    socket.emit('tasks', JSON.stringify(room.tasks));
    socket.emit('joined', JSON.stringify({ roomName, isNewRoom }));
    broadcastOnlineUsers(roomName);
  });

//   socket.on('typing', () => {
//     const { userName, roomName } = socket.data;

//     if (!roomName) return;

//     socket.to(roomName).emit('typing', userName);
//   });

//   socket.on('stop_typing', () => {
//     const { userName, roomName } = socket.data;

//     if (!roomName) return;

//     socket.to(roomName).emit('stop_typing', userName);
//   });

  socket.on('task_create', (data) => {
    const { userName, roomName } = socket.data;

    if (!roomName) return;

    const room = getRoom(roomName);
    room.tasks.push(JSON.parse(data));

    io.to(roomName).emit('task_create', data);
  });

  const leaveRoom = () => {
    const { userName, roomName } = socket.data;

    if (!roomName) return;

    const room = rooms.get(roomName);

    if (room) room.users.delete(socket.id);

    // socket.to(roomName).emit('stop_typing', userName);
    socket.leave(roomName);
    socket.data.roomName = null;

    broadcastOnlineUsers(roomName);
  };

  socket.on('leave', leaveRoom);
  socket.on('disconnect', leaveRoom);
});

server.listen(port, () => {
  console.log(`Board app listening on port ${port}`)
});
