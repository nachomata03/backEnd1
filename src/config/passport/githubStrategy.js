import { Strategy as GitHubStrategy } from "passport-github2";
import UserModel from "../../repository/dao/mongo/models/Users.models.js";
import { generateToken } from "../../utils.js";
import CartModel from '../../repository/dao/mongo/models/Carts.models.js';
import config from "../../config/index.js";

const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET} = config;

async function verifyGitHub (accessToken, refreshToken, profile, done) {
    console.log(`profile: ${JSON.stringify(profile, null, 2)}`);
    try{
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        if (!email) {
            // Si no se pudo obtener el email, se debe devolver un error
            console.error('No se pudo obtener el correo electrónico del perfil de GitHub.');
            return done(null, false, { message: 'No se pudo obtener el correo electrónico del perfil de GitHub.' });
        }

        const user = await UserModel.findOne({email: email})

        if(user){
            console.log('Usuario existente logueado via GitHub:', user.email);
            return done(null, user);
        }

        //creacion de un carrito para el usuario
        const lastCart = await CartModel.findOne().sort({ id: -1 });
        const nextId = lastCart ? lastCart.id + 1 : 1;
        const cart = await CartModel.create({
            id: nextId,
            products: []
        });

        const fullName = profile.displayName || profile._json.name || profile.username;
        let firstName = 'Usuario'; // Valor por defecto
        let lastName = 'GitHub';   // Valor por defecto

        if (fullName && typeof fullName === 'string') {
            const nameParts = fullName.split(' ');
            firstName = nameParts[0] || 'Usuario';
            lastName = nameParts.slice(1).join(' ') || 'GitHub';
        }
    
        const newUser = {
            firstName,
            lastName,
            email: email,
            age: 18,
            password: "aa123",
            githubId: profile.id,
            cartId: cart._id
        }
        const createdUser = await UserModel.create(newUser)
        console.log('Nuevo usuario creado via GitHub:', createdUser.email);
        return done(null, createdUser)
        
    }catch(error){
        console.log(`Error en login de git hub: ${error}`)
        return done(error)
    }
}

const github = new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    scope: ['user:email']
}, verifyGitHub);

export default github