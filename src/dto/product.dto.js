export default class productDto{
    constructor(product){
        this.id = product._id ?? product.id,
        this.title = product.title,
        this.description = product.description,
        this.code = product.code,
        this.price = product.price,
        this.stock = product.stock, 
        this.category = product.category,
        this.discount = product.discount
    }
}