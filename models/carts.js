const pool = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {
    constructor(data = {}) {
        this.created = data.created || moment.utc().toISOString();
        this.modified = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
    }

    async create(userId) {
        try {
            const data = { user_id: userId, ...this };
            // Generate SQL
            const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
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

    static async findOneByUser(userId) {
        try {
            // Generate SQL
            const statement = 'SELECT * FROM carts WHERE user_id = $1';
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

    static async findOneById(id) {
        try {
    
          // Generate SQL statement
          const statement = `SELECT *
                             FROM carts
                             WHERE id" = $1`;
          const values = [id];
      
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