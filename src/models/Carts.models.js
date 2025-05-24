import mongoose from "mongoose";

const CartsCollection = "Carts"

const CartSchema = new mongoose.Schema({

    id:{
            type: Number,
            required: true,
            unique: true
        },
    products: [
        {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products' 
        },
        quantity: {
            type: Number,
            required: true
        }
        }
    ]
})

const CartsModel = mongoose.model(CartsCollection, CartSchema)
export default CartsModel