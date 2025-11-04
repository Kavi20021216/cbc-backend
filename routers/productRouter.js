import express from 'express';
import { createProduct, deleteProduct, getClientProducts, getProductInfo, getProducts, searchProducts, updateProduct } from '../controllers/productController.js';


const productRouter = express.Router();
productRouter.post("/",createProduct)
productRouter.get("/",getClientProducts)
productRouter.get("/:page/:limit",getProducts)
productRouter.get("/:productId", getProductInfo) 
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId", updateProduct)
productRouter.get("/search/:query", searchProducts)

export default productRouter;
