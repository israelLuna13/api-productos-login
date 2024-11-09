import { transporter } from "../config/nodemailer";
interface IEmail{
    email:string,
    name:string,
    token:string
}
export class AuthEmail{
    static sentConfirmationEmail = async (user:IEmail)=>{
        const info = await transporter.sendMail({
            from:'Administration <admin@root.com>',
            to:user.email,
            subject:'Products - Confirm you account',
            html:`<p>Hi: ${user.name}, you have created you account , You just need to confirm your account  </p>
                    <p>Visit the following link</p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirm you account</a>
                    <p>Put the code: <b>${user.token}</b></p>
                    <p>This token will expired in 10 minutes</p>
                    `
        })

        
    }
    static sendPasswordResetToken = async (user:IEmail)=>{
        //send email
      const info=  await transporter.sendMail({
            from:'Products <admin@admin.com>',
            to:user.email,
            subject:'Admin - Reset ypur password',
            html:`<p>Hola: ${user.name}, Have you reset your password </p>
                    <p>Visit the next link</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Reset password</a>
                    <p>Put the code: <b>${user.token}</b></p>
                    <p>This token will expired in 10 minutes</p>
                    `
        })

        console.log('Message sended',info.messageId);
        

    }
}