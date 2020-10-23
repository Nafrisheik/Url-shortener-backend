var express = require("express");
var cors = require("cors");
const { MongoClient, url, dbname, ObjectId } = require("../config");
var router = express.Router();

router.get("/:x", async (req, res) => {
  let client;
  try {
    client = await MongoClient.connect(url);
    let db = client.db(dbname);
    // const query = req.query || {};
    // console.log(req);
    const result = await db
      .collection("url")
      .findOne({ shortUrl: `http://localhost:3000/${req.params.x}` });
    client.close();

    res.redirect(result.longUrl);
  } catch (error) {
    if (client) client.close();
    console.log(error);
  }
});

module.exports = router;
