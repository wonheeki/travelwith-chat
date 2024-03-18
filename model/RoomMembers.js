const RoomMembersModel = (sequelize,DataTypes)=>{
    const RoomMembers = sequelize.define('tw_room_members',{
        room_member_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        room_id :{
            type:DataTypes.INTEGER,
            allowNull:false
        }, 
        u_id :{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        joined_at : {
            type: DataTypes.DATE,
            allowNull: false
        },
       
    },{
        freezeTableName:true
    });
    return RoomMembers;
}

module.exports = RoomMembersModel;