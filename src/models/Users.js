import mongoose from "mongoose";

const usersCollection = "users"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
})

const UserModel = mongoose.model(usersCollection, UserSchema)
export default UserModel