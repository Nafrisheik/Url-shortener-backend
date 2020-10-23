const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const url = "mongodb://localhost:27017";
const dbname = "UrlShort";
module.exports = { MongoClient, url, dbname, ObjectId };
