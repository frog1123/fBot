const express = require("express")
const app = express()

const path = require('path');
const chalk = require('chalk');

const config = require('./config.json');

const color = chalk.bold.hex(config.color);

app.use(express.static(path.join(__dirname)));

app.get("/", function (req, res) {
    res.send("Bot online")
});

app.listen(process.env.PORT || 9000, () => console.log("Server online"));