const Sequelize = require('sequelize');
const config = require(__dirname+'/../config/config.json')[process.env.NODE_ENV || 'development'];
const db ={};

config.username = process.env.DB_USERNAME || config.username;
config.password = process.env.DB_PASSWORD || config.password;
config.database = process.env.DB_DATABASE || config.database;
config.host = process.env.DB_HOST || config.host;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    )

// TODO: 모델 모듈 불러오기 
const User = require('./User')(sequelize, Sequelize);
const Rooms = require('./Rooms')(sequelize, Sequelize);
const Messages = require('./Messages')(sequelize, Sequelize);
const RoomMembers = require('./RoomMembers')(sequelize, Sequelize);
const Comment = require("./Comment")(sequelize,Sequelize);
const Board = require('./Board')(sequelize,Sequelize);


// User와 RoomMembers 1:다 설정
User.hasMany(RoomMembers, {
    foreignKey: 'u_id',  // RoomMembers 테이블의 외래 키
    sourceKey: 'u_id',    // User 테이블의 소스 키
    onDelete:'CASCADE',
    onUpdate:'CASCADE',     
});

RoomMembers.belongsTo(User, {
    foreignKey: 'u_id',  // RoomMembers 테이블의 외래 키
    targetKey: 'u_id'    // User 테이블의 타겟 키
});



User.hasMany(Messages, {
    foreignKey: 'message_from', 
    sourceKey: 'u_id',    
    onDelete:'CASCADE',
    onUpdate:'CASCADE',     
});

Messages.belongsTo(User, {
    foreignKey: 'message_from',  
    targetKey: 'u_id',
});



Rooms.hasMany(RoomMembers, {
    foreignKey: 'room_id',  
    sourceKey: 'room_id',    
    onDelete:'CASCADE',
    onUpdate:'CASCADE',     
});

RoomMembers.belongsTo(Rooms, {
    foreignKey: 'room_id',  
    targetKey: 'room_id',  
});



Rooms.hasMany(Messages, {
    foreignKey: 'room_id',  
    sourceKey: 'room_id',   
    onDelete:'CASCADE',
    onUpdate:'CASCADE',     
});

Messages.belongsTo(Rooms, {
    foreignKey: 'room_id',  
    targetKey: 'room_id',  
});



User.hasMany(Board, {
    foreignKey: 'u_id',  // RoomMembers 테이블의 외래 키
    sourceKey: 'u_id',    // User 테이블의 소스 키
    onDelete:'CASCADE',
    onUpdate:'CASCADE',     
});

Board.belongsTo(User, {
    foreignKey: 'u_id',  // RoomMembers 테이블의 외래 키
    targetKey: 'u_id'    // User 테이블의 타겟 키
});



Board.hasMany(Comment, {
    foreignKey: 'b_no',  // RoomMembers 테이블의 외래 키
    sourceKey: 'b_no',    // User 테이블의 소스 키
    onDelete:'CASCADE',
    onUpdate:'CASCADE',     
});

Comment.belongsTo(Board, {
    foreignKey: 'b_no',  // RoomMembers 테이블의 외래 키
    targetKey: 'b_no'    // User 테이블의 타겟 키
});

Comment.hasMany(Comment, {
    as: 'Replies', // 자식 댓글을 가리키는 별칭
    foreignKey: 'c_js_no', // 자식 댓글이 부모 댓글의 ID를 참조하는 외래 키
    sourceKey: 'c_no', // Comment 테이블의 기본 키, id가 기본 키라고 가정
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Comment.belongsTo(Comment, {
    as: 'Parent', // 부모 댓글을 가리키는 별칭
    foreignKey: 'c_js_no', // 자식 댓글이 부모 댓글의 ID를 참조하는 외래 키
    targetKey: 'c_no', // Comment 테이블의 기본 키, id가 기본 키라고 가정
});


// TODO: 관계를 정의한 모델들을 db 객체에 저장
db.User = User;
db.RoomMembers = RoomMembers;
db.Rooms = Rooms;
db.Messages =Messages;
db.Comment =Comment;
db.Board =Board;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;