// import request from 'supertest'
// import server from '../../server'
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwMTc1MjA2LCJleHAiOjE3NDU3MjcyMDZ9._HUKFdVTm0-onlN1vqgKO2UWEp15tbn9EqHLbhlxbRY';
// const id = 9
// let initialAvailability =true
// //varias pruebas van a marcar error porque reciben un id que se elimina cuando se ejecuta la prueba de eliminar
// //la prueba funciona bien pero como no estaamos eliminado los productos , se acumulan y la pruba espera solo un producto 
// //la prueba patch marca error
// describe('POST /api/products', () => {
//     //no le pasamos el objeto de producto para que ocurra un error y probar el error
//     it('should display validation errors', async()=>{
//         // const response = await request(server).post('/api/products').send({  })
//         const response = await request(server)
//             .post('/api/products')
//             .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//             .set('Content-Type', 'application/json')       // Especificar el tipo de contenido
//             .send({ });
//             // Depuración: ver detalles de la respuesta

//         //probandos los errores
//         //lo que se espera cuando ocurre un error
//             expect(response.status).toBe(400)
//             expect(response.body).toHaveProperty('errors')
//             expect(response.body.errors).toHaveLength(4)
//     })

//      //prueba para el precio
//      it('should validate that the price is a number and greater that 0',async()=>{
//         //enviamos un post con el precio como string
//         const response = await request(server).post('/api/products')
//         .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')   
//         .send({
//             name:'Monitor curvo',
//             price:'hola'
//         })
//         // Depuración: ver detalles de la respuesta

//         //respuesta esperada
//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.errors).toHaveLength(2)
//         //respues que no debe llegar
//         expect(response.status).not.toBe(404)
//         expect(response.body.errors).not.toHaveLength(4)
//     })

//     //pruba para el precio
//     it('should validate that the price is greater that 0',async()=>{
//         //enviamos el precio <= 0 
//         const response = await request(server).post('/api/products')
//             .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//             .set('Content-Type', 'application/json')   
//             .send({
//             name:'Monitor curvo',
//             price:0
//         })
//         // Depuración: ver detalles de la respuesta

//         //respuesta esperada
//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.errors).toHaveLength(1)
//         //respuesta no esperada
//         expect(response.status).not.toBe(404)
//         expect(response.body.errors).not.toHaveLength(4)
//     })
//      //probamos que un producto se crea bien
//      it('should create a new products',async()=>{
//         const response = await request(server) .post('/api/products')
//             .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//             .set('Content-Type', 'application/json')   
//            .send({
//             name:'Mouse - Testing',
//             price:50
//         })
//         // Depuración: ver detalles de la respuesta

//         //respuesta esperada
//         expect(response.status).toBe(201)
//         expect(response.body).toHaveProperty('data')
//         //respuesta no esperada
//         expect(response.status).not.toBe(404)
//         expect(response.status).not.toBe(200)
//         expect(response.body).not.toHaveProperty('errors')
//     })
// })

// describe('GET /api/products', () => {
//      //revisamos que la url exista
//      it('should check if api/products url exist',async()=>{
//         const response = await request(server).get('/api/products')
//             .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//             .set('Content-Type', 'application/json')   
            
//             // Depuración: ver detalles de la respuesta

//         //respuesta que no debemos obtener
//         expect(response.status).not.toBe(404)
//   })
//    //revisamos si esta todo bien con obtener productos
// //    it('GET a JSON response with products', async()=>{
// //     const response = await request(server).get('/api/products')
// //         .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
// //         .set('Content-Type', 'application/json')   
        
// //         // Depuración: ver detalles de la respuesta

// //     expect(response.status).toBe(200)
// //     expect(response.headers['content-type']).toMatch(/json/)
// //     expect(response.body).toHaveProperty('data')
// //     expect(response.body.data).toHaveLength(1)

// //     expect(response.body).not.toHaveProperty('errors')
// // })
// })

// describe('GET /api/products/:id', () => {
//     it('should check a valid ID in the URL', async()=>{
//         //probamos la parte del error, mandamos un id como string
//         const response = await request(server).get('/api/products/not-valid-url')
//         .set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')   
            
//             // Depuración: ver detalles de la respuesta

//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.errors).toHaveLength(1)
//         expect(response.body.errors[0].msg).toBe('ID is incorrect')
//     })

//      //producto que no existe
//      it('should return a 404 response for a non-existen product',async()=>{
//         const productId = 2000
//         const response = await request(server).get(`/api/products/${productId}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')
//         // Depuración: ver detalles de la respuesta

//         expect(response.status).toBe(404)
//         expect(response.body).toHaveProperty('error')
//         expect(response.body.error).toBe('Product not found')
//     })

//     //probamos el caso donde todo este bien
//     it('GET a JSON response for a single product', async()=>{
//         const response = await request(server).get(`/api/products/${id}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')   
//         // Depuración: ver detalles de la respuesta

//         expect(response.status).toBe(200)
//         expect(response.body).toHaveProperty('data')
//     })
// })

