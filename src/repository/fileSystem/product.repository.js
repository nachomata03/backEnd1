import ProductFsDao from "../dao/fs/product.dao.js";


export default class ProductsFileSystemRepository{
    constructor(){
        this.dao = new ProductFsDao();
    }
    async getProducts() {
        return await this.dao.getProducts();
    }

    async getProduct(id) {
        const product = await this.dao.getProduct(id);
        return product
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