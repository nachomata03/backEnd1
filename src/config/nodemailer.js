import nodemailer from 'nodemailer';
import config from '../config/index.js'

const {PASSNODEMAILER, USERNODEMAILER} = config

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: USERNODEMAILER,
        pass: PASSNODEMAILER
    }
})

export async function resetPassword(to, resetLink) {
    try{
        const connection = await transporter.verify();
        if(connection){
            const info = await transporter.sendMail({
                from: `"Soporte" <${USERNODEMAILER}>`,
                to,
                subject: 'Restablecimiento de contraseña',
                html: `
                <p>Hiciste una solicitud para recuperar tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para restablecerla:</p>
                <a href="${resetLink}">Recuperar contraseña</a>
                <p>Este enlace caduca en 1 hora.</p>
            `
            });
            console.log("Mensaje enviado", info);
            return true;
        }else{
            console.log("No se pudo conectar");
            return false;
        }
        }catch(error){
            console.log("Error al enviar el correo", error);
            return false;
        }
}

export async function SendRegisterEmail(user) {
    try{
        const connection = await transporter.verify();
        if(connection){
            const info = await transporter.sendMail({
                from: `"Soporte" <${USERNODEMAILER}>`,
                to: user.email,
                subject: 'Registro de usuario',
                html: `
                <p>Bienvenido a nuestra plataforma ${user.first_name} ${user.last_name}.</p>
                <p>Gracias por registrarte en nuestra plataforma.</p>
            `
            });
            console.log("Mensaje enviado", info);
            return true;
        }else{
            console.log("No se pudo conectar");
            return false;
        }
    }catch(error){
        console.log("Error al enviar el correo", error);
        return false;
    }
}