const express = require('express');
const router = express.Router();

const CartService = require('../services/cartservices');
const CartServiceInstance = new CartService();

module.exports = (app, passport) => {

    app.use('/carts', router);

    router.get('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartServiceInstance.loadCart(id);

            res.status(200).send(response);

        } catch (err) {
            next(err);
        }
    })

    router.post('/mine', async (req, res, next) => {
        try {
            const { id } = req.user;

            const response = await CartServiceInstance.create({ userId: id });

            res.status(200).send(response);

        } catch (err) {
            next(err);
        }
    })

    router.post('/mine/products', async (req, res, next) => {
        try {
           const { id } = req.user;
           const data = req.body;
           
           const response = await CartServiceInstance.addProduct(id, data);

           res.status(200).send(response);

        } catch (err) {
            next(err);
        }
    })

    router.put('/mine/products/:cartProductId', async (req, res, next) => {
        try {
            const { cartProductId } = req.params;
            const data = req.body;

            const response = await CartServiceInstance.updateProduct(cartProductId, data);

            res.status(200).send(response);

        } catch (err) {
            next(err);
        }
    })

    router.delete('/mine/items/:cartProductId', async (req, res, next) => {
        try {
          const { cartProductId } = req.params;
        
          const response = await CartServiceInstance.removeProduct(cartProductId);
    
          res.status(200).send(response);

        } catch(err) {
          next(err);
        }
      });

}

