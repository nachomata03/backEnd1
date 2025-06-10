import { response, Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router(); //inicializo el router

const productosManager = new ProductManager('/data/products.json');

import ProductsModel from '../models/Products.models.js';
import CartsModel from '../models/Carts.models.js';

import { PaginationParameters } from 'mongoose-paginate-v2';

const pathProd = "http://localhost:8080/products"

//en mongoAtlas
router.get('/products', async (req, res) => { 
    /* const user = req.session.user
    console.log("user", user) */
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

        res.json({response})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

router.get('/products/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await ProductsModel.findById(id);
        if (!producto) return res.status(404).send({ error: 'Producto no encontrado' });
        res.render('productDetail', {producto: producto.toObject()})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el producto' });
    }
})

router.get('/carts/:cid', async (req, res) => {
    const id = req.params.cid;
    try {
        const cart = await CartsModel.findById(id).populate('products.id');
        if (!cart) return res.status(404).send({ error: 'Carrito no encontrado' });
        res.render('carts', {cart: cart.toObject()})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el carrito' });
    }
})

//en fileSystem
router.get('/home', async (req, res) => {
    const producto = await productosManager.getProducts();
    res.render('home', {producto})
})

router.get('/home/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const producto = await productosManager.getProductById(id);
        const productoArray = [producto]
        const lenght = productoArray.length == 1 ? true : false
        console.log(lenght);
        res.render('home', {producto: productoArray, lenght})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
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