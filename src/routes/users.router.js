import { Router } from 'express';
import UsersController from '../controllers/users.controllers.js';

const usersController = new UsersController()

const router = Router(); //inicializo el router

router.get('/', usersController.getUsers)

router.get('/:id', usersController.getUser)

router.post('/', usersController.createUser)

router.put('/:id', usersController.updateUser)

router.delete('/:id', usersController.deleteUser)



export default router