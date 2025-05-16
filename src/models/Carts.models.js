import mongoose from "mongoose";

const CartsCollection = "Carts"

const CartSchema = new mongoose.Schema({

    id:{
            type: Number,
            required: true,
            unique: true
        },
    products:{
        type: Array,
        products: {
            id: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            quantity: Number
        }
    }
})

const CartsModel = mongoose.model(CartsCollection, CartSchema)
export default CartsModel