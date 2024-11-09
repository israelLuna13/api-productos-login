import { Router } from "express";
import { ProductHandler } from "../handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
const router = Router()
router.get('/',authenticate,ProductHandler.getProducts)
router.get('/:id',authenticate,param('id').isInt().withMessage('ID is incorrect'),handleInputErrors,ProductHandler.getProductById)
router.post('/',authenticate,body("name").notEmpty().withMessage("Product name is required"),
                body('price').isNumeric().withMessage('incorrect value').notEmpty().withMessage('Price is required').custom(value => value > 0),
                handleInputErrors,
                ProductHandler.createProduct)

router.put('/:id',authenticate,param('id').isInt().withMessage('ID is incorrect'),
                body("name").notEmpty().withMessage("Product name is required"),
                body('price').isNumeric().withMessage('incorrect value').notEmpty().withMessage('Price is required').custom(value => value > 0),
                body('availability').isBoolean().withMessage('Value incorrect'),handleInputErrors,ProductHandler.updateProduct)
router.patch('/:id',authenticate,param('id').isInt().withMessage('ID no es valido'),handleInputErrors,ProductHandler.updateAvailable)
router.delete('/:id',authenticate,param('id').isInt().withMessage('ID no es valido'),handleInputErrors,ProductHandler.deleteProduct)

export default router