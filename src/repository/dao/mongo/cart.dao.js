import CartsModel from "./models/Carts.models.js";

export default class CartsMongoDao{
    async getCart(id){
        const result = await CartsModel.findById(id);
        return result
    }
    async createCart(products){
        const idCart = await CartsModel.countDocuments();
        const cartId = idCart + 1; // Genera el ID del carrito contando cuando carritos hay
        return await CartsModel.create({
            id: cartId, 
            products: products.map(p => ({
                id: p.id,
                quantity: p.quantity
            }))
        })
    }
    async createProductToCart(cart){
        cart.markModified('products'); // avisa que se modifican los productos
        return await cart.save();
    }
    async updateCart(cart){
        cart.markModified('products');
        return await cart.save();
    }
    async updateProductFromCart(cart){
        cart.markModified('products');
        return await cart.save();
    }
    async deleteProductFromCart(cart){
        return await cart.save();
    }
    async deleteCart(id){
        return await CartsModel.deleteOne({ _id: id });
    }

    async cleanCart(id){
        return await CartsModel.updateOne({ _id: id }, { $set: { products: [] } });
    }

    async cartLean(id){
        return await CartsModel.findById(id).populate('products.id').lean();
    }
}