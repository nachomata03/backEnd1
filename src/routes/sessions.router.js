import { Router } from "express";
import passport from "passport";

const router = Router();


router.get('/logout', async (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/api/sessions/login');
});


router.get('/login', (req, res) => {
    res.render('login', {title: 'login'})
})

/* esto es para sessions
router.post('/login', passport.authenticate('login', {successRedirect: '/products', failureRedirect: '/api/sessions/register'}), async (req, res) => {
    res.cookie('access_token', payload.token, {httpOnly: true, signed: true})
}) */

router.post('/login', async (req, res) => {
    passport.authenticate('login', (err, token, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        if (!token) return res.status(401).render('login', { error: info?.message || 'Credenciales inválidas' });

        res.cookie('access_token', token, {httpOnly: true})
        res.redirect('/api/sessions/current')
})(req, res)
})


router.get('/register', (req, res) => {
    res.render('register', {title: 'register'})
})

router.post('/register', async (req, res) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        if (!user) return res.status(401).render('register', { error: info?.message || 'Usuario existente' });

        res.redirect('/api/sessions/login')
})(req, res)
})

router.get('/github', passport.authenticate('github', {successRedirect: '/api/sessions/current'}), async (req, res) => {
})

router.get('/githubcallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/sessions/login')
})

router.get('/githubcallback', async (err, result, info) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error del servidor' });
    }
    if (!result.user) return res.status(401).render('register', { error: info?.message || 'Usuario existente' });

    res.redirect('/api/sessions/login')
})

router.get('/current', passport.authenticate("jwt", {session: false}), async (req, res) => {
    const user = req.user
    res.render('current', {user})
})

export default router