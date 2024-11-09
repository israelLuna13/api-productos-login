import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import Product from "../models/Product.model";
import User from "../models/User.model";
import Token from "../models/Token";
dotenv.config()

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    models: [Product,User,Token],
    logging: false
})


export default db;