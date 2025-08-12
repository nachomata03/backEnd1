import { Router } from 'express';

import ProductsController from '../controllers/products.controllers.js'
import CartsController from '../controllers/cart.controllers.js'
import PaginationController from '../controllers/pagination.controllers.js';
import { authMiddleware, isAdmin } from '../utils.js';
import SessionsController from '../controllers/session.controller.js';

const paginationController = new PaginationController();

const productsController = new ProductsController();

const cartsController = new CartsController();

const sessionsController = new SessionsController();

const router = Router();

router.get('/all-products', authMiddleware, paginationController.getProducts)
/* 
router.get('/product/:pid', productsController.getProduct)

router.get('/cart/:cid', cartsController.getCart) */

router.get('/view/:cid', cartsController.getCartView)


//en websocket
router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', { title: 'realTimeProducts' })
})

//chat en websocket
router.get('/chat', (req, res) => {
    res.render('chat', { title: 'chat' })
})

router.get('/newProduct', authMiddleware, isAdmin, productsController.getNewProduct)

router.get('/forgot-password', sessionsController.getForgotPassword)

router.post('/forgot-password', sessionsController.postForgotPassword)

router.get('/reset-password/:token', sessionsController.getResetPassword)

router.put('/reset-password/:token', sessionsController.putResetPassword)

export default router