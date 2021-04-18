var express = require("express");
var cors = require('cors')
var app = express.Router();
var usersRouter = require("./users");
var urlShortRouter = require("./urlshort");
var urlRouter = require("./url");

app.use("/users", usersRouter);
app.use("/urlShort", urlShortRouter);
app.use("/url", urlRouter);

module.exports = app;
