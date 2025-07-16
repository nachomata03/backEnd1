import ProductManager from "../../managers/productManager.js";
const productosManager = new ProductManager('/data/products.json')

export const getProductsService = async() => {
    try{
        const productos = await productosManager.getProducts();
        if (!productos || productos.length === 0) {
            const error = new Error('No hay productos disponibles');
            error.statusCode = 404;
            throw error;
        }
        return productos
    }catch(error){
        throw error;
    }
}

export const getProductIdService = async (id) => {
    try{
        const product = await productosManager.getProductById(id);
        
        if (!product) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error
        }

        return product
    }catch(error){
        throw error;
    }
}

export const postProductService = async (prod) => {
    try{
        if(!prod.title || !prod.description || !prod.price || !prod.thumbnails || !prod.code || !prod.stock){
            const error = new Error('Todos los campos son obligatorios');
            error.statusCode = 400;
            throw error;
        }

        const newProduct = await productosManager.addProduct(prod);

        if(!newProduct) {
            const error = new Error('Producto no creado');
            error.statusCode = 404;
            throw error;
        }

        return newProduct
    }catch(error){
        throw error;
    }
}

export const putProductService = async (id, prod) => {
    try{
        const product = await productosManager.updateProduct(id, prod);

        if(!product) {
            const error = new Error(`Producto con id ${id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        return product 
    }catch(error){
        throw error;
    }
}

export const deleteProductService = async (id) => {
    try{
        const product = await productosManager.deleteProduct(id);

        if(!product) {
            const error = new Error(`Producto con id ${id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        return product
    }catch(error){
        throw error;
    }
}  