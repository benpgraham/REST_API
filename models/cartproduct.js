const pool = require('../db');
const pgp = require('pg-promise');

module.exports = class CartProductModel {

    static async create(data) {
        try {
            //Generate SQL
            const statement = pgp.helpers.insert(data, null, 'cart_product') + 'RETURNING *';
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

    static async update(id, data) {
        try {
            // Generate SQL
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(data, null, 'cart_product') + condition;
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

    static async find(cartId) {
        try {
          // Generate SQL
          const statement = `SELECT 
                                ci.quantity,
                                ci.id AS "cartItemId", 
                                p.*
                             FROM "cart_product" ci
                             INNER JOIN products p ON p.id = ci."product_id"
                             WHERE "cart_id" = $1`
          const values = [cartId];
      
          // Execute SQL statment
          const result = await pool.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows;
          }
    
          return [];
    
        } catch(err) {
          throw new Error(err);
        }
      }

      static async delete(id) {
        try {
          // Generate SQL
          const statement = `DELETE
                             FROM "cart_product"
                             WHERE id = $1
                             RETURNING *`;
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