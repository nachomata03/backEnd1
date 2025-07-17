import { Router } from "express";
import { getCartById, postCart, postProductToCart, deleteProductFromCart, deleteCart, putCart, putQuantityCart } from "../controllers/fileSystem/carts.fs.controllers.js";

import CartsController from "../controllers/cart.controllers.js";

const cartsController = new CartsController();

const router = Router();


// /api/carts/:cid TRAE UN CARRITO
router.get('/:cid', getCartById)

// /api/carts CREA UN NUEVO CARRITO
router.post('/', postCart);

// /api/carts/:cid/products/:pid AGREGA UN PRODUCTO AL CARRITO DE UN CARRITO DETERMINADO
router.post('/:cid/products/:pid', postProductToCart)

// /api/carts/:cid/products/:pid ELIMINA UN PRODUCTO DEL CARRITO
router.delete('/:cid/products/:pid', deleteProductFromCart)

// /api/carts/:cid ELIMINA LOS PRODUCTOS DEL CARRITO
router.delete('/:cid', deleteCart)

// /api/carts/:cid CAMBIA LOS PRODUCTOS DEL CARRITO POR EL NUEVO
router.put('/:cid', putCart)

// /api/carts/:cid/products/:pid ACTUALIZA LA CANTIDAD DE UN PRODUCTO
router.put('/:cid/products/:pid', putQuantityCart)

export default router