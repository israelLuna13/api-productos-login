// import request from 'supertest'
// import server from '../../server'

// describe('POST /api/auth/create-account', () => {
    
//     //no le pasamos el objeto de usuario para que ocurra un error y probar el error
//     it('should display validation errors', async()=>{
//         const response = await request(server).post('/api/auth/create-account').send({  })
//         //probandos los errores
//         //lo que se espera cuando ocurre un error
//             expect(response.status).toBe(400)
//             expect(response.body).toHaveProperty('errors')
//             expect(response.body.errors).toHaveLength(3)
//     })

//     //name empty
//     it('should display validation errors', async()=>{
//         const response = await request(server).post('/api/auth/create-account').
//                 send({
//                     name:"",
//                     password:"123456",
//                     password_confirmation:"123456",
//                     email:"root2@gmail.com"
//                   })
//             expect(response.status).toBe(400)
//             expect(response.body).toHaveProperty('errors')
//             expect(response.body.errors).toHaveLength(1)
//     })
//     //email incorrect
//     it('should display validation errors', async()=>{
//         const response = await request(server).post('/api/auth/create-account').
//                 send({
//                     name:"root",
//                     password:"123456",
//                     password_confirmation:"123456",
//                     email:"invalido.com"
//                   })
//             expect(response.status).toBe(400)
//             expect(response.body).toHaveProperty('errors')
//             expect(response.body.errors).toHaveLength(1)
//     })
//         //password empty
//         it('should display validation errors', async()=>{
//             const response = await request(server).post('/api/auth/create-account').
//                     send({
//                         name:"root",
//                         password:"",
//                         password_confirmation:"123456",
//                         email:"invalido.com"
//                       })
//                 expect(response.status).toBe(400)
//                 expect(response.body).toHaveProperty('errors')
//                 expect(response.body.errors).toHaveLength(3)
//         })

//          //password confirmation empty
//          it('should display validation errors', async()=>{
//             const response = await request(server).post('/api/auth/create-account').
//                     send({
//                         name:"root",
//                         password:"",
//                         password_confirmation:"",
//                         email:"invalido.com"
//                       })
//                 expect(response.status).toBe(400)
//                 expect(response.body).toHaveProperty('errors')
//                 expect(response.body.errors).toHaveLength(2)
//         })

//          //password confirmation and password  empty
//          it('should display validation errors', async()=>{
//             const response = await request(server).post('/api/auth/create-account').
//                     send({
//                         name:"root",
//                         password:"",
//                         password_confirmation:"",
//                         email:"invalido.com"
//                       })
//                 expect(response.status).toBe(400)
//                 expect(response.body).toHaveProperty('errors')
//                 expect(response.body.errors).toHaveLength(2)
//         })

//         //user is registered
//         it('should display validation errors', async()=>{
//             const response = await request(server).post('/api/auth/create-account').
//                     send({
//                         name:"root",
//                         password:"123456",
//                         password_confirmation:"123456",
//                         email:"root2@gmail.com"
//                       })
//                 expect(response.status).toBe(409)
//         })

//          //user created
//          it('should display validation errors', async()=>{
//             const response = await request(server).post('/api/auth/create-account').
//                     send({
//                         name:"root",
//                         password:"123456",
//                         password_confirmation:"123456",
//                         email:"root5@gmail.com"
//                       })
//                 expect(response.status).toBe(200)
//         })
// })



