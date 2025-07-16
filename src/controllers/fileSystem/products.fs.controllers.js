import { parse } from "dotenv";
import { getProductsService, getProductIdService, postProductService, putProductService, deleteProductService } from "../../services/fileSystem/product.fs.services.js";


export const getProducts = async (req, res) => {
    try {
        const productos = await getProductsService();
        res.json(productos);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const producto = await getProductIdService(id);
        res.json(producto);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}



export const postProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await postProductService(product);
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}



export const putProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const newProduct = req.body;
        const productoActualizado = await putProductService(id, newProduct);
        res.json(productoActualizado);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}



export const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const productoEliminado = await deleteProductService(id);
        res.json(productoEliminado);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
}