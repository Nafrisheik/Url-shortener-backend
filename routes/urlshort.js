var express = require("express");
var cors = require('cors')
const { MongoClient, url, dbname, ObjectId } = require("../config");
var router = express.Router();
var {authenticate} = require("./common/authenticate")

//function to generate shorturl random
async function CreateShortUrl() {
  var allCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var randString = "";
  for (let i = 0; i < 6; i++) {
    randString += allCharacters.charAt(
      Math.floor(Math.random() * allCharacters.length)
    );
  }
  let shortUrl = "http://localhost:3000/" + randString;

  let client;
  client = await MongoClient.connect(url);
  let db = client.db(dbname);

  const data = await db.collection("url").findOne({ shortUrl });

  client.close();

  if (data) CreateShortUrl();
  else return shortUrl;
}
//api to get complete url data
router.get("/", async function (req, res) {
  let client;
  try {
    client = await MongoClient.connect(url);
    let db = client.db(dbname);
    // const query = req.query || {};
    const result = await db.collection("url").find().toArray();
    client.close();

    res.send(result);
  } catch (error) {
    if (client) client.close();
    console.log(error);
  }
});
//api to redirect to original url
router.get("/:urlId", async function (req, res) {
  let client;
  try {
    client = await MongoClient.connect(url);
    let db = client.db(dbname);
    const result = await db
      .collection("url")
      .findOne({ _id:ObjectId(req.params.urlId)  });

    console.log(result, req.params.urlId);

    client.close();

    res.redirect(result.longUrl);
  } catch (error) {
    if (client) client.close();
    console.log(error);
  }
});
//Adding long url to the db and generating shorturl
router.post("/createUrl",authenticate, async function (req, res, next) {
  let client;
  try {
    client = await MongoClient.connect(url);
    let db = client.db(dbname);
    const shortUrl = await CreateShortUrl();
    let NewUrl = { longUrl: req.body.longUrl, shortUrl };
    console.log(CreateShortUrl());
    const result = await db.collection("url").insertOne(NewUrl);

    client.close();
    res.json({
      message: "URL added",
      result,
    });
  } catch (error) {
    if (client) client.close();
    console.log(error);
  }
});

module.exports = router;
