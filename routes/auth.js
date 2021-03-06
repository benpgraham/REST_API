const express = require('express');
const router = express.Router();

const AuthService = require('../services/authservices');
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {

    app.use('/api/auth', router);

    router.post('/register', async (req, res, next) => {
        try {
            const data = req.body;
            const response = await AuthServiceInstance.register(data);

            res.status(200).send(response);

        } catch (err) {
            next(err);
        }
    })

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const response = await AuthServiceInstance.login({ email, password });

          res.status(200).send(response);

        } catch (err) {
          next(err);
        }
    }
    );

    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

}