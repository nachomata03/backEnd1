export default class cartDto{
    constructor(cart) {
        this.id = cart._id ?? cart.id,
        this.products = cart.products
    }
}