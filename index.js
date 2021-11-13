const express = require('express');
const loaders = require('./loaders');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;


// Initialise the app
loaders(app);

// Server Start
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});




