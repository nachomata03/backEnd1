import fs from "fs/promises";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class cartManager {
    constructor(filepath) {
        this.path = join(__dirname, '..', filepath);
    }

    async readFile() {
        try {
            const cart = await fs.readFile(this.path, 'utf-8');
            const carts = JSON.parse(cart);
            return carts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.readFile();
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
            const carts = await this.readFile();
            const newCart = { 
                id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1, 
                products: Array.isArray(products) ? products : [products] }; // si el id = 0 le ponemos 1 sino obtenemos la longitud del array y le sumamos 1
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
            const carts = await this.readFile();
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

    async cleanCart(cartId) {
        try {
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                return null;
            } else {
                const cart = carts[cartIndex];
                cart.products = [];
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
                return cart;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProductFromCart(cartId, productId){
        try{
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1){
                console.log("El carrito no existe");
                return null;
            } else{
                const cart = carts[cartIndex];
                const productIndex = cart.products.findIndex(product => product.id === productId);
                if (productIndex === -1){
                    console.log("El producto no existe");
                    return null;
                } else{
                    cart.products.splice(productIndex, 1);
                    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
                    return cart;
                }
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateQuantityFromProd(cartId, productId, quantity){
        try{
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1){
                console.log("El carrito no existe");
                return null;
            } else{
                const cart = carts[cartIndex];
                const productIndex = cart.products.findIndex(product => product.id === productId);
                if (productIndex === -1){
                    console.log("El producto no existe");
                    return null;
                } else{
                    cart.products[productIndex].quantity = quantity;
                    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
                    return cart;
                }
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateProductsFromCart(cartId, products){
        try{
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id === cartId);
            
            if (!Array.isArray(products)) {
                products = [products];
            }
            
            if (cartIndex === -1){
                return null;
            } else{
                carts[cartIndex].products = products;
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
                return carts[cartIndex];
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default cartManager