import fs from "fs/promises"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class productManager {
    constructor(filepath) {
        this.filepath = join(__dirname, '..', filepath);
    }

    async readFile() {
            try {
                const productoLeido = await fs.readFile(this.filepath, 'utf-8');
                if (!productoLeido.trim()) {
                    return [];
                }
                const productos = JSON.parse(productoLeido);
                if (!Array.isArray(productos)) {
                    throw new Error('El contenido del archivo no es un array');
                }
                return productos;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

    async validation(params) {
        const err = [];
        if(!params.title || !params.description || !params.code || !params.price || !params.stock || !params.category){
            err.push('Todos los campos son obligatorios');
        }
        if(isNaN(params.price) || params.price <= 0){
            err.push('El precio debe ser un número valido');
        }

        if(isNaN(params.stock) || params.stock <= 0 || params.stock % 1 !== 0){
            err.push('El stock debe ser un número valido');
        }

        if(isNaN(params.discount) || params.discount <= 0 || params.discount >= 100){
            err.push('El descuento debe ser un número valido entre 0 y 100');
        }

        if(err.length > 0){
            throw new Error(err/* .join('\n') */);
        }
    }

    async getProducts() {
        try {
            const productos = await this.readFile()
            return productos
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addProduct(prod) {
        try {
            const productos = await this.readFile();

            const maxId = Math.max(...productos.map(producto => producto.id)) || 0;
            const newProduct = { id: maxId + 1, ...prod };
            await this.validation(newProduct);
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
            const productos = await this.readFile();
            const productoActualizado = productos.findIndex(producto => producto.id === id);

            if (productoActualizado === -1) return console.log(`El producto con el id ${id} no existe`);

            productos[productoActualizado] = {...productos[productoActualizado], ...prod}
            
            await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2), 'utf-8');

        

            return productos[productoActualizado];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getProductById(id) {
        try {
            const productos = await this.readFile();
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
            const productos = await this.readFile();

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

