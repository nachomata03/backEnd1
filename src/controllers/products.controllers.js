import { productsService } from '../services/index.js';

class ProductsController {
    // Método para obtener todos los productos
    async getProducts(req, res) {
        try {
            const products = await productsService.getProducts();
            res.json(products);
        } catch (error) {
            console.error("Error al obtener productos:", error); 
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    // Método para obtener un producto por ID
    async getProduct(req, res) {
        const id = req.params.pid;
        try {
            const product = await productsService.getProduct(id);
            res.json(product);
        } catch (error) {
            console.error("Error al obtener producto por ID", error); 
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    // Método para crear un nuevo producto
    async createProduct(req, res) {
        const body = req.body
        try {
            const result = await productsService.createProduct(body);
            res.send({ message: 'El producto se cargo correctamente', producto: result })
        } catch (error) {
            console.error("Error al crear producto:", error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    // Método para actualizar un producto existente
    async updateProduct(req, res) {
        const id = req.params.pid
        const body = req.body; 
        try{
            const productoActualizado = await productsService.updateProduct(id, body);
            res.send({ message: 'El producto se actualizó correctamente', producto: productoActualizado })
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    // Método para eliminar un producto
    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            const producto = await productsService.deleteProduct(id);
            res.send({message: `El producto se elimino correctamente`, producto: producto})
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }
}

export default ProductsController
