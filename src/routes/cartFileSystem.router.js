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

// /api/carts/:cid/products/:pid ELIMINA UN PRODUCTO DEL CARRITO
router.delete('/:cid/products/:pid',async (req, res) => {
    const pid = parseInt(req.params.pid);
    const cid = parseInt(req.params.cid);
    try {
        let cart = await cartManager.deleteProductFromCart(cid, pid);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid ELIMINA LOS PRODUCTOS DEL CARRITO
router.delete('/:cid',async (req, res) => {
    const cid = parseInt(req.params.cid);
    try {
        let cart = await cartManager.cleanCart(cid);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid ACTUALIZA UN CARRITO
router.put('/:cid',async (req, res) => {
    const cid = parseInt(req.params.cid);
    const body = req.body;
    try {
        let cart = await cartManager.updateProductsFromCart(cid, body);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid/products/:pid ACTUALIZA LA CANTIDAD DE UN PRODUCTO
router.put('/:cid/products/:pid',async (req, res) => {
    const pid = parseInt(req.params.pid);
    const cid = parseInt(req.params.cid);
    const body = req.body;
    const { quantity } = body
    try {
        let cart = await cartManager.updateQuantityFromProd(cid, pid, quantity);
        cart == null ? res.status(404).send({ error: 'La orden de compra no existe con ese id' }) : res.status(200).send({ message: 'El carrito se actualizó correctamente', cart: cart })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})