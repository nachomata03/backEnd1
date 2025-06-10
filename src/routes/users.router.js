import { response, Router } from 'express';
import UsersModel from '../models/Users.models.js';

const router = Router(); //inicializo el router

router.get('/', async (req, res) => {
    const users = await UsersModel.find()
    res.json({status: 'success', response: users})
})

router.post('/', async (req, res) => { //se le puede ver si esta el usuario ya hecho
    const {name, lastname, email, age, status} = req.body
    if(!name || !lastname || !email || !age || !status) return res.status(400).json({error: 'Faltan datos'})
    const result = await UsersModel.insertOne({name, lastname, email, age, status})
    res.json({status: 'success', response: result})
})

router.put('/:id', async (req, res) => { //se puede hacer de ver primero si encuentra el usuario
    const id = req.params.id
    const {body} = req;
    //const result = await UsersModel.updateOne({_id: id}, {$set: {...body}})
    const result = await UsersModel.findByIdAndUpdate({_id: id}, {$set: {...body}})
    res.json({status: 'success', response: result})
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