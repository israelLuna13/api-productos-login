import {CorsOptions}  from 'cors'
export const corsConfig:CorsOptions={
    origin:function(origin,callback){
        //we put the url of us fronend in the wihite list
        const whiteList=[process.env.FRONTEND_URL]
        //but if we to want to do test with postman , we most execute the command npm run dev:api
        if(process.argv[2] === '--api'){
            whiteList.push(undefined)//that significate that postman si doing request to us api
        }
        if(whiteList.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error('Error of cors'))
        }
    }
}