import cartManager from "../fs/managers/cartManager.js";

export default class CartsFsDao{
    constructor(){
        this.cart = new cartManager('/data/carts.json')
    }

    async getCart(id){
        return await this.cart.getCartById(id);
    }
    async createCart(product){
        return await this.cart.addCart(product);
    }
    async createProductToCart(cid, pid){
        return await this.cart.addProductToCart(cid, pid)
    }
    async updateCart(cid, pid){
        return await this.cart.updateProductsFromCart(cid, pid)
    }
    async updateProductFromCart(cid, pid, quantity){
        return await this.cart.updateQuantityFromProd(cid, pid, quantity)
    }
    async deleteProductFromCart(cid, pid){
        return await this.cart.deleteProductFromCart(cid, pid)
    }
    async cleanCart(id){
        return await this.cart.cleanCart(id)
    }

    async deleteCart(id){
        return await this.cart.deleteCart(id)
    }
}