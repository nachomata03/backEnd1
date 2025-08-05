import ProductsModel from "../dao/mongo/models/Products.models.js";

export default class PaginationRepository {
    constructor() {
        this.model = ProductsModel;
    }
    async getProducts(filter, options) {
        try {
            const response = await this.model.paginate(filter, options);
            return response;
        } catch (error) {
            throw error; 
        }
    }
}