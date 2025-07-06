import CartModel from '../models/Carts.models.js';
import ProductsModel from '../models/Products.models.js';

export const getCartById = async (id) => {
    try {
        const cart = await CartModel.findById(id).populate('products.id');
        if (!cart){
            const error = new Error('Carrito no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return cart
    } catch (error) {
        throw error
    }
}


export const postCart = async (products) => {
    try {
        const idCart = await CartModel.countDocuments();
        const cartId = idCart + 1; // Genera el ID del carrito contando cuando carritos hay

        const productsToInsert = [];

        for (const prod of products) {
            const foundProduct = await ProductsModel.findOne({ id: prod.id }); // Busca por el ID del producto

            if (!foundProduct) {
                const error = new Error(`No se encontró el producto con ID: ${prod.id}`);
                error.statusCode = 400;
                throw error
            }

            productsToInsert.push({
                id: foundProduct._id, // Usar el _id de Mongoose como referencia
                quantity: prod.quantity,
            });
        }

        const createdCart = await CartModel.create({
            id: cartId,
            products: productsToInsert,
        });

        const respuesta = await CartModel.findById(createdCart._id).populate('products.id');
        return respuesta
    } catch (error) {
        throw error
    }
}

export const postProductToCart = async (cid, pid) => {
    try {
        const cart = await CartModel.findById(cid)
        const product = await ProductsModel.findOne({ id: pid })

        if (!cart) {
            const error = new Error('Carrito no encontrado');
            error.statusCode = 404;
            throw error
        }
        if (!product) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error
        }
        const productIndex = cart.products.findIndex(p => String(p.id) === String(product._id)); //Compara objectIds

        if (productIndex > -1) {
            // El producto ya está en el carrito, aumentar la cantidad
            cart.products[productIndex].quantity += 1;
            cart.markModified('products'); // avisa que se modifican los productos
            await cart.save();
            return cart
        } else {
            // El producto no está en el carrito, agregarlo
            cart.products.push({ id: product._id, quantity: 1 });
            await cart.save();
            return cart
        }
    } catch (error) {
        throw error
    }
}



export const putCart = async (id, newProducts) => {
    try{
        const cart = await CartModel.findById(id);
        
        if (!cart) {
            const error = new Error('El carrito no existe');
            error.statusCode = 404;
            throw error
        }
    
        for (const prod of newProducts){
            const foundProduct = await ProductsModel.findOne({ id: prod.id });

            if (!foundProduct){
                const error = new Error(`No se encontró el producto con ID: ${prod.id}`);
                error.statusCode = 400;
                throw error
            }

            cart.products.push({
                id: foundProduct._id,
                quantity: prod.quantity,
            });
        } 

        cart.markModified('products');
        await cart.save();
        return cart
    }catch (error) {
        throw error
    }
}

export const putProductToCart = async (cid, pid, quantity) => {
    try {
        const cart = await CartModel.findOne({ _id: cid }) //busca el carrito
        
        if (!cart){
            const error = new Error('El carrito no existe');
            error.statusCode = 404;
            throw error
        }

        const product = await ProductsModel.findById(pid); //busca el producto
        
        if (!product){
            const error = new Error('El producto no existe');
            error.statusCode = 404;
            throw error
        }
        const productIndex = cart.products.findIndex(p => String(p.id) === String(pid)); //Compara objectIds
        
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            cart.markModified('products');
            await cart.save();
        }
        return cart
    }catch (error) {
        throw error
    }
}



export const deleteProductFromCart = async (cid, pid) => {
    try {
        const cart = await CartModel.findById(cid) //busca el carrito

        if (!cart) {
            const error = new Error('El carrito no existe');
            error.statusCode = 404;
            throw error
        }
        const productIndex = cart.products.findIndex(p => String(p.id) === String(pid)); //Compara objectIds

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart
        } else {
            const error = new Error('El producto no existe en el carrito');
            error.statusCode = 404;
            throw error
        }
    }catch (error) {
        throw error
    }    
}

export const deleteCart = async (id) => {
    try {
        const cart = await CartModel.findById(id)

        if (!cart) {
            const error = new Error('El carrito no existe');
            error.statusCode = 404;
            throw error
        }

        return await CartModel.deleteOne({ _id: id });

    }catch (error) {
        throw error
    }
}