const express = require('express');
const router = express.Router();
const pool = require("../db");

module.exports = (app) => {

    app.use('/cart', router);

    router.get('/', async (req, res, next) => {
        try {
            const response = await pool.query('SELECT * FROM cart');
            res.json(response.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get('/:id', async (req, res, next) => {

    });

    router.post('/', async (req, res, next) => {
        try {
            const { user_id } = req.body;
            const newCart = await pool.query('INSERT INTO cart (created, user_id) VALUES (NOW(), $1)', [user_id]);
            res.json('New cart created');
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete('/:id', async (req, res, next) => {

    });

}

