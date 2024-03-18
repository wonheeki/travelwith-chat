const UserModel = (sequelize,DataTypes)=>{
    const User = sequelize.define('tw_member',{
        u_id:{
            type:DataTypes.STRING(50),
            primaryKey:true,
            allowNull:false,
        },
        u_pw:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        u_nickname: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        u_profile: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        u_email: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        u_addr: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    },{
        freezeTableName:true,
        timestamps: false
    });
    return User;
}

module.exports = UserModel;
