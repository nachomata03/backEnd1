import CartManager from "../../managers/CartManager.js";

const cartManager = new CartManager('/data/carts.json');

export const getCartFs = async (id) => {
    try {
        const cart = await cartManager.getCartById(id);
        if(!cart){
            const error = new Error('Carrito no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return cart;
    } catch (error) {
        throw error;
    }
}



export const postCartFs = async (body) => {
    try {
        const cart = await cartManager.addCart(body);
        if(!cart){
            const error = new Error('Error al agregar el carrito');
            error.statusCode = 500;
            throw error;
        }
        return cart;
    } catch (error) {
        throw error;
    }
}

export const postProductToCartFs = async (cartId, productId) => {
    try{
        const cart = await cartManager.addProductToCart(cartId, productId);
        if(!cart){
            const error = new Error('Error al agregar el carrito');
            error.statusCode = 500;
            throw error;
        }
        return cart;
    } catch (error) {
        throw error;
    }
}


export const deleteProductFromCartFs = async (cartId, productId) => {
    try{
        const cart = await cartManager.deleteProductFromCart(cartId, productId);
        if(!cart){
            const error = new Error('Error al agregar el carrito');
            error.statusCode = 500;
            throw error;
        }
        return cart;
    } catch (error) {
        throw error;
    }
}

export const deleteCartFs = async (id) => {
    try{
        const cart = await cartManager.deleteCart(id);
        if(!cart){
            const error = new Error('Error al agregar el carrito');
            error.statusCode = 500;
            throw error;
        }
        return cart;
    } catch (error) {
        throw error;
    }
}



export const putCartFs = async (id, body) => {
    try{
        const cart = await cartManager.updateProductsFromCart(id, body);
        if(!cart){
            const error = new Error('Error al actualizar el carrito');
            error.statusCode = 500;
            throw error;
        }
        return cart;
    }catch (error) {
        throw error;
    }
}

export const putQuantityCartFs = async (cartId, productId, quantity) => {
    try{
        const cart = await cartManager.updateQuantityFromProd(cartId, productId, quantity);
        if(!cart){
            const error = new Error('Error al actualizar el carrito');
            error.statusCode = 500;
            throw error;
        }
        return cart;
    }catch (error) {
        throw error;
    }
}