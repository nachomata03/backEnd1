import passport from "passport";
import github from "./githubStrategy.js";
import { loginLocal, registerLocal } from "./localStrategy.js";
import jwt from "./jwtStrategy.js";

const initializePassport = () => {
    passport.use("register", registerLocal)
    passport.use("login", loginLocal)

    passport.use("github", github)

    passport.use("jwt", jwt)

    /* passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        delete user.password
        done(null, user)
    }) */
}

export default initializePassport;