import passport from "passport";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env

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
        const user = req.user
        res.render('current', {user})
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
            res.redirect('/api/sessions/login');
        })(req, res, next);
    };
    
    authGithub = passport.authenticate('github', { scope: ['user:email'], session: false });
    
    githubCallback = (req, res) => {
        if (!req.user) {
            return res.redirect('/api/sessions/register');
        }
        const userPayload = {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role,
            cart: req.user.cartId,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        };
        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, { 
            httpOnly: true, 
            maxAge: 3600000 // 1 hora en milisegundos
        });
        res.redirect('/api/sessions/current')
    };
}