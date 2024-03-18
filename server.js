const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const db = require('./model/index');
const app = express();
const cors = require('cors');

const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
  origin: 'http://localhost:8080', // 스프링 서버 주소
  credentials: true, // 크로스 도메인 요청 시 쿠키를 허용
  exposedHeaders: ['Authorization'] // 클라이언트가 접근할 수 있도록 허용할 헤더 목록
}));
// Node.js / Express
const jwt = require('jsonwebtoken');

// app.get('/some-endpoint', (req, res) => {
    
// });



//미들웨어
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const chatSocket = require('./sockets/chatSocket');
chatSocket(io); // io 객체를 넘겨주면서 chatSocket 함수 호출

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log(err);
})


//서버오픈
// server.listen(PORT, () => {
//   console.log(`http://localhost:${PORT}`);
// });
