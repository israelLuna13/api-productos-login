import {conectDB} from "../server";
import db from "../config/db";

//pruebas

//we simulate the connection to database
jest.mock('../config/db')
describe('connectDB', () => {
    // afterAll(async()=>{
    //     //close conexion
    //     await db.close()
    // })

  it('should handle database connection error',async()=>{

    jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('It was issuse try connect to database'))
    const consoleSpy = jest.spyOn(console,'log')
    await conectDB()

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Issuse connecting to database'))
  })
})
