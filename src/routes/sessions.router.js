import { Router } from "express";
import UserModel from "../models/Users.models.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.get('/login-old', async (req, res) => {
    const user = req.query

    if(!user.email || !user.password) return res.status(400).json({error: 'Faltan datos'})

    try {
        const result = await UserModel.findOne({email: user.email,});

        if (!result) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        if (isValidPassword(result.password, user.password)) {
            return res.redirect('/api/sessions/profile');
        }else{
            return res.status(401).json({ error: 'Acesso denegado' });
        }
        /* res.cookie("user", user, {
            httpOnly: true
        }); */
        req.session.user = result

        return res.redirect('/api/sessions/profile');

    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el usuario' });
    } 
})

/* router.post('/register', async (req, res) => {
    try{
        const user = req.body
        const emailExistente = await UserModel.findOne({email: user.email})
        if (emailExistente) {
            return res.status(400).json({error: 'El email ya existe'})
        }
        const userConHash = {
            ...user,
            password: createHash(user.password) //se sobre escribe user.password y hasheandola
        }
        UserModel.create(userConHash).then((result) => {
            res.json({status: 'success', response: result})
        })
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Error al crear el usuario'})
    }
}) */

router.get('/profile', async (req, res) => {
    const user = req.session.user
    
    if(!user) return res.redirect('/api/sessions/login')
    /* if(!user) return res.status(401).json({error: 'No estas logueado'}) */
    const perfil = await UserModel.findOne({email: user.email})
    res.render('profile', {"perfil": perfil.toObject()})
})


router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
        return res.status(500).send('Error al cerrar sesión');
        }
        res.clearCookie('connect.sid'); // nombre por defecto del cookie de express-session
        res.redirect('/api/sessions/login');
    });
});












router.get('/login', (req, res) => {
    res.render('login', {title: 'login'})
})

router.post('/login', passport.authenticate('login', {successRedirect: '/products', failureRedirect: '/api/sessions/register'}), async (req, res) => {
    req.session.user = req.user
})


router.get('/register', (req, res) => {
    res.render('register', {title: 'register'})
})

router.post('/register', passport.authenticate('register', {successRedirect: '/api/sessions/profile', failureRedirect: '/'}), async (req, res) => {
    req.session.user = req.user
})


router.get('/github', passport.authenticate('github', {failureRedirect: '/api/sessions/register'}, {successRedirect: '/api/sessions/profile'}), async (req, res) => {
})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/sessions/login'}), async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/sessions/profile')
})










/* router.get('/github/register', passport.authenticate('githubregister', {failureRedirect: '/'}, {successRedirect: '/api/sessions/profile'}), async (req, res) => {
})

router.get('/githubcallback/login', passport.authenticate('githublogin', {failureRedirect: '/api/sessions/login'}), async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/sessions/profile')
})

router.get('/githubcallback/register', passport.authenticate('githublogin', {failureRedirect: '/api/sessions/register'}), async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/sessions/profile')
}) */

export default router