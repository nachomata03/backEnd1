import { Router } from 'express';

import ProductsController from '../controllers/products.controllers.js'
import CartsController from '../controllers/cart.controllers.js'
import PaginationController from '../controllers/pagination.controllers.js';

const paginationController = new PaginationController();

const productsController = new ProductsController();

const cartsController = new CartsController();

const router = Router();

router.get('/all-products', paginationController.getProducts)

router.get('/product/:pid', productsController.getProduct)

router.get('/cart/:cid', cartsController.getCart)


//en websocket
router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', { title: 'realTimeProducts' })
})

//chat en websocket
router.get('/chat', (req, res) => {
    res.render('chat', { title: 'chat' })
})


export default router