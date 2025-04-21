import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();

const cartManager = new CartManager('/data/carts.json');

// /api/carts/:cid TRAE UN PRODUCTO DEL CARRITO POR ID
router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const cart = await cartManager.getCartById(id);
        res.json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    } 
})

// /api/carts CREA UN NUEVO CARRITO
router.post('/',async (req, res) => {
    const producto = req.body
    try {
        const cart = await cartManager.addCart(producto);
        res.send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid/products/:pid AGREGA UN PRODUCTO AL CARRITO DE UN CARRITO DETERMINADO
router.post('/:cid/products/:pid',async (req, res) => {
    const pid = parseInt(req.params.pid);
    const cid = parseInt(req.params.cid);
    try {
        let cart = await cartManager.addProductToCart(cid, pid);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

export default router