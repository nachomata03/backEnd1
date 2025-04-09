const fs = require('node:fs/promises');

class cartManager {
    constructor(filepath) {
        this.path = filepath
    }

    async getCartById(id) {
        try {
            const cart = await fs.readFile(this.path, 'utf-8');
            const carts = JSON.parse(cart);
            const findCart = carts.find(cart => cart.id === id);
            if (!findCart) return console.log(`El carrito con el id ${id} no existe`);
            return findCart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addCart(products) {
        try {
            const cart = await fs.readFile(this.path, 'utf-8');
            const carts = JSON.parse(cart);
            const newCart = { id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1, products: products }; // si el id = 0 le ponemos 1 sino obtenemos la longitud del array y le sumamos 1
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            console.log(`El carrito con id ${newCart.id} ha sido agregado`);
            return newCart;

        }catch (error) {        
            console.log(error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const carrito = await fs.readFile(this.path, 'utf-8');
            const carts = JSON.parse(carrito);
            const cartIndex = carts.findIndex(cart => cart.id === cartId); // buscamos la orden de compra
            if (cartIndex === -1){
                return null;
            } else{
                const cart = carts[cartIndex]; // obtenemos la orden de compra
                const existingProductIndex = cart.products.findIndex(item => item.id === productId); // buscamos el si esta el producto
    
                if (existingProductIndex !== -1) {
                    cart.products[existingProductIndex].quantity++; // si esta el producto le sumamos la cantidad
                } else {
                    cart.products.push({ id: productId, quantity: 1 }); // si no lo creamos
                }
    
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
                return cart;
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}

module.exports = cartManager