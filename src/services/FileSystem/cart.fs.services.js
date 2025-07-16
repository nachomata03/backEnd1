import CartManager from "../../managers/CartManager.js";

const cartManager = new CartManager('/data/carts.json');

export const getCartByIdService = async (id) => {
    try{
        const cart = await cartManager.getCartById(id);

        if(!cart){
            const error = new Error('Carrito no encontrado');
            error.statusCode = 404;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}

export const postCartService = async (body) => {
    try{
        const cart = await cartManager.addCart(body);

        if(!cart){
            const error = new Error('Error al crear el carrito');
            error.statusCode = 500;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}

export const postProductToCartService = async (cid, pid) => {
    try{
        const cart = await cartManager.addProductToCart(cid, pid);

        if(!cart){
            const error = new Error('Error al agregar el carrito');
            error.statusCode = 500;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}

export const putCartService = async (id, body) => {
    try{
        const cart = await cartManager.updateProductsFromCart(id, body);

        if(!cart){
            const error = new Error('Error al actualizar el carrito');
            error.statusCode = 500;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}

export const putProductToCartService = async (cid, pid, quantity) => {
    try{
        const cart = await cartManager.updateQuantityFromProd(cid, pid, quantity);
        
        if(!cart){
            const error = new Error('Error al actualizar el carrito');
            error.statusCode = 500;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}

export const deleteProductFromCartService = async (cid, pid) => {
    try{
        const cart = await cartManager.deleteProductFromCart(cid, pid);

        if(!cart){
            const error = new Error('Error borrar del carrito');
            error.statusCode = 500;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}

export const deleteCartService = async (id) => {
    try{
        const cart = await cartManager.cleanCart(id);

        if(!cart){
            const error = new Error('Error al borrar el carrito');
            error.statusCode = 500;
            throw error;
        }

        return cart;
    }catch(error){
        throw error;
    }
}