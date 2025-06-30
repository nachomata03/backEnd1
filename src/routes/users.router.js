import { response, Router } from 'express';
import UsersModel from '../models/Users.models.js';
import { createHash } from '../utils.js';
import CartModel from '../models/Carts.models.js';

const router = Router(); //inicializo el router

router.get('/', async (req, res) => {
    const users = await UsersModel.find()
    res.json({status: 'success', response: users})
})

router.post('/', async (req, res) => { //se le puede ver si esta el usuario ya hecho
    const body = req.body
    if(!body.firstname || !body.lastname || !body.email || !body.age || !body.state || !body.role || !body.password) return res.status(400).json({error: 'Faltan datos'})

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
    const result = await UsersModel.insertOne(userHash)
    res.json({status: 'success', response: result})
})

router.put('/:id', async (req, res) => { //se puede hacer de ver primero si encuentra el usuario
    const id = req.params.id
    const body = req.body;

    const user = await UsersModel.findById(id);
    if (!user) return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });

    if(body.password) body.password = await createHash(body.password)

    await UsersModel.updateOne({_id: id}, {$set: body})

    const modifiedUser = await UsersModel.findOne({_id: id})

    res.json({status: 'success', response: modifiedUser})
})

router.delete('/:id', async (req, res) => {
    const id = req.params;
    const result = await UsersModel.deleteOne({_id: id})
    res.json({status: 'success', response: result})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const result = await UsersModel.findById(id)
    res.json({status: 'success', response: result})
})

export default router