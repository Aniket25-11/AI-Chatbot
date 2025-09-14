const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send("Hello World - Backend Started");
});



module.exports = app;