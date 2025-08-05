import CartsFsDao from "../dao/fs/cart.dao.js";

export default class CartsFileSystemRepository{
    constructor(){
        this.dao = new CartsFsDao();
    }

    async getCart(id){
        return await this.dao.getCart(id);
    }
    async createCart(product){
        return await this.dao.createCart(product);
    }
    async createProductToCart(cid, pid){
        return await this.dao.createProductToCart(cid, pid)
    }
    async updateCart(cid, pid){
        return await this.dao.updateCart(cid, pid)
    }
    async updateProductFromCart(cid, pid, quantity){
        return await this.dao.updateProductFromCart(cid, pid, quantity)
    }
    async deleteProductFromCart(cid, pid){
        return await this.dao.deleteProductFromCart(cid, pid)
    }
    async cleanCart(id){
        return await this.dao.cleanCart(id)
    }

    async deleteCart(id){
        return await this.dao.deleteCart(id)
    }
}