import { Router } from "express";
import { getCartFs, postCartFs, postProductToCartFs, deleteProductFromCartFs, deleteCartFs, putCartFs, putQuantityCartFs } from "../controllers/fileSystem/carts.fs.controllers.js";


const router = Router();


// /api/carts/:cid TRAE UN CARRITO
router.get('/:cid', async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await getCartFs(id);
        res.json(cart)
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts CREA UN NUEVO CARRITO
router.post('/',async (req, res) => {
    try {
        const producto = req.body
        const cart = await postCartFs(producto);
        res.send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid/products/:pid AGREGA UN PRODUCTO AL CARRITO DE UN CARRITO DETERMINADO
router.post('/:cid/products/:pid',async (req, res) => { 
    try {
        const pid = parseInt(req.params.pid);
        const cid = parseInt(req.params.cid);
        let cart = await postProductToCartFs(cid, pid);
        res.status(201).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid/products/:pid ELIMINA UN PRODUCTO DEL CARRITO
router.delete('/:cid/products/:pid',async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const cid = parseInt(req.params.cid);
        let cart = await deleteProductFromCartFs(cid, pid);
        res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid ELIMINA LOS PRODUCTOS DEL CARRITO
router.delete('/:cid',async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        let cart = await deleteCartFs(cid);
        res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid CAMBIA LOS PRODUCTOS DEL CARRITO POR EL NUEVO
router.put('/:cid',async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const body = req.body;
        let cart = await putCartFs(cid, body);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid/products/:pid ACTUALIZA LA CANTIDAD DE UN PRODUCTO
router.put('/:cid/products/:pid',async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const cid = parseInt(req.params.cid);
        const { quantity } = req.body
        let cart = await putQuantityCartFs(cid, pid, quantity);
        res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

export default router