import { Router } from "express";
import { getProducts, getProductId, postProduct, putProduct, deleteProduct } from "../controllers/products.controllers.js";

const router = Router();

// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        res.json(products)
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const products = await getProductId(id);
        res.send(products)
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}) 

// /api/products AGREGA UN PRODUCTO
router.post('/', async (req, res) => {
    try {
        const body = req.body
        const result = await postProduct(body);
        res.send({ message: 'El producto se cargo correctamente', producto: result })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', async (req, res) => { 
    try{
        const id = req.params.pid
        const body = req.body; 
        const productoActualizado = await putProduct(id, body);
        res.send({ message: 'El producto se actualizó correctamente', producto: productoActualizado })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
});

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const producto = await deleteProduct(id);
        res.send({message: `El producto se elimino correctamente`, producto: producto})
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}) 

export default router;
