const express = require("express");
const app = express();

const path = require('path');
const chalk = require('chalk');

require('dotenv').config();

const PORT = process.env.PORT ?? 9000;

app.use(express.static(path.join(__dirname, 'web')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.listen(PORT, () => console.log(`Server online on port ${PORT}`));