import { getUsersServices, getUserIdServices, postUsersServices, putUsersServices, deleteUsersServices } from "../services/users.services.js";

class UsersController{

    async getUsers(req, res) {
        try{
            const result = await getUsersServices()
            res.json({status: 'success', response: result})
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async getUser(req, res) {
        try{
            const id = req.params.id;
            const result = await getUserIdServices(id)
            res.json({status: 'success', response: result})
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async createUser(req, res){
        try{
            const body = req.body;
            if(!body.email || !body.password || !body.firstName || !body.lastName || !body.age || !body.role || !body.state){
                const error = new Error('Todos los campos son obligatorios');
                error.statusCode = 409; // Conflicto
                throw error;
            }
            const result = await postUsersServices(body)
            res.status(201).json({ status: 'success', response: result });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }

    async updateUser(req, res){
        try {
            const id = req.params.id;
            const body = req.body;
            const result = await putUsersServices(id, body);
            res.json({ status: 'success', response: result });
        } catch (error) {
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        } 
    }

    async deleteUser(req, res){
        try{
            const id = req.params.id;
            const result = await deleteUsersServices(id)
            res.json({status: 'success', response: result})
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({ status: 'error', message: error.message });
        }
    }    
}

export default UsersController