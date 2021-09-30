const express = require('express');
const router = express.Router();
const pool = require("../db");

module.exports = (app) => {

    app.use('/order', router);

    router.get('/', async (req, res, next) => {
        try {
            const response = await pool.query('SELECT * FROM orders');
            res.json(response.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

}