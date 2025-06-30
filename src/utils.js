import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createHash = async (password) => bcrypt.hash(password, 10); //hashea la constraseña

export const isValidPassword = async (user, password) => bcrypt.compareSync(password, user.password); //compoara la constraseña,  la hasea y la compara con el hash guardado

export const generateToken = async (payload) => {
    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        return token;
    }catch(error){
        console.log(`Error al generar el token ${error}`);
    }
}
