import { Table,Column,Model,DataType,Default, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName:'products'
})

class Product extends Model<Product>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number; // Campo autoincrementable
    @Column({
        type:DataType.STRING(100),
        allowNull:false
    })
     declare name:string

    @Column({
        type:DataType.FLOAT(6,2),
        allowNull:false
    })
    declare price:number

    @Default(true)
    @Column({
        type:DataType.BOOLEAN,
        allowNull:false
    })
    declare availability:boolean
}

export default Product;