var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes");
var urlRouter = require("./routes/url");
const { route } = require("./routes");
const { MongoClient, url, dbname, ObjectId } = require("./config");

var app = express();
var router = express.Router();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/", urlRouter);

module.exports = app;
