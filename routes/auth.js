const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const pool = require("../db");

module.exports = (app, passport) => {

    app.use('/auth', router);

    router.post('/register', async (req, res, next) => {
        try {
            // Destructure data from request body
            const { email, password, first_name, last_name } = req.body;
            
            // Check that the email address is unique
            const emailList = await pool.query('SELECT email FROM users WHERE email = $1', [email]);

            if(emailList.rows.length !== 0){
                return res.status(400).send('Email needs to be unique!');
            }
            
            // If unique, create new user
            const newUser = await pool.query('INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4)',
            [email, password, first_name, last_name]);

            res.json('New User Created');
            
        } catch (err) {
            console.error(err.message);
        }
    })

    router.post('/login', passport.authenticate('local'), async (req, res, next) => {
        try {
            const {email, password } = req.body;
            
            let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

          // Return user object if exists, set as null if it doesn't
          if(user.rows.length){
            user = user.rows[0];
          } else {
            user = null;
          }

          // Create error if no user
          if(!user){
            throw createError(401, 'Incorrect username or password');
          }

          // Check password against the user
          if(user.password !== password) {
            throw createError(401, 'Incorrect username or password');
          }

          res.status(200).send(user);

        } catch (err) {
            console.error(err.message);
        }
    }
    );

}