const MessagesModel = (sequelize,DataTypes)=>{
    const Messages = sequelize.define('tw_messages',{
        messages_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        room_id :{
          type:DataTypes.INTEGER,
            allowNull:false
        },
        message_from: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        content : {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        message_checked : {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        sent_at : {
            type: DataTypes.DATE,
            allowNull: true
        },
    },{
        freezeTableName:true
    });
    return Messages;
}

module.exports = MessagesModel;