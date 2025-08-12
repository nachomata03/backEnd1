import { createHash } from "../utils.js";

export default class UsersService { 
    constructor(userRepository, cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository
    }
    async getUsers() {
        try{
            const users = await this.userRepository.getUsers();
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

    async getUser(id) {
        try{
            const res = await this.userRepository.getUser(id);
            if(!res){
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error
            }
            return res;
        }catch(error){
            throw error
        }
    }

    async createUser(body) {
        try{
            // Verificar si ya existe un usuario con ese email
            const existingUser = await this.userRepository.getUserByEmail(body.email);
            if (existingUser) {
                const error = new Error('El email ya está registrado');
                error.statusCode = 409; // Conflicto
                throw error;
            }
            const cart = await this.cartRepository.createCart([]);
            
            const userHash = {
                ...body,
                cartId: cart._id || cart.id,
                password: await createHash(body.password)
            }
            const result = await this.userRepository.createUser(userHash)
            return result;
        }catch(error){
            throw error
        }
    }

    async updateUser(id, body) {
        try {
            const user = await this.userRepository.getUser(id);
            if (!user) {
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error;
            }

            if (body.password) {
                body.password = await createHash(body.password);
            }
            await this.userRepository.updateUser(id, body);
            const modifiedUser = await this.userRepository.getUser(id);
            return modifiedUser;

        } catch (error) {
            throw error; 
        }
    }

    async deleteUser(id) {
        try{
            const user = await this.userRepository.getUser(id);
            if(!user){
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                throw error
            }
            await this.cartRepository.deleteCart(user.cartId);
            const result = await this.userRepository.deleteUser(id);
            return result;
        }catch(error){
            throw error
        }
    }

    async getUserByEmail(email){
        try{
            const user = await this.userRepository.getUserByEmail(email);
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
}