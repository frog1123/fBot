const express = require("express")
const app = express()

const path = require('path');
const chalk = require('chalk');

const config = require('./config.json');

const color = chalk.bold.hex(config.color);
const PORT = process.env.PORT || 9000

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'))
});

app.listen(PORT, () => console.log(`Server online on port ${color(PORT)}`));