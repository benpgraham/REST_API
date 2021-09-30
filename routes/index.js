const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./product');
const userRouter = require('./user');
const authRouter = require('./auth');

module.exports = (app, passport) => {
  cartRouter(app);
  orderRouter(app);
  productRouter(app);
  userRouter(app);
  authRouter(app, passport);
};