const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');


module.exports = (app) => {

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Transforms raw string of req.body into JSON
    app.use(bodyParser.json());

    // Parses urlencoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Create a session
    app.use(session({
        secret: "SESSION_SECRET",
        resave: false,
        saveUninitialized: false
    }));

    return app;
  
}