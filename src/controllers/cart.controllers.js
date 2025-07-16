import { getCartByIdServices, postCartServices, postProductToCartServices, putCartServices, putProductToCartServices, deleteProductFromCartServices, deleteCartServices } from '../services/cart.services.js'

class CartsController {
    async getCart(req, res) {
        try {
            const id = req.params.pid;
            const cart = await getCartByIdServices(id);
            res.json(cart)
        } catch (error) {
            console.log(`Error al obtener el carrito con el ID ${id}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async createCart(req, res){
        try {
            const body = req.body;
            const respuesta = await postCartServices(body);
            res.status(201).json({
                message: 'Carrito creado correctamente',
                cart: respuesta,
            });
        } catch (error) {
            console.log(`Error al crear el carrito:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async createProducttoCart(req, res){
        try {
            const pid = req.params.pid;
            const cid = req.params.cid;
            const result = await postProductToCartServices(cid, pid);
            res.status(201).json({
                message: 'Producto agregado correctamente',
                cart: result});
        } catch (error) {
            console.log(`Error al agregar el producto ${pid} al carrito ${cid}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async updateCart(req, res){
        try {
            const id = req.params.cid;
            const newProducts = req.body;
            const cart = await putCartServices(id, newProducts);
            return res.status(200).json({ message: 'Carrito actualizado con nuevos productos', cart });
        } catch (error) {
            console.log(`Error al actualizar el carrito con el ID ${id}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async updateProductFromCart(req, res){
        try {
            const pid = req.params.pid;
            const cid = req.params.cid;
            const {quantity} = req.body

            const cart = await putProductToCartServices(cid, pid, quantity);
            return res.status(200).json({ message: 'Producto actualizado en el carrito', cart });

        } catch (error) {
            console.log(`Error al actualizar el producto ${pid} en el carrito ${cid}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async deleteProductFromCart(req, res){
        try{
            const pid = req.params.pid;
            const cid = req.params.cid;

            const cart = await deleteProductFromCartServices(cid, pid);
            return res.status(200).json({ message: 'Producto eliminado del carrito', cart });
        }catch(error){
            console.log(`Error al eliminar el producto ${pid} del carrito ${cid}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async deleteCart(req, res){
    try {
        const cid = req.params.cid;
        const cart = await deleteCartServices(cid);
        return res.status(200).json({ message: 'Productos eliminados del carrito', cart });
    } catch (error) {
        console.log(`Error al eliminar los productos del carrito ${cid}:`, error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
    }
}

export default CartsController