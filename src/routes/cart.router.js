import { Router } from "express";
import CartsController from "../controllers/cart.controllers.js";

const cartsController = new CartsController();

const router = Router();

// /api/carts/:cid TRAE UN PRODUCTO DEL CARRITO POR ID
router.get('/:cid', cartsController.getCart);

// /api/carts CREA UN NUEVO CARRITO
router.post('/', cartsController.createCart);

// /api/carts/:cid/products/:pid AGREGA UN PRODUCTO AL CARRITO DE UN CARRITO DETERMINADO
router.post('/:cid/products/:pid', cartsController.createProducttoCart);

// /api/carts/:cid ACTUALIZA UN CARRITO
router.put('/:cid', cartsController.updateCart)

// /api/carts/:cid/products/:pid ACTUALIZA LA CANTIDAD DE UN PRODUCTO
router.put('/:cid/products/:pid', cartsController.updateProductFromCart)

// /api/carts/:cid/products/:pid ELIMINA UN PRODUCTO DEL CARRITO
router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart)

// /api/carts/:cid ELIMINA LOS PRODUCTOS DEL CARRITO
router.delete('/:cid', cartsController.cleanCart)


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