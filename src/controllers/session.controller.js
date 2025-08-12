import passport from "passport";
import jwt from "jsonwebtoken";
import { usersService } from '../services/index.js';
import { generateToken, isValidPassword } from "../utils.js";
import config from "../config/index.js";
import { resetPassword, SendRegisterEmail } from "../config/nodemailer.js";
import userDto from "../dto/user.dto.js";

const {FRONTEND_URL} = config

export default class SessionsController{
    async getLogin(req, res){
        res.render('login', {title: 'login'})
    }
    async getRegister(req, res){
        res.render('register', {title: 'register'})
    }
    async getLogout(req, res){
        res.clearCookie('access_token');
        res.redirect('/api/sessions/login');
    }

    getCurrentUser(req, res){
        console.log(req.user);
        const user = req.user.payload || req.user
        res.render('current', {user, title: 'current'})
    }

    loginUser = (req, res, next) => {
        passport.authenticate('login', (err, token, info) => {
            if (err) {
                console.error('Error durante la autenticación de login:', err);
                return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
            }
            if (!token) {
                return res.status(401).render('login', { error: info?.message || 'Credenciales inválidas' });
            }
            res.cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //24h
            res.redirect('/api/sessions/current'); 
        })(req, res, next);
    };
    
    registerUser = (req, res, next) => {
        passport.authenticate('register', async (err, user, info) => {
            if (err) {
                console.error('Error durante el registro:', err);
                if (err.statusCode === 409) {
                    return res.status(409).render('register', { error: err.message });
                }
                return res.status(500).json({ status: 'error', message: 'Error interno del servidor al registrar' });
            }
            if (!user) {
                return res.status(400).render('register', { error: info?.message || 'Error en los datos de registro' });
            }
            try{
                const userdto = new userDto(user)
                const sendEmail = await SendRegisterEmail(userdto)
                if(!sendEmail) return res.status(500).json({ status: 'error', message: 'Error al enviar el correo' });
            }catch(error){
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ status: 'error', message: 'Error al enviar el correo' });
            }
            res.redirect('/api/sessions/login');
        })(req, res, next);
    };
    
    authGithub = passport.authenticate('github', { scope: ['user:email'], session: false });
    
    githubCallback = async (req, res) => {
        if (!req.user) {
            return res.redirect('/api/sessions/register');
        }
        try{
            const payload = new userDto(req.user);
            const token = await generateToken(payload);

            res.cookie('access_token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //24h
            res.redirect('/api/sessions/current')
        }catch(error){
            console.error('Error al generar el token:', error);
            return res.status(500).json({ status: 'error', message: 'Error al generar el token' });
        }
    };


    getForgotPassword = (req, res) => {
        res.render('forgotPassword', {title: 'forgotPassword'})
    }

    postForgotPassword = async (req, res) => {
        const email = req.body.email;
        try{
            const user =  await usersService.getUserByEmail(email)
            if(!user)
                return res.render('forgotPassword', {error: 'Usuario no encontrado', title: 'forgotPassword'})

            const token = await generateToken({id: user._id}); 
            if(!token)
                return res.render('forgotPassword', {error: 'Error al generar el token', title: 'forgotPassword'})

            const resetLink = `${FRONTEND_URL}/reset-password/${token}`;

            const sendEmail = await resetPassword(email, resetLink);
            if(!sendEmail)
                return res.render('forgotPassword', {error: 'Error al enviar el correo', title: 'fogotPassword'})

            res.render('forgotPassword', {message: 'Correo enviado', title: 'forgotPassword'})

        }catch(error){
            console.error("Error general en postForgotPassword:", error);
            return res.render("forgotPassword", {
                error: "Ocurrió un error inesperado",
                title: "resetPassword"
            });
        }
    }

    getResetPassword = (req, res) => {
        const token = req.params.token;
        res.render('resetPassword', {token, title: 'Restablecer contraseña'})
    }

    putResetPassword = async (req, res) => {
        const token = req.params.token;
        const { password, confirmPassword} = req.body;
        try{
            if (password !== confirmPassword) {
                return res.status(400).render('resetPassword', {
                    error: 'Las contraseñas no coinciden',
                    title: 'Restablecer contraseña',
                    token
                });
            }

            const payload = jwt.verify(token, process.env.JWT_SECRET);

            if(!payload)
                return res.status(401).json({ message: 'El enlace de restablecimiento ha expirado' });

            const user = await usersService.getUser(payload.id);
            
            const passwordOk = await isValidPassword(user, password);
            if(passwordOk)
                return res.status(400).render('resetPassword', {
                    error: 'No puedes cambiar tu contraseña por la misma que tienes actualmente',
                    title: 'Restablecer contraseña',
                    token
                });

            const newUser = await usersService.updateUser(payload.id, {password});
            console.log("en putResetPassword", newUser);

            res.render('resetPassword', {message: 'Contraseña restablecida', title: 'resetPassword'})

        }catch(error){
            console.error('Error en putResetPassword:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}