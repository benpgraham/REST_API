const routeLoader = require('../routes');
const expressLoader = require('./express');
const passportLoader = require('./passport');

module.exports  = async (app) => {

    // Initialise the server
    const expressApp = await expressLoader(app);
    // Load passport 
    const passport = await passportLoader(expressApp);
    // Intialise the routers
    await routeLoader(app, passport);
    
};