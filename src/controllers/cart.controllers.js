import { cartsService } from "../services/index.js";
class CartsController {
    async getCart(req, res) {
        const id = req.params.cid;
        try {
            const cart = await cartsService.getCart(id);
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
            const respuesta = await cartsService.createCart(body);
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
        const pid = req.params.pid;
        const cid = req.params.cid;
        try {
            const result = await cartsService.createProductToCart(cid, pid);
            res.redirect(`/api/view/${cid}`);
        } catch (error) {
            console.log(`Error al agregar el producto ${pid} al carrito ${cid}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async updateCart(req, res){
        const id = req.params.cid;
        try {
            const body = req.body;
            const cart = await cartsService.updateCart(id, body);
            return res.status(200).json({ message: 'Carrito actualizado con nuevos productos', cart });
        } catch (error) {
            console.log(`Error al actualizar el carrito con el ID ${id}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async updateProductFromCart(req, res){
        const pid = req.params.pid;
        const cid = req.params.cid;
        try {
            const {quantity} = req.body

            const cart = await cartsService.updateProductFromCart(cid, pid, quantity);
            return res.status(200).json({ message: 'Producto actualizado en el carrito', cart });

        } catch (error) {
            console.log(`Error al actualizar el producto ${pid} en el carrito ${cid}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async deleteProductFromCart(req, res){
        const pid = req.params.pid;
        const cid = req.params.cid;
        try{
            const cart = await cartsService.deleteProductFromCart(cid, pid);
            res.render('viewCart', {cart, title: 'Mi carrito'});
        }catch(error){
            console.log(`Error al eliminar el producto ${pid} del carrito ${cid}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async cleanCart(req, res){
    const cid = req.params.cid;
    try {
        const cart = await cartsService.cleanCart(cid);
        res.render('viewCart', {cart, title: 'Mi carrito'});
    } catch (error) {
        console.log(`Error al eliminar los productos del carrito ${cid}:`, error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
    }

    async getCartView(req, res) {
        const id = req.params.cid;
        try{
            const cart = await cartsService.cartLean(id);
            res.render('viewCart', {cart, title: 'Mi carrito'});
        }catch(error){
            console.log(`Error al obtener el carrito con el ID ${id}:`, error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }
}

export default CartsController