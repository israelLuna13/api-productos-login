import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthHandler } from "../handlers/user";
import { authenticate } from "../middleware/auth";
const router=Router()
router.post('/create-account',
    body('name').notEmpty().withMessage('Name not most empty'),
    body('password').isLength({min:6}).withMessage('Password is very short, minimum 6 characters'),
    body('password_confirmation').custom((value,{req})=>{
        if(value !== req.body.password)
            throw new Error('The password are not same')
        return true
    }),
    body('email').isEmail().withMessage('Email not valide'),
    handleInputErrors,
    AuthHandler.createAccount)

router.post('/confirm-account',
    body('token').notEmpty().withMessage('The token is required'),
    handleInputErrors,AuthHandler.confirmAccount
)

router.post('/login',body('email').isEmail().withMessage('Email not valide'),
body('password').notEmpty().withMessage('The password not cant be empty'),handleInputErrors,AuthHandler.login)

router.post('/request-code',
    body('email').isEmail().withMessage('Email not valide'),
    handleInputErrors,
    AuthHandler.requestConfirmationCode)
router.post('/forgot-password', body('email').isEmail().withMessage('Email not valide'),
                               handleInputErrors,
                               AuthHandler.forgotPassword)
router.post('/validate-token',
        body('token').notEmpty().withMessage('The Token cant to be empty'),
        handleInputErrors,AuthHandler.validateToken)

router.post('/update-password/:token',
    body('token').notEmpty().withMessage('The Token cant to be empty'),
    body('password').isLength({min:6}).withMessage('Password is very short, minimum 6 characters'),
    body('password_confirmation').custom((value,{req})=>{
        if(value !== req.body.password)
            throw new Error('The password are not same')
        return true
    }),
    handleInputErrors,
    AuthHandler.updatePasswordWithToken)
//---------------------------------------------------------------------------------------------------------------------

//route to get the user on sesssion
router.get('/user',authenticate,AuthHandler.user)

router.put('/profile',authenticate,
    body('name').notEmpty().withMessage('The name not most empty'),
    body('email').isEmail().withMessage('The email is no validate'),
    handleInputErrors,
    AuthHandler.updateProfile
)

router.post('/upd-password',authenticate, 
       body('current_password').notEmpty().withMessage('The current password cant empty'),
       body('password').isLength({min:6}).withMessage('The password is very short, minimum 8 characters.'),
       body('password_confirmation').custom((value,{req})=>{
        //we validated if password is same
        if(value !== req.body.password){
            throw new Error('The Password are not same')
        }
        //next middleware
        return true
        }),handleInputErrors,AuthHandler.updateCurrentPassword)
router.post('/check-password',authenticate,
    body('password').notEmpty().withMessage('The password cant empty'),
    authenticate,
    handleInputErrors,
    AuthHandler.checkPassword
)
export default router