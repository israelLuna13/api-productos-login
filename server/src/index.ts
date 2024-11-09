import colors from 'colors'
import server from "./server"

server.listen(4000,()=>{
    const PORT = process.env.PORT  ||4000
    console.log(colors.cyan.bold(`Server is lisenting on port ${PORT}`));
    
})