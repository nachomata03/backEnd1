import fs from "fs/promises";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class cartManager {
    constructor(filepath) {
        this.path = join(__dirname, '../../../../', filepath);
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
            const findCart = carts.find(cart => cart.id == id);
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
                id: carts.length == 0 ? 1 : carts[carts.length - 1].id + 1, 
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

    async addProductToCart(body) {
    try {
        const data = await fs.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
        const index = carts.findIndex(cart => cart.id === body.id);
        carts[index] = body;
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
        return this.getCartById(body.id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


    async cleanCart(id) {
        try {
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id == id);
            const cart = carts[cartIndex];
            cart.products = [];
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            return this.getCartById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProductFromCart(body){
        try{
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id == body.id);
            carts[cartIndex].products = body.products;
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            return this.getCartById(body.id);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteCart(id){
        try{
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id == id);
            if (cartIndex == -1){
                throw new Error(`El carrito con el id ${id} no existe`);
            } else{
                carts.splice(cartIndex, 1);
                await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateQuantityFromProd(body, indexCart){
        try{
            const carts = await this.readFile();
            const cartIndex = carts.findIndex(cart => cart.id == body.id);
            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(product => product.id == indexCart);
            cart.products[productIndex] = body;
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            return this.getCartById(body.id);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateProductsFromCart(body){
        try{
            const carts = await this.readFile();

            const cartIndex = carts.findIndex(cart => cart.id === body.id);
            
            if (!Array.isArray(body.products)) {
                products = [products];
            }
            
            carts[cartIndex].products = body.products;
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
            return this.getCartById(body.id);
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default cartManager