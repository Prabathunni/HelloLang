// services/socket.js
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Message = require('../model/MessageSchema.js');
const User = require('../model/userSchema.js');

function setupSocket(server) {

  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', credentials: true }
  });

  // 1) Authenticate via JWT in cookies
  io.use(async (socket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;
      console.log("Received cookie:", rawCookie);

      const token = rawCookie
        ?.split('; ')
        .find(c => c.startsWith('token='))
        ?.split('=')[1];

      
      if (!token) {
        console.log("❌ No token found in cookie");
        return next(new Error("Token missing"));
      }

      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(userId);

      if (!user) {
        console.log("❌ User not found");
        return next(new Error("Invalid user"));
      }

      socket.user = user;
      next(); // ✅ allow connection
    } catch (err) {
      console.error("❌ Socket auth failed:", err.message);
      next(new Error("Unauthorized"));
    }
  });

  io.on('connection', socket => {
    const me = socket.user._id.toString();
    console.log(`🟢 ${socket.user.username} connected`);

    // join a room named after the user’s ID
    socket.join(me);

    // handle outgoing messages
    socket.on('sendMessage', async ({ toId, text }) => {
      // 1) save to DB
      const msg = await Message.create({ sender: me, receiver: toId, text });
      // 2) emit to receiver’s room
      io.to(toId).emit('receiveMessage', msg);
      // 3) also emit back to sender so they see it
      socket.emit('receiveMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log(`🔴 ${socket.user.username} disconnected`);
    });
  });
}

module.exports = setupSocket;
