import { Strategy } from "passport-local";
import UserModel from "../../models/Users.models.js";
import { createHash, isValidPassword } from "../../utils.js";
import CartModel from "../../models/Carts.models.js";
import {generateToken} from "../../utils.js"


async function verifyRegister (req, username, password, done) {
    const user = req
    try {
        const emailExistente = await UserModel.findOne({email: username})
        if (emailExistente) {
            return done(null, false, {message: 'El usuario ya existe'})
        }

        //creacion de un carrito para el usuario
        const lastCart = await CartModel.findOne().sort({ id: -1 });
        const nextId = lastCart ? lastCart.id + 1 : 1;
        const cart = await CartModel.create({
            id: nextId,
            products: []
        });

        const userConHash = {
            ...user,
            cartId : cart._id,
            password: await createHash(password)
        }
        await UserModel.create(userConHash)
        return done(null, result)

    } catch (error) {
        console.log(error)
        return done(error)
    }
}

async function verifyLogin (username, password, done){
    try{
        const user = await UserModel.findOne({email: username})
        if(!user) return done(null, false, {message: 'Credenciales incorrectas'})
        const passwordOk = await isValidPassword(user, password)
        if(!passwordOk) return done(null, false, {message: 'Credenciales incorrectas'})
        
        const payload = {username: user.email, id: user._id, role: user.role, nameUser: user.name};
        const token = await generateToken(payload)
        if(!token) return done(null, false, {message: 'No se pudo generar el token'})
        /* para cuando se usa session
        return done(null, user) */
        return done(null, token)
    }catch(error){
        console.log(error)
        return done(error)
    }
}



const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);

const loginLocal = new Strategy({usernameField: "email"}, verifyLogin);

export {registerLocal, loginLocal} 