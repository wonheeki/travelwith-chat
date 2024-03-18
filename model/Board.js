const BoardModel = (sequelize,DataTypes)=>{
    const Board = sequelize.define('tw_board',{
        b_no:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
         b_title :{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        u_id :{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        b_writer :{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        b_photo :{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        b_category :{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        b_txt :{
            type:DataTypes.STRING(1000),
            allowNull:false
        },
        b_regDate : {
            type: DataTypes.DATE,
            allowNull: false
        },
        b_readCounter:{
            type:DataTypes.INTEGER,
            allowNull:false,
            default:0,
        }
       
    },{
        freezeTableName:true,
        timestamps: false
    });
    return Board;
}

module.exports = BoardModel;