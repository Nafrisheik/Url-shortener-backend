var express = require('express');
var cors = require('cors');
var bcrypt = require('bcryptjs');
const { MongoClient,url, dbname } = require('../config');
const jwt = require("jsonwebtoken");
var router = express.Router();
const eventEmitter = require("events");

const myEmitter = new eventEmitter();
myEmitter.on("user-reg",function(){
  console.log("hello");
})

//api to register new user
router.post('/register',async function(req,res,next){
  let client;
  try{
    client= await MongoClient.connect(url);
    let db =client.db(dbname);
//generate salt
    let salt = await bcrypt.genSalt(10);
    let hash= await bcrypt.hash(req.body.password,salt)
    req.body.password=hash;

    let mailExist = await db.collection("users").findOne({"email":req.body.email});
    if(!mailExist){
    await db.collection("users").insertOne(req.body);
    
    myEmitter.emit("user-reg")

    client.close();
    res.json({
      message:"User Registered"
    });
  }else{
    res.json({
      message:"User already exists"
    });
  }
  }catch(error){
    if(client) client.close();
    console.log(error);
  }
});

//api to login for existing user
router.post('/login',async function(req,res){
  let client;
  try{
    client= await MongoClient.connect(url);
    let db =client.db(dbname);

let user = await db.collection("users").findOne({email:req.body.email});
if(user){
  let result = await bcrypt.compare(req.body.password,user.password);
  if(result){
    let token = jwt.sign({id:user._id},"kskskxxx");
    client.close();
    res.json({
      message:"success",
      token
    });
  }else{
    client.close();
    res.status(401).json({
      message:"Username and Password is wrong"
    })
  }
  
}else{
  res.status(404).json({
    message:"Username does not match"
  });
}
    client.close();
    res.json({
      message:"login success"
    });
  }catch(error){
    if(client) client.close();
    console.log(error);
  }
});
module.exports = router;
