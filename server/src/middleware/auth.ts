import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'
import User from "../models/User.model"

export interface IUser{
    id:number,
    email:string,
    password:string,
    name:string,
    confirmed:boolean
}
//we put the atribute user session in the req to get acces from other files
declare global{
    namespace Express{
        interface Request{
            user:IUser
        }
    }
}
export const authenticate = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const bearer = req.headers.authorization
    if(!bearer)
    {
        const error = new Error('No authorized')
        res.status(401).json({error:error.message})
    }
    const token = bearer.split(' ')[1]

    try {
        //we decoded the token and we validate if decoded is objet and it have de property id
        const decoded = jwt.verify(token,process.env.JWT_SECRET)        
        if(typeof decoded == "object" && 'id' in decoded)
        {
            // we get the information the user, only the name
            const user = await User.findByPk(decoded.id,{
                attributes:['id','name','email']
            })

            if(user){
                req.user = user
            }else{
                res.status(500).json({eroor:'Invalidate token'})
            }
        }

    } catch (error) {
        res.status(500).json({error:'Invalidate token'})
        
    }
    next()
}