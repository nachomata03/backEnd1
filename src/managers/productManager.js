import fs from "fs/promises"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class productManager {
    constructor(filepath) {
        this.filepath = join(__dirname, '..', filepath);
    }

    async getProducts() {
        try {
            const producto = await fs.readFile(this.filepath, 'utf-8');
            const productos = JSON.parse(producto);
            return productos
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addProduct(prod) {
        try {
            const productos = await this.getProducts();

            const maxId = Math.max(...productos.map(producto => producto.id)) || 0;
            const newProduct = { id: maxId + 1, ...prod };
            productos.push(newProduct);

            await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2), 'utf-8');
            return newProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProduct(id, prod){
        try {
            const productos = await this.getProducts();
            const productoactualizado = productos.findIndex(producto => producto.id === id);
            productos[productoactualizado] = {...productos[productoactualizado], ...prod}
            
            await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2), 'utf-8');
            return productos[productoactualizado];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const productos = await this.getProducts();
            const findProduct = productos.find(producto => producto.id === id);
            if (!findProduct) return console.log(`El producto con el id ${id} no existe`);
            return findProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteProduct(id) {
        try {
            const productos = await this.getProducts();

            const findProduct = productos.find(producto => producto.id === id);
            if (!findProduct) return console.log(`El producto con el id ${id} no existe`);

            const updatedProducts = productos.filter(producto => producto.id !== id);
            await fs.writeFile(this.filepath, JSON.stringify(updatedProducts, null, 2), 'utf-8');
            return productos.length;
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }  
}

export default productManager

