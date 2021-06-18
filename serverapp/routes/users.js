const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";

//get all users
router.get('/', function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  
    db = client.db("myblockchain");
    console.log(`Connected MongoDB: ${url}`);
    db.collection('user').find().toArray(function (err, result) {
      if (err) throw err
      res.json({
        status: 200,
        result,
        message: "User lists successfully"
      })
      console.log(result);
      client.close();
    })
  });
});

//Sign up
router.post('/', function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  
    db = client.db("myblockchain");
    console.log(`Connected MongoDB: ${url}`);
    db.collection('user').insertOne(req.body, function(err, result) {
      console.log(req.body);
      if (err) throw err;
          console.log("1 user inserted");
          res.json({
              status: 200,
              message: "Add user successfully"
            })
          client.close(); 
    })
  });
});

//Sign in
router.get('/:username/:password', function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  
    db = client.db("myblockchain");
    console.log(`Connected MongoDB: ${url}`);
    db.collection('user').find({"username": req.params.username, "password": req.params.password}).toArray(function (err, result) {
      if (err) throw err
      res.json({
        status: 200,
        result,
        message: "User lists successfully"
      })
      console.log(result);
      client.close();
    })
  });
});

module.exports = router;