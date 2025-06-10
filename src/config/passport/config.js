import passport from "passport";
import {registerLocal, loginLocal} from "./localStrategy.js";
import UserModel from "../../models/Users.models.js";

const initializePassport = () => {
    passport.use("register", registerLocal)
    passport.use("login", loginLocal)
    /* passport.use("github", githubStrategy) */
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        delete user.password
        done(null, user)
    })
}

export default initializePassport;