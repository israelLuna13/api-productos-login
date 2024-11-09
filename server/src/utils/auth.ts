import bcrypt from 'bcrypt'
export const hashPassword = async(password:string)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}
//we compare the password tha is comes the body with the password the user in the database
export const checkPassword = async(password:string,storeHash:string)=>{
    return await bcrypt.compare(password,storeHash)
}