const createError = require('http-errors');
const OrderModel = require('../models/orders');
const OrderProductModel = require('../models/orderproduct');

module.exports = class OrderService {

    async create(data) {
        try {
            const Order = new OrderModel();
            const order = await Order.create({ userId, total });

            return cart;

        } catch (err) {
            throw err;
        }
    }

    async list(userId) {
        try {
            // Load user orders based on ID
            const orders = await OrderModel.findByUser(userId);

            return orders;

        } catch (err) {
            throw err;
        }
    }

    async findById(orderId) {
        try {
            // Load user orders based on ID
            const order = await OrderModel.findById(orderId);

            return order;
            
        } catch (err) {
            throw err;
        }
    }

}