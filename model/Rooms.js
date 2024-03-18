const RoomsModel = (sequelize,DataTypes)=>{
    const Rooms = sequelize.define('tw_rooms',{
        room_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        // room_name :{
        //     type:DataTypes.STRING(50),
        //     allowNull:false
        // },
        created_at : {
            type: DataTypes.DATE,
            allowNull: false
        },
       
    },{
        freezeTableName:true
    });
    return Rooms;
}

module.exports = RoomsModel;