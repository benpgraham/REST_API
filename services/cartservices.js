const createError = require('http-errors');
const CartModel = require('../models/carts');
const OrderModel = require('../models/orders');
const CartProductModel = require('../models/cartproduct');

module.exports = class CartService {

    async create(data) {
        const { userId } = data;

        try {
            const Cart = new CartModel();
            const cart = await Cart.create(userId);

            return cart;

        } catch (err) {
            throw err;
        }
    }

    async loadCart(userId) {
        try {
            const cart = await CartModel.findOneByUser(userId);
            const products = await CartProductModel.find(cart.id);
            cart.products = products;
            
            return cart;

        } catch (err) {
            throw err;
        }
    }

    async addProduct( userId, product ) {
        try {
            // Load cart
            const cart = await CartModel.findOneByUser(userId);

            const cartProduct = await CartProductModel.create({ cart_id: cart.id, ...product });

            return cartProduct;

        } catch (err) {
            throw err;
        }
    }

    async removeProduct(cartProductId) {
        try {
            // Delete cart item
            const cartProduct = await CartProductModel.delete(cartProductId);

            return cartProduct;

        } catch (err) {
            throw err;
        }
    }

    async updateProduct(cartProductId, data) {
        try {
            // Update cart item
            const cartProduct = await CartProductModel.update(cartProductId, data);

            return cartProduct;

        } catch (err) {
            throw err;
        }
    }

    async checkout(cartId, userId, paymentInfo) {
        try {
            // Fill out later

        } catch (err) {
            throw err;
        }
    }

}