import { Strategy as GitHubStrategy } from "passport-github2";
import UserModel from "../../models/Users.models.js";
import dotenv from 'dotenv';
import { json } from "express";
dotenv.config();

async function verifyGitHub (accessToken, refreshToken, profile, done) {
    console.log(`profile: ${JSON.stringify(profile, null, 2)}`);
    try{
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

        if (!email) {
            return done(null, false, { message: 'No se pudo obtener el correo electrónico del perfil de GitHub.' });
        }

        const user = await UserModel.findOne({email: email})

        if(!user){
            const newUser = {
            name: profile._json.name,
            lastname: profile._json.lastname || "aa",
            email: email,
            age: 18,
            password: "aa123",
            githubId: profile._json.id
            }
            const createdUser = await UserModel.create(newUser)
            return done(null, createdUser)
        }
        
        return done(null, user)
    }catch(error){
        console.log(`Error en login de git hub: ${error}`)
        return done(error)
    }
}

const github = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    scope: ['user:email']
}, verifyGitHub);

export default github