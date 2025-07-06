import ProductManager from "../../managers/productManager.js";
const productosManager = new ProductManager('/data/products.json')


export const getProductsFs = async () => {
    try {
        console.log('getProductsFs');
        const productos = await productosManager.getProducts();

        if (!productos || productos.length === 0) {
            const error = new Error('No hay productos disponibles');
            error.statusCode = 404;
            throw error;
        }

        return productos
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getProductByIdFs = async (id) => {
    try {
        const producto = await productosManager.getProductById(id);
        if(!producto) {
            const error = new Error('Producto no encontrado');
            error.statusCode = 404;
            throw error;
        }
        return producto;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const createProductFs = async (product) => {
    try {
        if(!product.title || !product.description || !product.price || !product.thumbnails || !product.code || !product.stock){
            const error = new Error('Todos los campos son obligatorios');
            error.statusCode = 400;
            throw error;
        }

        const newProduct = await productosManager.addProduct(product);

        if(!newProduct) {
            const error = new Error('Producto no creado');
            error.statusCode = 404;
            throw error;
        }

        return newProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const updateProductFs = async (id, newProduct) => {
    try {
        const productoActualizado = await productosManager.updateProduct(id, newProduct);
        if(!productoActualizado) {
            const error = new Error(`Producto con id ${id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }
        return productoActualizado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const deleteProductFs = async (id) => {
    try {
        const productoEliminado = await productosManager.deleteProduct(id);
        if(!productoEliminado) {
            const error = new Error(`Producto con id ${id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }
        return productoEliminado;
    } catch (error) {
        console.log(error);
        throw error;
    }
}