import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router(); //inicializo el router

const productosManager = new ProductManager('/data/products.json');

router.get('/', (req, res) => {
    res.render('index', { title: 'index' })
})

router.get('/verProductos', async (req, res) => {
    try {
        const producto = await productosManager.getProducts();
        res.render('vistaProductos', {producto})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

router.get('/verProductos/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const producto = await productosManager.getProductById(id);
        res.render('vistaProductos', {producto})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

router.get('/chat', (req, res) => {
    res.render('chat', { title: 'chat' })
})



export default router