const pool = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {

    async create(data) {
        try {

            // Generate SQL
            const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
            // Query the database
            const result = await pool.query(statement);
            
            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    async update(data) {
        try {
            const { id, ...params } = data;
            // Generate SQL - using helper for dynamic paramter injection
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(params, null, 'users') + condition;
            // Query the database
            const result = await pool.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    async findOneByEmail(email) {
        try {
            // Generate SQL
            const statement = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            // Query database
            const result = await pool.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null; 

        } catch (err) {
            throw new Error(err);
        }
    }

    async findOneById(idl) {
        try {
            // Generate SQL
            const statement = 'SELECT * FROM users WHERE id = $1';
            const values = [id];
            // Query database
            const result = await pool.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
            }

            return null; 
            
        } catch (err) {
            throw new Error(err);
        }
    }

}