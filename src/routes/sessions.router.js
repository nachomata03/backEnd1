import { Router } from "express";
import passport from "passport";
import SessionsController from "../controllers/session.controller.js";

const sessionsController = new SessionsController();

const router = Router();


router.get('/logout', sessionsController.getLogout);


router.get('/login', sessionsController.getLogin)

/* esto es para sessions
router.post('/login', passport.authenticate('login', {successRedirect: '/products', failureRedirect: '/api/sessions/register'}), async (req, res) => {
    res.cookie('access_token', payload.token, {httpOnly: true, signed: true})
}) */

router.post('/login', sessionsController.loginUser)


router.get('/register', sessionsController.getRegister)

router.post('/register', sessionsController.registerUser)

router.get('/github', sessionsController.authGithub)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/login', session: false }), sessionsController.githubCallback)

router.get('/current', passport.authenticate("jwt", {session: false}), sessionsController.getCurrentUser)

export default router