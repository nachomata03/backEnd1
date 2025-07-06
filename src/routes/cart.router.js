import { Router } from "express";
import { deleteCart, getCartById, putProductToCart, putCart, postCart, postProductToCart, deleteProductFromCart } from "../controllers/cart.controllers.js";

const router = Router();

// /api/carts/:cid TRAE UN PRODUCTO DEL CARRITO POR ID
router.get('/:pid', async (req, res) => {
    try {
        const id = req.params.pid;
        const cart = await getCartById(id);
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
        const body = req.body;
        const respuesta = await postCart(body);
        res.status(201).json({
            message: 'Carrito creado correctamente',
            cart: respuesta,
        });
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid/products/:pid AGREGA UN PRODUCTO AL CARRITO DE UN CARRITO DETERMINADO
router.post('/:cid/products/:pid',async (req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        const result = await postProductToCart(cid, pid);
        res.status(201).json({
            message: 'Producto agregado correctamente',
            cart: result
        });
        }catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})


// /api/carts/:cid ACTUALIZA UN CARRITO
router.put('/:cid',async (req, res) => {
    try {
        const id = req.params.cid;
        const newProducts = req.body;
        const cart = await putCart(id, newProducts);
        return res.status(200).json({ message: 'Carrito actualizado con nuevos productos', cart });
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid/products/:pid ACTUALIZA LA CANTIDAD DE UN PRODUCTO
router.put('/:cid/products/:pid',async (req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        const {quantity} = req.body

        const cart = await putProductToCart(cid, pid, quantity);
        return res.status(200).json({ message: 'Producto actualizado en el carrito', cart });

    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})


// /api/carts/:cid/products/:pid ELIMINA UN PRODUCTO DEL CARRITO
router.delete('/:cid/products/:pid',async (req, res) => {
    try{
        const pid = req.params.pid;
        const cid = req.params.cid;

        const cart = await deleteProductFromCart(cid, pid);
        return res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    }catch(error){
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

// /api/carts/:cid ELIMINA LOS PRODUCTOS DEL CARRITO
router.delete('/:cid',async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await deleteCart(cid);
        return res.status(200).json({ message: 'Productos eliminados del carrito', cart });
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})







export default router










/*

/* import dotenv from 'dotenv';
import ProductsModel from '../models/products.models.js';
import CartModel from '../models/carts.models.js';
import cartManager from '../managers/cartManager.js';

import mongoose from "mongoose"; 

async function main() {

    dotenv.config();
    
    const MONGO_URI = process.env.MONGO_URI || "mongmongodb://localhost:27017/";
    
    mongoose.connect(MONGO_URI, {
        dbName: "ecommerce",
    }).then(() => {
        console.log("Base de datos conectada");
    }).catch((error) => {
        console.log(`Error al conectar a la base de datos ${error}`);
    })

    const cart = await cartManager.readFile();
    
    try{
        const prodID =await ProductsModel.findOne({ "id": 1 });
        await CartModel.insertOne({
            "id": 1,
            "products": [
                {
                    "id": prodID._id,
                    "quantity": 1
                }
            ]
        });
    }catch(error){
        console.log(error);
    }
}

main(); */