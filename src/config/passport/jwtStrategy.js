import passportJwt from "passport-jwt";
import config from "../../config/index.js";

const {JWT_SECRET} = config

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
        return done(null, jwt_payload)
    }catch(error){
        console.log(error)
        return done(error, false, {message: 'No se pudo encontrar el token'})
    }
}

const jwt = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET}
, verifyJwt)

export default jwt