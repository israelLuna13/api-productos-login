import { Table,Column,Model,DataType,Default, AutoIncrement, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName:'users'
})

class User extends Model<User>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number; // Campo autoincrementable
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare email:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare password:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare name:string

    @Default(false)
    @Column({
        type:DataType.BOOLEAN,
        allowNull:false
    })
    declare confirmed:boolean
}

export default User;