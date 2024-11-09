import { Table,Column,Model,DataType,Default, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import User from "./User.model";

@Table({
    tableName:'tokens',
    timestamps:false
})

class Token extends Model<Token>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
     declare token:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    })
    declare userId:number

    @Default(DataType.NOW)
    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    declare createdAt: Date;

    //time that duration of token
    isExpired():boolean{
        const expirationTime = new Date(this.createdAt);
        expirationTime.setMinutes(expirationTime.getMinutes() + 10); // 10 minutos de duración
        return new Date() > expirationTime;
    }
}

export default Token;