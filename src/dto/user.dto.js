export default class userDto{
    constructor(user){
        this.first_name = user.firstName,
        this.last_name = user.lastName,
        this.email = user.email,
        this.age = user.age,
        this.role = user.role,
        this.id = user._id ?? user.id,
        this.cart = user.cartId
    }
}