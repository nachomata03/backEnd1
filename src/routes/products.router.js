import { Router } from "express";
import ProductsController from "../controllers/products.controllers.js";
import { authMiddleware, isAdmin } from "../utils.js";

const productsController = new ProductsController();

const router = Router();

// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', productsController.getProducts);

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', productsController.getProduct);

// /api/products AGREGA UN PRODUCTO
router.post('/', authMiddleware, isAdmin, productsController.createProduct);

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', authMiddleware, isAdmin,productsController.updateProduct);

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', authMiddleware, isAdmin, productsController.deleteProduct);

router.get('/:pid/edit', authMiddleware, isAdmin, productsController.getEditProduct);


export default router;
