import productManager from "../fs/managers/productManager.js";


export default class ProductFsDao{
    constructor(){
        this.productsManager = new productManager('/data/products.json')
    }
    async getProducts() {
        return await this.productsManager.getProducts();
    }

    async getProduct(id) {
        const product = await this.productsManager.getProductById(id);
        console.log(product);
        return product
    }

    async createProduct(body) {
        return await this.productsManager.addProduct(body);
    }

    async updateProduct(id, body) {
        return await this.productsManager.updateProduct(id, body);
    }

    async deleteProduct(id) {
        return await this.productsManager.deleteProduct(id);
    }
}