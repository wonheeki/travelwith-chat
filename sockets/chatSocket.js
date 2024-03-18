//채팅방 정보 저장변수
const rooms = require("../model/Room");
const chatSocket=(io) =>{
    io.on('connection', (socket) => {
      socket.on('join', (roomId, userId) => {
        if (!rooms[roomId]) { // 방이 존재하지 않는 경우 초기화
          rooms[roomId] = { users: {} };
        }
        console.log(`${userId} joined ${roomId}`);
        socket.join(roomId);
        rooms[roomId].users[socket.id] = userId;
        socket.to(roomId).emit('userJoin', userId);
      });
  
      socket.on('send-message', (message, roomId) => {
        console.log(message);
        if (rooms[roomId] && rooms[roomId].users[socket.id]) {
          socket.to(roomId).emit('message', { message, userId: rooms[roomId].users[socket.id] });
        }
      });
    });
  }
  
  module.exports = chatSocket;