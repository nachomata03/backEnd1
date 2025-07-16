import { Router } from 'express';

import ProductsController from '../controllers/products.controllers.js'
import CartsController from '../controllers/cart.controllers.js'
import {getProducts} from '../controllers/fileSystem/products.fs.controllers.js'
import {getProductById} from '../controllers/fileSystem/products.fs.controllers.js'

import ProductsModel from '../models/Products.models.js';

import { PaginationParameters } from 'mongoose-paginate-v2';

const productsController = new ProductsController();

const router = Router(); //inicializo el router

const pathProd = "http://localhost:8080/products"

//en mongoAtlas
router.get('/all-products', async (req, res) => {
    const queries = new PaginationParameters(req).get()
    const paginationObject = queries[1] || {} 
    const {query} = req.query
    let sort;

    if(paginationObject.sort === 'asc') {
        sort = {price: 1}
    } else if (paginationObject.sort === 'desc') {
        sort = {price: -1}
    }
    
    const options = {
            limit: parseInt(paginationObject.limit),
            page: parseInt(paginationObject.page),
            sort,
        };

    const filtro = query ? JSON.parse(query) : {}

    try {
        const response = await ProductsModel.paginate(filtro, options);

        let prevLink = null;

        //     /?query={"category": "Bienestar General"}

        let nextLink = null;

        if(response.hasPrevPage) prevLink = `${pathProd}/?page=${response.prevPage}`
        if(response.hasNextPage) nextLink = `${pathProd}/?page=${response.nextPage}`

        if (!response) return res.status(404).render({ error: 'Productos no encontrados' });

        delete response.offset;
        response.prevLink = prevLink
        response.nextLink = nextLink
        response.status = "success"

        /* res.json({response}) */
        const result = response.payload.map(prod => prod.toObject())
        
        res.render('products', {
            productos: result, 
            currentPage: response.currentPage, 
            hasPrevPage: response.hasPrevPage, 
            hasNextPage: response.hasNextPage, 
            prevLink,
            nextLink,
            totalPages: response.totalPages
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

router.get('/product/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const producto = await productsController.getProduct(id);
        res.render('productDetail', {producto: producto.toObject()})
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

router.get('/cart/:cid', async (req, res) => {
    try {
        const id = req.params.cid;
        const cart = await CartsController.getCart(id);
        res.render('carts', {cart: cart.toObject()})
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

//en fileSystem
router.get('/home', async (req, res) => {
    try{
        const producto = await getProducts();
        res.render('home', {producto})
    }catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

router.get('/home/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = await getProductById(id);
        res.render('home', {producto: productoArray, lenght})
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

//en websocket
router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', { title: 'realTimeProducts' })
})

//chat en websocket
router.get('/chat', (req, res) => {
    res.render('chat', { title: 'chat' })
})


export default router