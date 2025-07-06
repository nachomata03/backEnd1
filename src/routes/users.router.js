import { Router } from 'express';
import { getUsersControllers, postUsersControllers, getUserIdControllers, putUsersControllers, deleteUsersControllers } from '../controllers/users.controllers.js';

const router = Router(); //inicializo el router

router.get('/', async (req, res) => {
    try{
        const result = await getUsersControllers()
        res.json({status: 'success', response: result})
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await getUserIdControllers(id)
        res.json({status: 'success', response: result})
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

router.post('/', async (req, res) => {
    try{
        const body = req.body;
        if(!body.email || !body.password || !body.firstName || !body.lastName || !body.age || !body.role || !body.state){
            const error = new Error('Todos los campos son obligatorios');
            error.statusCode = 409; // Conflicto
            throw error;
        }
        const result = await postUsersControllers(body)
        res.json({status: 'success', response: result})
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const result = await putUsersControllers(id, body);
        res.json({ status: 'success', response: result });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await deleteUsersControllers(id)
        res.json({status: 'success', response: result})
    }catch(error){
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ status: 'error', message: error.message });
    }
})



export default router