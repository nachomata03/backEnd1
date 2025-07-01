import passportJwt from "passport-jwt";
import UserModel from "../../models/Users.models.js";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;


const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};


async function verifyJwt(jwt_payload, done) {
    try{
        /* const user = await UserModel.findById({_id: jwt_payload.id})
        if(!user) return done(null, false, {message: 'No se encontraron los datos del usuario'})
        return done(null, user) */
        return done(null, jwt_payload)
    }catch(error){
        console.log(error)
        return done(error, false, {message: 'No se pudo encontrar el token'})
    }
}

const jwt = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET}
, verifyJwt)

export default jwt