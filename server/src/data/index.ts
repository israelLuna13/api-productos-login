import {exit} from 'node:process'
import db from '../config/db'
import { log } from 'node:console'

const clearDB = async()=>{
    try {
        await db.sync({force:true})
        log('Data deleted successfully')
        exit()//ends successfully
    } catch (error) {
        console.log(error);
        exit(1)//ends with errors
    }
}

if(process.argv[2] === '--clear')
{
    clearDB()
}