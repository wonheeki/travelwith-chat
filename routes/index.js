const router = require("express").Router();
const chatController = require("../controller/Cchat");

//라우터

router.get("/",chatController.main);

// 방 생성
router.post("/create",chatController.makeRoom);

// 방 이동
router.get("/room/:id",chatController.goRoom);

router.get("/roomList",chatController.roomList);

router.get("/userSearch",chatController.userSearch);
module.exports = router;