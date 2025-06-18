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
    }
})

const UserModel = mongoose.model(usersCollection, UserSchema)
export default UserModel

