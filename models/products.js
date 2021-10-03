const pool= require('../db');

module.exports = class ProductModel {

    async find(options = {}) {
        try {
            // Generate SQL
            const statement = 'SELECT * FROM products';
            const values = [];
            // Query database
            const result = await pool.query(statement, values);

            if(result.rows?.length){
                return result.rows[0];
            }
            
            return null;

        } catch (err) {
            throw new Error(err);
        }
    }

    async findOne(id) {
        try {
           // Generate SQL
           const statement = 'SELECT * FROM products WHERE id = $1';
           const values = [id];
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