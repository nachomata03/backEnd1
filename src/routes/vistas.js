import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router(); //inicializo el router

const productosManager = new ProductManager('/data/products.json');

router.get('/', (req, res) => {
    res.render('index', { title: 'index' })
})

router.get('/home', async (req, res) => {
    try {
        const producto = await productosManager.getProducts();
        res.render('home', {producto})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
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

router.get('/chat', (req, res) => {
    res.render('chat', { title: 'chat' })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', { title: 'realTimeProducts' })
})



export default router