// describe('PUT /api/products/:id', () => {
//   //prueba cuando el id de la url cuando es incorrecto
//   it('should check a valid ID in the URL', async()=>{
//     const response = await request(server).put('/api/products/not-valid-ur').set('Authorization', `Bearer ${token}`)      // Agregar el token en el encabezado
//     .set('Content-Type', 'application/json')   
//     .
//     send({
//         name:"Monitor",
//         availability:true,
//         price:300
//     })
//     // Depuración: ver detalles de la respuesta

//     expect(response.status).toBe(400)
//     expect(response.body).toHaveProperty('errors')
//     expect(response.body.errors).toHaveLength(1)
//     expect(response.body.errors[0].msg).toBe('ID is incorrect')
// })
//   //prueba cuando no mandamos lo que queremos actualizar
//   it('should display validation error messages when updating a product', async()=>{
//     const response = await request(server).put(`/api/products/${id}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//     .set('Content-Type', 'application/json')   .send({})
//     // Depuración: ver detalles de la respuesta

//     expect(response.status).toBe(400)
//     expect(response.body).toHaveProperty('errors')
//     expect(response.body.errors).toBeTruthy()
//     expect(response.body.errors).toHaveLength(5)
//     expect(response.status).not.toBe(200)
//     expect(response.body).not.toHaveProperty('data')
// })

//  //prueba cuando se quiere alctualizar pero es precio es 0
//  it('should validate that the price is great than 0', async()=>{
//     const response = await request(server).put(`/api/products/${id}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//     .set('Content-Type', 'application/json')   .send({
//         name:"Monitor",
//         availability:true,
//         price:0
//     })
//     // Depuración: ver detalles de la respuesta

//     expect(response.status).toBe(400)
//     expect(response.body).toHaveProperty('errors')
//     expect(response.body.errors).toBeTruthy()
//     expect(response.body.errors).toHaveLength(1)
//     expect(response.body.errors[0].msg).toBe('Invalid value')
//     expect(response.status).not.toBe(200)
//     expect(response.body).not.toHaveProperty('data')
// })

//  //prueba cuando se quiere actualizar un producto que no existe
//  it('should return a 404 response a for non-existent product', async()=>{
//     const productId = 2000
//     const response = await request(server).put(`/api/products/${productId}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//     .set('Content-Type', 'application/json').send({
//         name:"Monitor",
//         availability:true,
//         price:300
//     })
//     // Depuración: ver detalles de la respuesta

//     expect(response.status).toBe(404)
//     expect(response.body.error).toBe('Product not found')
//     expect(response.status).not.toBe(200)
//     expect(response.body).not.toHaveProperty('data')
// })
//   //prueba cuando la actualizacion esta bien
//   it('should update an existing product with valid data', async()=>{
//     const response = await request(server).put(`/api/products/${id}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//     .set('Content-Type', 'application/json')   .send({
//         name:"Monitor",
//         availability:true,
//         price:300
//     })

//     expect(response.status).toBe(200)
//     expect(response.body).toHaveProperty('data')
//     expect(response.status).not.toBe(400)
//     expect(response.body).not.toHaveProperty('errors')
// })


// })

// describe('PATCH /api/products/:id', () => {
//     it('should return a 404 response for a non-existing product', async()=>{
//         const productId = 2000
//         const response = await request(server).patch(`/api/products/${productId}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')   
//         // Depuración: ver detalles de la respuesta

//         expect(response.status).toBe(404)
//         expect(response.body.error).toBe('Product not found')
//         expect(response.status).not.toBe(200)
//         expect(response.body).not.toHaveProperty('data')
//     })
//     // it('should update the product availablity', async()=>{
//     //     const response = await request(server).patch(`/api/products/{id}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//     //     .set('Content-Type', 'application/json')   
//     //     //console.log(response.body); // Depuración: ver detalles de la respuesta

//     //     expect(response.status).toBe(200)
//     //     expect(response.body).toHaveProperty('data')
//     //     // expect(response.body.data.availability).toBe(false)
//     //     expect(response.body.data.availability).toBe(!initialAvailability);

       
//     //     expect(response.status).not.toBe(404)
//     //     expect(response.status).not.toBe(400)
//     //     expect(response.body).not.toHaveProperty('error')
//     // })

// })

// describe('DELETE /api/products/:id', () => {
//     it('should check a valid ID',async()=>{
//         const response = await request(server).delete('/api/products/not-valid').set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')   
//         // Depuración: ver detalles de la respuesta

//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.errors[0].msg).toBe('ID no es valido')

//        })
//        it('should return a 404 response for a non-existent product',async()=>{
//         const productId = 2000
//         const response = await request(server).delete(`/api/products/${productId}`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//         .set('Content-Type', 'application/json')   
//         // Depuración: ver detalles de la respuesta

//         expect(response.status).toBe(404)
//         expect(response.body.error).toBe('Product not found')
//         expect(response.status).not.toBe(200)
//        })
//     //    it('should delete a product',async()=>{
//     //     const response = await request(server).delete(`/api/products/5`).set('Authorization', `Bearer ${token}`)       // Agregar el token en el encabezado
//     //     .set('Content-Type', 'application/json')   
//     //     // Depuración: ver detalles de la respuesta

//     //     expect(response.status).toBe(200)
//     //     expect(response.body.data).toBe('product deleted')
//     //     expect(response.status).not.toBe(404)
//     //     expect(response.status).not.toBe(400)
//     //    })
    
    
// })



