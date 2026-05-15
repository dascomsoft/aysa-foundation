
import { Server } from 'socket.io';

export async function GET() {
  if (!global.io) {
    console.log('🟢 Starting Socket.IO server...');
    
    global.io = new Server({
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
      path: '/api/socket',
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    global.io.on('connection', (socket) => {
      const count = global.io.engine.clientsCount;
      global.io.emit('onlineUsers', count);
      console.log(`🔵 User connected. Online: ${count}`);

      socket.on('sendMessage', (msg) => {
        global.io.emit('message', msg);
      });

      socket.on('disconnect', () => {
        const count = global.io.engine.clientsCount;
        global.io.emit('onlineUsers', count);
        console.log(`🔴 User disconnected. Online: ${count}`);
      });
    });

    // Attacher à un port spécifique si nécessaire
    if (!global.io.httpServer) {
      console.log('✅ Socket.IO server ready');
    }
  }

  return new Response(JSON.stringify({ status: 'Socket.IO server ready' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
