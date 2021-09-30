const express = require('express');
const router = express.Router();
const pool = require("../db");

module.exports = (app) => {

    app.use('/user', router);

    router.get('/', async (req, res, next) => {
        try {
            const response = await pool.query('SELECT * FROM users');
            res.json(response.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            res.json(response.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { email, password, first_name, last_name } = req.body;
            if (email){
                const updatedUser = await pool.query('UPDATE users SET email = $1 WHERE id = $2', [email, id]);
            }
            if (password){
                const updatedUser = await pool.query('UPDATE users SET password = $1 WHERE id = $2', [password, id]);
            }
            if (first_name){
                const updatedUser = await pool.query('UPDATE users SET first_name = $1 WHERE id = $2', [first_name, id]);
            }
            if (last_name){
                const updatedUser = await pool.query('UPDATE users SET last_name = $1 WHERE id = $2', [last_name, id]);
            }
            res.json(`User ${id} updated`);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleteUser = await pool.query('DELETE FROM users WHERE id = $1', [id])
            res.json(`User ${id} Deleted`);
        } catch (err) {
            console.error(err.message);
        }
    });

}