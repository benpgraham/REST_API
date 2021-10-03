const pool = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({capSQL: true});
const OrderProduct = require('./orderproduct');

module.exports = class OrderModel {
    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.items = data.items || [];
        this.modified = moment.utc().toISOString();
        this.status = data.status || 'PENDING';
        this.total = data.total || 0;
        this.user_id = data.userId || null;
    }

    addItems(items) {
        this.items = items.map(item => new OrderItem(item));
    }

    async create() {
        try {
            const {items, ...order } = this;
            // Generate SQL
            const statement = pgp.helpers.insert(order, null, 'orders') + 'RETURNING *';
            // Query database
            const result = await pool.query(statement);

            if(result.rows?.length) {
                Object.assign(this, result.rows[0]);
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    async update(data) {
        try {
            // Generate SQL
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id: this.id });
            const statement = pgp.helpers.update(data, null, 'orders') + condition;
            // Query database
            const result = await pool.query(statement);

            if(result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    static async findByUser(userId) {
        try {
            // Generate SQL
            const statement = 'SELECT * FROM orders WHERE user_id = $1';
            const values = [userId];
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

    static async findById(orderId) {
        try {

            // Generate SQL statement
            const statement = `SELECT *
                               FROM orders
                               WHERE id = $1`;
            const values = [orderId];
        
            // Execute SQL statment
            const result = await pool.query(statement, values);
      
            if (result.rows?.length) {
              return result.rows[0];
            }
      
            return null;
      
          } catch(err) {
            throw new Error(err);
          }
    }
}