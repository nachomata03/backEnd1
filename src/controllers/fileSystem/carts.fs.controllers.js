import { parse } from "dotenv";
import { getCartByIdService ,postCartService ,postProductToCartService, deleteProductFromCartService, deleteCartService, putCartService, putProductToCartService} from "../../services/fileSystem/cart.fs.services.js";

export const getCartById = async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await getCartByIdService(id);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}



export const postCart = async (req, res) => {
    try {
        const body = req.body;
        const cart = await postCartService(body);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}

export const postProductToCart = async (req, res) => {
    try{
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const cart = await postProductToCartService(cid, pid);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}


export const deleteProductFromCart = async (req, res) => {
    try{
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const cart = await deleteProductFromCartService(cid, pid);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}

export const deleteCart = async (req, res) => {
    try{
        const id = parseInt(req.params.cid);
        const cart = await deleteCartService(id);
        res.json(cart);
    } catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}



export const putCart = async (req, res) => {
    try{
        const id = parseInt(req.params.cid);
        const body = req.body;
        const cart = await putCartService(id, body);
        res.json(cart);
    }catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}

export const putQuantityCart = async (req, res) => {
    try{
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = parseInt(req.body.quantity);

        const cart = await putProductToCartService(cartId, productId, quantity);
        res.json(cart);
    }catch (error) {
        console.log(error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
}