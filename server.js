const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const PORT = 8000;

const server = http.createServer(app);
const io = socketIo(server);

//채팅방 정보 저장변수
const rooms = {};

//미들웨어
app.set("view engine", "ejs");
app.use(express.urlencoded({ extends: true }));

//라우터
app.get("/", (req, res) => {
  res.render("index", { rooms });
});

//방생성
app.post("/create", (req, res) => {
  const roomId = req.body.id;
  if (!rooms[roomId]) {
    //방이 존재하지 않는다면 생성
    rooms[roomId] = { users: {} };
  }
  //방으로 리다이렉트
  res.redirect(`/room/${roomId}`);
});

//방접속
app.get("/room/:id", (req, res) => {
  const roomId = req.params.id;
  res.render("room", { roomId: roomId });
});

//소켓
io.on("connection", (socket) => {
  //사용자가 방에 입장시
  socket.on("join", (roomId, userId) => {
    console.log(userId);
    //소켓io의 방에 입장
    socket.join(roomId);
    //방 정보에 사용자 정보 추가
    rooms[roomId].users[socket.id] = userId;
    //방에 있는 사용자에게 다른 사용자 연결 알림
    socket.to(roomId).emit("userJoin", userId);
  });

  //메세지 전송
  socket.on("send-message", (message, roomId) => {
    console.log(message);
    socket
      .to(roomId)
      .emit("message", { message, userId: rooms[roomId].users[socket.id] });
  });
});

//서버오픈
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
