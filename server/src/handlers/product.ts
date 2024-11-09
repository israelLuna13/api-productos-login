import { Request,Response} from 'express'
import Product from '../models/Product.model'
export class ProductHandler{
   static getProducts=async(req:Request,res:Response):Promise<void>=>{
      try {
         const products = await Product.findAll({
            order:[
               ['price','DESC']
            ]
         })
         res.json({data:products})
         return;
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'An error occurred while fetching the product' });
      }
   }

   static getProductById=async(req:Request,res:Response):Promise<void>=>{
      try {
         const {id} = req.params
         const product = await Product.findByPk(id)
         if(!product)
         {
               res.status(404).json({
               error:'Product not found'
            })
            return;
         }
         res.json({data:product})
         return
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'An error occurred while fetching the product' });

      }
   }
     static createProduct = async(req:Request,res:Response):Promise<void>=>{
      try {
         const product = await Product.create(req.body);
         res.status(201).json({ data: product });
         return;
      } catch (error) {
         console.error(error);
         res.status(400).json({ error: 'Error creating product' });
      }
     }
     static updateProduct= async(req:Request,res:Response)=>{
      try {
         const {id} = req.params
         const product = await Product.findByPk(id)
         if(!product)
         {
              res.status(404).json({
               error:'Product not found'
            })
            return;
         }
         //update all product
         await product.update(req.body)
         await product.save()
         res.json({data:product})
         return;
         
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'An error occurred while update the product' });
      }
     }

     static updateAvailable= async(req:Request,res:Response):Promise<void>=>{
      try {
         const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
           res.status(404).json({
            error:'Product not found'
         })
         return;
      }
      //update state od product
      product.availability = !product.dataValues.availability
      await product.save()
      res.json({data:product})
      return
         
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'An error occurred while update the availability' });
      }
      
     }
     static deleteProduct = async(req:Request,res:Response):Promise<void>=>{
      try {
         const {id} = req.params
         const product = await Product.findByPk(id)
         if(!product)
         {
               res.status(404).json({
               error:'Product not found'
            })
            return;
         }
         await product.destroy()
         res.json({data:'product deleted'})
         return
         
      } catch (error) {
         console.log(error);
         res.status(500).json({ error: 'An error occurred while update the availability' });
      }
      
     }
}
