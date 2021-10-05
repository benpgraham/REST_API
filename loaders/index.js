const routeLoader = require('../routes');
const expressLoader = require('./express');
const passportLoader = require('./passport');
const swaggerLoader = require('./swagger');

module.exports  = async (app) => {

    // Initialise the server
    const expressApp = await expressLoader(app);
    // Load passport 
    const passport = await passportLoader(expressApp);
    // Intialise the routers
    await routeLoader(app, passport);
    // Load swagger
    await swaggerLoader(app);

    // Error handler
    app.use((err, req, res, next) => {
        const { message, status } = err;
        return res.status(status || 500).send({ message });
    });
    
};