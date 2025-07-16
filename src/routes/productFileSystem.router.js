import { Router } from "express";

import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from '../controllers/fileSystem/products.fs.controllers.js'

const router = Router();

// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', getProducts);

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', getProductById);

// /api/products AGREGA UN PRODUCTO
router.post('/', postProduct);

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', putProduct);

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', deleteProduct) 

export default router;