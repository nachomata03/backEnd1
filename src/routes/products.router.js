import { Router } from "express";
import ProductsController from "../controllers/products.controllers.js";

const productsController = new ProductsController();

const router = Router();

// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', productsController.getProducts);

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', productsController.getProduct);

// /api/products AGREGA UN PRODUCTO
router.post('/', productsController.createProduct);

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', productsController.updateProduct);

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', productsController.deleteProduct);


export default router;
