import { Router } from "express";
import CartModel from '../models/Carts.models.js';
import ProductsModel from '../models/Products.models.js';

const router = Router();

// /api/carts/:cid TRAE UN PRODUCTO DEL CARRITO POR ID
router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const cart = await CartModel.findById({_id: id});
        res.json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
})

// /api/carts CREA UN NUEVO CARRITO
router.post('/',async (req, res) => {
    try {
        const { id: cartId, products } = req.body;

        const productsToInsert = [];

        for (const product of products) {
            const foundProduct = await ProductsModel.findOne({ id: product.id }); // Busca por tu ID único

            if (!foundProduct) {
                return res.status(400).json({ error: `No se encontró el producto con ID: ${product.id}` });
            }

            productsToInsert.push({
                id: foundProduct._id, // Usar el _id de Mongoose como referencia
                quantity: product.quantity,
            });
        }

        const createdCart = await CartModel.create({
            id: cartId,
            products: productsToInsert,
        });

        const respuesta = await CartModel.findById(createdCart._id).populate('products.id');

        res.status(201).json({
            message: 'Carrito creado correctamente',
            cart: respuesta,
        });

    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

// /api/carts/:cid/products/:pid AGREGA UN PRODUCTO AL CARRITO DE UN CARRITO DETERMINADO
router.post('/:cid/products/:pid',async (req, res) => {
    const pid = parseInt(req.params.pid);
    const cid = req.params.cid;
    try {
        const cart = await CartModel.findOne({ _id: cid })
        const product = await ProductsModel.findOne({ id: pid })

        if (!cart) {
            return res.status(404).json({ error: 'El carrito no existe' });
        }
        if (!product) {
            return res.status(404).json({ error: 'El producto no existe' });
        }

        const productIndex = cart.products.findIndex(p => String(p.id) === String(product._id)); //Compara objectIds

        if (productIndex > -1) {
            // El producto ya está en el carrito, aumentar la cantidad
            cart.products[productIndex].quantity += 1;
            cart.markModified('products'); // avisa que se modifican los productos
            await cart.save();
            return res.status(200).json({ message: 'Cantidad del producto actualizada', cart });
        } else {
            // El producto no está en el carrito, agregarlo
            cart.products.push({ id: product._id, quantity: 1 });
            await cart.save();
            return res.status(201).json({ message: 'Producto agregado al carrito', cart }); //201 Created
        }
        }catch (error) {
        console.log(`error: ${error}`);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid/products/:pid ELIMINA UN PRODUCTO DEL CARRITO
router.delete('/:cid/products/:pid',async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    try{
        const cart = await CartModel.findOne({ _id: cid })

        if (!cart) {
            return res.status(404).json({ error: 'El carrito no existe' });
        }
        const productIndex = cart.products.findIndex(p => String(p.id) === String(pid)); //Compara objectIds

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return res.status(200).json({ message: 'Producto eliminado del carrito', cart });
        } else {
            return res.status(404).json({ error: 'El producto no estaba en el carrito' });
        }
    }catch(error){
        console.log(error);
        res.status(500).send({ error: 'Error al borrar el producto del carrito' });
    }
})

// /api/carts/:cid ELIMINA LOS PRODUCTOS DEL CARRITO
router.delete('/:cid',async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await CartModel.findOne({ _id: cid })
        if (!cart) {
            return res.status(404).json({ error: 'El carrito no existe' });
        }
        cart.products = [];
        await cart.save();
        return res.status(200).json({ message: 'Productos eliminados del carrito', cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid ACTUALIZA UN CARRITO
router.put('/:cid',async (req, res) => {
    const cid = req.params.cid;
    const newProducts = req.body;

    try {
        const cart = await CartModel.findOne({ _id: cid })

        if (!cart) return res.status(404).json({ error: 'El carrito no existe' });

        for (const product of newProducts){
            const foundProduct = await ProductsModel.findOne({ id: product.id });

            if (!foundProduct) return res.status(400).json({ error: `No se encontró el producto con ID: ${product.id}` })


            cart.products.push({
                id: foundProduct._id,
                quantity: product.quantity,
            });
        }

        cart.markModified('products');
        await cart.save();

        return res.status(200).json({ message: 'Carrito actualizado con nuevos productos', cart });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
    }
})

// /api/carts/:cid/products/:pid ACTUALIZA LA CANTIDAD DE UN PRODUCTO
router.put('/:cid/products/:pid',async (req, res) => {
    const pid = req.params.pid;
    const cid = req.params.cid;
    const body = req.body;
    const { quantity } = req.body
    
    try {
        const cart = await CartModel.findOne({ _id: cid })

        if (!cart) return res.status(404).json({ error: 'El carrito no existe' });

        const product = ProductsModel.findOne({ id: pid });

        if (!product) return res.status(404).json({ error: 'El producto no existe' });

        const productIndex = cart.products.findIndex(p => String(p._id) === String(pid._id)); //Compara objectIds

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            cart.markModified('products');
            await cart.save();
            return res.status(200).json({ message: 'Producto actualizado en el carrito', cart });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el carrito' });
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