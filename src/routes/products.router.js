import { Router } from "express";
import ProductsModel from "../models/Products.models.js";

const router = Router();

// /api/products TRAE TODOS LOS PRODUCTOS
router.get('/', async (req, res) => {
    try {
        const producto = await ProductsModel.find();
        if (!producto) return res.status(404).json({ error: 'Productos no encontrados' });
        res.json(producto)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

// /api/products/:pid TRAE UN PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await ProductsModel.findById(id);
        if (!producto) return res.status(404).send({ error: 'Producto no encontrado' });
        res.send(producto)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al obtener el producto' });
    }
}) 

// /api/products AGREGA UN PRODUCTO
router.post('/', async (req, res) => {
    const prod = req.body  

    const requiredFields = ['title', 'description', 'price', 'stock', 'category', 'thumbnails', 'discount', 'status', 'code'];
    const missingFields = requiredFields.filter(field => !prod[field] && prod[field] !== 0); // permitimos 0 como valor válido

    if (missingFields.length > 0) return res.status(400).send({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });

    prod.price = parseFloat(prod.price);
    prod.stock = parseInt(prod.stock);
    prod.discount = parseFloat(prod.discount);

    if (isNaN(prod.price) || isNaN(prod.stock) || isNaN(prod.discount)) return res.status(400).send({ error: 'price, stock y discount deben ser valores numéricos válidos' });
    try {
        let ultimoId = await ProductsModel.find().sort({ _id: -1 }).limit(1);
        prod.id = (ultimoId[0]?.id || 0) + 1;
        const producto = await ProductsModel.create(prod);
        res.send({ message: 'El producto se cargo correctamente', producto: producto })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al agregar el producto' });
    }
})

// /api/products/:pid ACTUALIZA UN PRODUCTO
router.put('/:pid', async (req, res) => { 
    const id = req.params.pid
    const prodNuevo = req.body; 

    try{
        const productoActualizado = await ProductsModel.findByIdAndUpdate(id, prodNuevo, { new: true });
        if (productoActualizado) {
            res.send({ message: 'El producto se actualizó correctamente', producto: productoActualizado });
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al actualizar el producto' });
    }
});

// /api/products/:pid ELIMINA UN PRODUCTO
router.delete('/:pid', async (req, res) => {
    const id = req.params.pid;
    const quantity = req.body
    try {
        const producto = await ProductsModel.findByIdAndDelete(id);
        res.send.json({message: `El producto se elimino correctamente`, producto: producto})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al eliminar el producto' });
    }
}) 

export default router;



/* import dotenv from 'dotenv';
import ProductManager from "../managers/productManager.js";
const productosManager = new ProductManager('/data/products.json')
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

    const productos = await productosManager.getProducts();
    
    try{
        await ProductsModel.insertMany(productos);
    }catch(error){
        console.log(error);
    }
}

main(); */