const pool = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class OrderProductModel {
    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.description = data.description;
        this.modified = moment.utc().toISOString();
        this.name = data.name;
        this.price = data.price || 0;
        this.product_id = data.id;
        this.quantity = data.quantity || 1;
        this.order_id = data.orderId || null;
    }

    static async create(data) {
        try {
            // Generate SQL
            const statement = pgp.helpers.insert(data, null, 'order_product') + 'RETURNING *';
            // Query database
            const result = await pool.query(statement);

            if(result.rows?.length){
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    static async find(orderId) {
        try {
            // Generate SQL
            const statement = `SELECT order_product.quantity, order_product.id AS "cartItemId", p.* FROM order_product
            INNER JOIN products p ON p.id = order_product."product_id" WHERE order_id = $1`;
            const values = [orderId];
            // Query database
            const result = await pool.query(statement, values);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

}