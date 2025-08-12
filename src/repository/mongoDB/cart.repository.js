import CartsMongoDao from "../dao/mongo/cart.dao.js";

export default class CartsMongoRepository{
    constructor(){
        this.dao = new CartsMongoDao();
    }

    async getCart(id){
        return await this.dao.getCart(id);
    }
    async createCart(products){
        return await this.dao.createCart(products);
    }
    async createProductToCart(cart){
        return await this.dao.createProductToCart(cart);
    }
    async updateCart(cart){
        return await this.dao.updateCart(cart);
    }
    async updateProductFromCart(cart){
        return await this.dao.updateProductFromCart(cart);
    }
    async deleteProductFromCart(cart){
        return await this.dao.deleteProductFromCart(cart);
    }
    async deleteCart(id){
        return await this.dao.deleteCart(id);
    }

    async cleanCart(id){
        return await this.dao.cleanCart(id);
    }

    async cartLean(id){
        return await this.dao.cartLean(id);
    }
}