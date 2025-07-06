import ProductsModel from "../models/Products.models.js";

export const getProducts = async () => {
    try {
        const products = await ProductsModel.find();
        if (!products){
            const error = new Error('Productos no encontrados');
            error.statusCode = 404;
            throw error
        }
        return products
    } catch (error) {
        throw error
    }
}

export const getProductId = async (id) => {
    try {
        const product = await ProductsModel.findById(id);
        if (!product){
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error
        }
        return product
    } catch (error) {
        throw error
    }
}

export const postProduct = async (body) => {
    try {
        console.log(body);
        if(!body.title || !body.description || !body.code || !body.price || !body.stock || !body.discount || !body.category || !body.thumbnails || !body.status) {
            const error = new Error('Todos los campos son obligatorios');
            error.statusCode = 400;
            throw error
        }
        body.price = parseFloat(body.price);
        body.stock = parseInt(body.stock);
        body.discount = parseFloat(body.discount);

        if (isNaN(body.price) || isNaN(body.stock) || isNaN(body.discount)) {
            const error = new Error('El precio, stock y descuento deben ser números válidos');
            error.statusCode = 400;
            throw error
        }

        let ultimoId = await ProductsModel.find().sort({ _id: -1 }).limit(1);
        body.id = (ultimoId[0]?.id || 0) + 1;

        const result = await ProductsModel.create(body);
        return result
    } catch (error) {
        throw error
    }
}

export const putProduct = async (id, body) => {
    try {
        const result = await ProductsModel.updateOne({ _id: id }, { $set: body });
        if(!result){
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error
        }
        return result
    } catch (error) {
        throw error
    }
}

export const deleteProduct = async (id) => {
    try {
        const result = await ProductsModel.deleteOne({ _id: id });
        if(!result){
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error
        }
        return result
    } catch (error) {
        throw error
    }
}

/* 
// para subir los productos a la base de datos

import dotenv from 'dotenv';
import ProductManager from "../managers/productManager.js";
const productosManager = new ProductManager('/data/products.json')
import mongoose from "mongoose";
import ProductsModel from "../models/Products.models.js";
async function main() {

    dotenv.config();
    
    //const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";
    const MONGO_URI = "mongodb://localhost:27017/ecommerce";
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