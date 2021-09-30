const express = require('express');
const router = express.Router();
const pool = require("../db");

module.exports = (app) => {

    app.use('/product', router);

    router.get('/', async (req, res, next) => {
        try {
            const response = await pool.query("SELECT * FROM products");
            res.json(response.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
            res.json(response.rows);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const { name, price, description, stock_level } = req.body;
            const newProduct = await pool.query(
                "INSERT INTO products (name, price, description, stock_level) VALUES ($1, $2, $3, $4)",
                [name, price, description, stock_level]);
            res.json("New product created");
        } catch (err) {
            console.error(err.message);
        }
    });

    router.put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, price, description, stock_level } = req.body;
            if (name){
                const updatedUser = await pool.query('UPDATE products SET name = $1 WHERE id = $2', [name, id]);
            }
            if (price){
                const updatedUser = await pool.query('UPDATE products SET price = $1 WHERE id = $2', [price, id]);
            }
            if (description){
                const updatedUser = await pool.query('UPDATE products SET description = $1 WHERE id = $2', [description, id]);
            }
            if (stock_level){
                const updatedUser = await pool.query('UPDATE products SET stock_level = $1 WHERE id = $2', [stock_level, id]);
            }
            res.json(`User ${id} updated`);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedProduct = await pool.query('DELETE FROM products WHERE id = $1', [id]);
            res.json(`Product ${id} deleted`);
        } catch (err) {
            console.error(err.message);
        }
    });

}
