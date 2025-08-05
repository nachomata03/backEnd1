import ProductsMongoDao from '../dao/mongo/product.dao.js';

export default class ProductsMongoRepository {
    constructor() {
        this.dao = new ProductsMongoDao();
    }
    async getProducts() {
        return await this.dao.getProducts();
    }
    async getProduct(id) {
        return await this.dao.getProduct(id);
    }
    async createProduct(body) {
        return await this.dao.createProduct(body);
    }
    async updateProduct(id, body) {
        return await this.dao.updateProduct(id, body);
    }
    async deleteProduct(id) {
        return await this.dao.deleteProduct(id);
    }
}