var express = require("express");
var cors = require('cors')
var app = express.Router();
var usersRouter = require("./users");
var urlShortRouter = require("./urlshort");

app.use("/users", usersRouter);
app.use("/urlShort", urlShortRouter);

module.exports = app;
