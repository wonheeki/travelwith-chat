const CommentModel = (sequelize,DataTypes)=>{
    const Comment = sequelize.define('tw_comment',{
        c_no:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
         b_no :{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        c_writer :{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        c_regDate :{
            type:DataTypes.DATE,
            allowNull:false
        },
        c_txt :{
            type:DataTypes.STRING(1000),
            allowNull:false
        },
        c_js_no :{
            type:DataTypes.INTEGER,
            allowNull:true
        },
       
    },{
        freezeTableName:true,
        timestamps: false
    });
    return Comment;
}

module.exports = CommentModel;