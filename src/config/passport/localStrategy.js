import { Strategy } from "passport-local";
import UserModel from "../../models/Users.models.js";
import { createHash, isValidPassword } from "../../utils.js";

async function verifyRegister (req, username, password, done) {
    const user = req
    try {
        const emailExistente = await UserModel.findOne({email: username})
        if (emailExistente) {
            return done(null, false, {message: 'El usuario ya existe'})
        }
        const userConHash = {
            ...user,
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
        return done(null, user)
    }catch(error){
        console.log(error)
        return done(error)
    }
}


const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);

const loginLocal = new Strategy({usernameField: "email"}, verifyLogin);

export {registerLocal, loginLocal} 