const express = require('express');
const loaders = require('./loaders');
const app = express();

const PORT = 3000;

// Initialise the app
loaders(app);

// Server Start
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});




