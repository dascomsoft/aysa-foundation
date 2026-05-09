import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io;
let onlineUsers = 0;

const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;
    io = new SocketIOServer(httpServer, {
      path: '/api/chat/socket',
    });

    io.on('connection', (socket) => {
      onlineUsers++;
      io.emit('onlineUsers', onlineUsers);

      socket.on('sendMessage', (messageData) => {
        io.emit('message', messageData);
      });

      socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('onlineUsers', onlineUsers);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};