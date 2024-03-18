const { Sequelize,sequelize,User } = require("../model/index");
const rooms = require("../model/Room");

exports.main = (req,res)=>{
    res.render("index", { rooms });
}

exports.makeRoom =(req,res)=>{
    const roomId = req.body.id;
    if (!rooms[roomId]) {
      //방이 존재하지 않는다면 생성
      rooms[roomId] = { users: {} };
    }
    //방으로 리다이렉트
    res.redirect(`/room/${roomId}`);
}

exports.goRoom=(req,res)=>{
    const roomId = req.params.id;
    res.render("room", { roomId: roomId });
}
const jwt = require('jsonwebtoken');
exports.roomList = (req, res) => {
    console.log(req.headers);
    const token = req.headers.authorization?.split(' ')[1]; // 'Bearer '를 제거하는 과정에 옵셔널 체이닝 추가
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    

    // res.render("roomList")를 jwt.verify 콜백 안으로 이동
    // 이렇게 하면 토큰이 유효한 경우에만 roomList를 렌더링함
    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        // 토큰이 유효한 경우, decoded에는 토큰에 담겨있는 사용자 정보가 포함됨
        console.log(decoded);
        res.render("roomList", { decoded }); // res.render 호출
    });
}

  
exports.userSearch =async (req,res)=>{
    const nickname = req.query.u_nickname;
    console.log(nickname);
    const userData = await User.findAll({
        where: {
            u_nickname: {
                [Sequelize.Op.like]: `%${nickname}%`
            }
        }
    });
    console.log({userData});
    // const data = JSON.stringify(userData)
    // console.log(data);
    res.send( {userData:userData});
}