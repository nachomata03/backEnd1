import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createHash = async (password) => bcrypt.hash(password, 10); //hashea la constraseña

export const isValidPassword = async (user, password) => bcrypt.compareSync(password, user.password); //compoara la constraseña,  la hasea y la compara con el hash guardado

export const generateToken = async (payload) => {
    try{
        const plainPayload = JSON.parse(JSON.stringify(payload));
        const token = jwt.sign(plainPayload, process.env.JWT_SECRET, {expiresIn: '1h'});
        return token;
    }catch(error){
        console.log(`Error al generar el token ${error}`);
    }
}

export async function authMiddleware(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Token inválido' });
    }
}

export function isAdmin(req, res, next) {
    if (!req.user.payload || req.user.payload.role !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    next();
}