import mongoose from "mongoose";

const usersCollection = "users"

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"]
    },
    state: {
        type: String,
        default: "activo",
        enum: ["activo", "inactivo"]
    },
    githubId: {
        type: String,
        default: null
    }, 
    twitterId: {
        type: String,
        default: null
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
})

const UserModel = mongoose.model(usersCollection, UserSchema)
export default UserModel

