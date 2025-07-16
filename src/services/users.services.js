import UsersModel from "../models/Users.models.js";
import { createHash } from "../utils.js";
import CartModel from "../models/Carts.models.js";

export const getUsersServices = async () => {
    try{
        const users = await UsersModel.find();
        if(!users){
            const error = new Error('Usuarios no encontrados');
            error.statusCode = 404;
            throw error
        }
        return users;
    }catch(error){
        throw error
    }
}

export const getUserIdServices = async (id) => {
        try{
        const user = await UsersModel.findById(id);
        if(!user){
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error
        }
        return user;
    }catch(error){
        throw error
    }
}

export const postUsersServices = async (body) => {
    try{

        // Verificar si ya existe un usuario con ese email
        const existingUser = await UsersModel.findOne({ email: body.email });
        if (existingUser) {
            const error = new Error('El email ya está registrado');
            error.statusCode = 409; // Conflicto
            throw error;
        }

        const lastCart = await CartModel.findOne().sort({ id: -1 });
        const nextId = lastCart ? lastCart.id + 1 : 1;

        const cart = await CartModel.create({
            id: nextId,
            products: []
        });
        const userHash = {
            ...body,
            cartId: cart._id,
            password: await createHash(body.password)
        }
        const result = await UsersModel.create(userHash)
        return result;
    }catch(error){
        throw error
    }
}

export const putUsersServices = async (id, body) => {
    try {
        const user = await UsersModel.findById(id);
        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error;
        }

        if (body.password) {
            body.password = await createHash(body.password);
        }

        await UsersModel.updateOne({ _id: id }, { $set: body });
        const modifiedUser = await UsersModel.findById(id);
        return modifiedUser;

    } catch (error) {
        throw error; 
    }
}

export const deleteUsersServices = async (id) => {
    try{
        const user = await UsersModel.findById(id);
        if(!user){
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            throw error
        }
        const result = await UsersModel.deleteOne({ _id: id });
        return result;
    }catch(error){
        throw error
    }
}