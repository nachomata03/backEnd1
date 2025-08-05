export default class CartsService {
    constructor(productsRepository, cartsRepository) {
        this.productsRepository = productsRepository;
        this.cartsRepository = cartsRepository
    }
    async getCart(id) {
        try {
            const cart = await this.cartsRepository.getCart(id);

            if (!cart){
                const error = new Error('Carrito no encontrado');
                error.statusCode = 404;
                throw error;
            }
            return cart
        } catch (error) {
            throw error
        }
    }
    async createCart(products){
        try {
            const productsToInsert = [];

            for (const prod of products) {
                const foundProduct = await this.productsRepository.getProduct(prod.id); // Busca por el ID del producto

                if (!foundProduct) {
                    const error = new Error(`No se encontró el producto con ID: ${prod.id}`);
                    error.statusCode = 400;
                    throw error
                }

                productsToInsert.push({
                    id: foundProduct._id? foundProduct._id : foundProduct.id, // Usar el _id de Mongoose como referencia
                    quantity: prod.quantity,
                });
            }
            return await this.cartsRepository.createCart(productsToInsert);
        } catch (error) {
            throw error
        }
    }
    async createProductToCart(cid, pid){
        try {
            const cart = await this.cartsRepository.getCart(cid)
            const product = await this.productsRepository.getProduct(pid)
            if (!cart) {
                const error = new Error('Carrito no encontrado');
                error.statusCode = 404;
                throw error
            }
            if (!product) {
                const error = new Error('Producto no encontrado');
                error.statusCode = 404;
                throw error
            }
            const productIndex = cart.products.findIndex(p => String(p.id) == String(product._id ? product._id : product.id)); //Compara objectIds
            
            if (productIndex > -1) {
                // El producto ya está en el carrito, aumentar la cantidad
                cart.products[productIndex].quantity += 1;
                const cartSaved = await this.cartsRepository.createProductToCart(cart)
                return cartSaved
            } else {
                // El producto no está en el carrito, agregarlo
                cart.products.push({ id: product._id ? product._id : product.id, quantity: 1 });
                const cartSaved = await this.cartsRepository.createProductToCart(cart);
                return cartSaved
            }
        } catch (error) {
            throw error
        }
    }
    async updateCart(id, products){
        try{
            const cart = await this.cartsRepository.getCart(id); //busca el carrito
            
            if (!cart) {
                const error = new Error('El carrito no existe');
                error.statusCode = 404;
                throw error
            }
            const productsToInsert = [];
            for (const prod of products){
                const foundProduct = await this.productsRepository.getProduct(prod.id);
                

                if (!foundProduct){
                    const error = new Error(`No se encontró el producto con ID: ${prod.id}`);
                    error.statusCode = 400;
                    throw error
                }
                productsToInsert.push({
                    id: foundProduct._id ? foundProduct._id : foundProduct.id,
                    quantity: prod.quantity,
                });

            } 
            cart.products = productsToInsert
            const cartSaved = this.cartsRepository.updateCart(cart);
            return cartSaved
        }catch (error) {
            throw error
        }
    }
    async updateProductFromCart(cid, pid, quantity){
        try {

            const cart = await this.cartsRepository.getCart(cid); //busca el carrito
            
            if (!cart){
                const error = new Error('El carrito no existe');
                error.statusCode = 404;
                throw error
            }

            const product = await this.productsRepository.getProduct(pid); //busca el producto

            if (!product){
                const error = new Error('El producto no existe');
                error.statusCode = 404;
                throw error
            }
            const productIndex = cart.products.findIndex(p => String(p.id) == String(pid)); //Compara objectIds
            
            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
                await this.cartsRepository.updateProductFromCart(cart, productIndex);
            }else{
                const error = new Error('El producto no existe en el carrito');
                error.statusCode = 404;
                throw error
            }
            return cart
        }catch (error) {
            throw error
        }
    }
    async deleteProductFromCart(cid, pid){
        try {
            const cart = await this.cartsRepository.getCart(cid); //busca el carrito

            if (!cart) {
                const error = new Error('El carrito no existe');
                error.statusCode = 404;
                throw error
            }
            const productIndex = cart.products.findIndex(p => String(p.id) == String(pid)); //Compara objectIds

            if (productIndex > -1) {
                cart.products.splice(productIndex, 1);
                await this.cartsRepository.deleteProductFromCart(cart);
                return cart
            } else {
                const error = new Error('El producto no existe en el carrito');
                error.statusCode = 404;
                throw error
            }
        }catch (error) {
            throw error
        }
    }
    async cleanCart(id){
        try {
            const cart = await this.cartsRepository.getCart(id);

            if (!cart) {
                const error = new Error('El carrito no existe');
                error.statusCode = 404;
                throw error
            }

            return await this.cartsRepository.cleanCart(id);

        }catch (error) {
            throw error
        }
    }
}