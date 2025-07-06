import { Router } from "express";

import { getProductsFs, getProductByIdFs, createProductFs, updateProductFs, deleteProductFs } from '../controllers/fileSystem/products.fs.controllers.js'

const router = Router();



// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const producto = await getProductsFs()
        res.json(producto)

    } catch (error) {
        
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
})

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = await getProductByIdFs(id);
        res.send(producto)
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/products AGREGA UN PRODUCTO
router.post('/', async (req, res) => {
    try {
        const prod = req.body
        const producto = await createProductFs(prod);
        res.send({ message: 'El producto se cargo correctamente', producto: producto })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el producto' });
    }
})

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', async (req, res) => { 
    try {
        const id = parseInt(req.params.pid)
        const prodNuevo = req.body; 
        const productoActualizado = await updateProductFs(id, prodNuevo);
        res.json(productoActualizado)
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ error: error.message });
    }
});

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = await deleteProductFs(id);
        res.send({message: `El producto se elimino correctamente`, producto: producto})
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}) 

export default router;