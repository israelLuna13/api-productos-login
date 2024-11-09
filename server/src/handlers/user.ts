import type { Request,Response } from "express"
import User from "../models/User.model"
import { checkPassword, hashPassword } from "../utils/auth"
import Token from "../models/Token"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"

export class AuthHandler{
    static createAccount = async(req:Request,res:Response):Promise<void>=>{
        try {
            const {password,email} =req.body
            const userExist = await User.findOne({
                where:{email}
            })
            if(userExist){
                const error = new Error('The user is registered')
                res.status(409).json({error:error.message})
                return;
            }
            //create user
            const user = new User(req.body)
            user.password = await hashPassword(password)
            await user.save()

           //token
           const token = new Token()
           token.token = generateToken()
           token.userId = user.id

           //sent email
           AuthEmail.sentConfirmationEmail({
            email:user.email,
            name:user.name,
            token:token.token
           })
           await token.save()
           res.send('Account created, Check you email to confirm')
           return
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }
    }

    static confirmAccount =  async(req:Request,res:Response):Promise<void>=>{
        try{
            const {token} = req.body
            const tokenExist = await Token.findOne({where:{token}})
            if(!tokenExist){
                const error = new Error('Token is not valide')
                res.status(404).json({error:error.message})
                return;
            }
            const user = await User.findByPk(tokenExist.userId)
            user.confirmed =true

            //save user and delete token
            await Promise.allSettled([user.save(),tokenExist.destroy()])
            res.send('Account confirmed successfully')
            return
        }catch(error){
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }
    }

    static login = async(req:Request,res:Response):Promise<void>=>{
      try {
        const {email,password} = req.body

        const user = await User.findOne({where:{email}})
        if(!user){
            const error = new Error('User does not existe')
            res.status(404).json({error:error.message})
            return
        }

        if(!user.confirmed){
            const token = new Token()
            token.userId = user.id
            token.token = generateToken()
            await token.save()

            AuthEmail.sentConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

            const error = new Error('The account is not confirmed. We have sent email to confirm account')
            res.status(401).json({error:error.message})
            return
        }

        //check password
        const isPasswordCorrect = await checkPassword(password,user.password)
        if(!isPasswordCorrect)
        {
            const error = new Error('Password Incorrect')
            res.status(401).json({error:error.message})
            return
        }
        //res.send('Authenticated')
        const token = generateJWT({id:user.id})
        res.send(token)
        return
      } catch (error) {
        console.log(error);
        res.status(500).json({error:'There was error'})
        return
      }
        
    }

    static requestConfirmationCode = async(req:Request,res:Response):Promise<void>=>
    {
        try {
            const {email} = req.body
            const user = await User.findOne({where:{email}})
            if(!user)
            {
                const error = new Error('The user is not registered')
                res.status(404).json({error:error.message})
                return
            }
            if(user.confirmed)
            {
                const error = new Error('The user is already confirmed')
                res.status(403).json({error:error.message})
                return
            }

            const token = new Token()
            token.token = generateToken()
            token.userId = user.id

            AuthEmail.sentConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })

            await token.save()
            res.send('Email send with the token to your email ')
            return

        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }
    }

    static forgotPassword= async (req:Request,res:Response):Promise<void>=>{
        try {
            
            const {email} = req.body
            const user = await User.findOne({where:{email}})
            if(!user)
            {
                const error = new Error('The user is not register')
                res.status(404).json({error:error.message})
                return;
            }
            const token = new Token()
            token.token=generateToken()
            token.userId = user.id
            await token.save()

            //sent email
            AuthEmail.sentConfirmationEmail({
                email:user.email,
                name:user.name,
                token:token.token
            })
            res.send('Check your email and follow instructions')
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }
    }

    static validateToken = async(req:Request,res:Response):Promise<void>=>{
        try {
            const {token} = req.body
            const tokenExist = await Token.findOne({where:{token}})

            if(!tokenExist)
            {
                const error = new Error('Token is not valide')
                res.status(404).json({error:error.message})
                return;
            }
            res.send('Token validate, Enter new password')
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }
    }
    static updatePasswordWithToken = async(req:Request,res:Response):Promise<void>=>
    {
        try {
            const {token} = req.params
            const {password}=req.body
            const tokenExist = await Token.findOne({where:{token}})

            if(!tokenExist)
            {
                const error = new Error('Token is not valide')
                res.status(404).json({error:error.message})
                return
            }
            const user = await User.findByPk(tokenExist.userId)
            user.password = await hashPassword(password)
            await Promise.allSettled([user.save(),tokenExist.destroy()])
            res.send('The password was modfificated successfully')
        } catch (error) {
            console.log();
            res.status(500).json({error:'There was error'})   
            return
        }
    }
    static user= async(req:Request,res:Response):Promise<void>=>
    {
        res.json(req.user)
        return;
    }
    static updateProfile = async(req:Request,res:Response):Promise<void>=>
    {
        const {name,email} = req.body
        const {id} = req.user
        console.log(email);
        
        const userExist = await User.findOne({where:{id}})
        console.log(userExist);
        
        //if the email is same and the user with email repet not is the user in session
        if(userExist && userExist.id.toString() !== req.user.id.toString())
        {
            const error = new Error('The email is already registred')
            res.status(409).json({error:error.message})
            return;
        }
        userExist.name = name
        userExist.email = email

        try {
            await userExist.save()
            res.send('Profile update successfully')
            return
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }
    }

    static updateCurrentPassword = async(req:Request,res:Response):Promise<void>=>
    {
        const {current_password,password} = req.body
        const user = await User.findByPk(req.user.id)
        const isPasswordCorrect = await checkPassword(current_password,user.password)

        if(!isPasswordCorrect)
        {
            const error = new Error('Password is incorrect')
            res.status(401).json({error:error.message})
            return;
        }
        try {
            
            user.password = await hashPassword(password)
            await user.save()
            res.send('Password changed successfully')
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({error:'There was error'})
            return
        }

    }
    static checkPassword= async (req:Request,res:Response):Promise<void>=>{
        const {password} = req.body
        const user = await User.findByPk(req.user.id)
        const isPasswordCorrect = await checkPassword(password,user.password)
        if(!isPasswordCorrect){
            const error = new Error('Password is incorrect')
            res.status(401).json({error:error.message})
            return
        }
        res.send('Correct password')
        return
    }  
    private static async _findAndValidateToken(token: string): Promise<Token> {
        const tokenExist = await Token.findOne({ where: { token } });
        
        if (!tokenExist) {
            throw new Error('Token is not valid');
        }
    
        return tokenExist;
    }
}
