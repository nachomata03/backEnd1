export default class PaginationService{
    constructor(repository) {
        this.repository = repository;
    }
    async getProducts(filter, options) {
        try {
            const products = await this.repository.getProducts(filter, options);
            if (!products || products.length === 0) {
                const error = new Error('Productos no encontrados');
                error.statusCode = 404;
                throw error;
            }
            return products;
        } catch (error) {
            throw error;
        }
    }
}