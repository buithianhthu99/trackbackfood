const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";

const Web3 = require('web3');
const myblockchainAbi = require('../myblockchainAbi.js').myblockchainAbi;
const contract_address = require("../config.js").contract_address;

const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(currentProvider);
const contractAddress = contract_address; //Contract Address
const myblockchainContract = new web3.eth.Contract(myblockchainAbi, contractAddress);

//Sign up
router.post('/signup/', function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
  
    db = client.db("myblockchain");
    const data = req.body;
    console.log(`Connected MongoDB: ${url}`);
    db.collection('user').find().toArray(async function (err, result) {
      if (err) throw err
      try {
        const length = result.length;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[length];
        const new_data = {"name": data["name"], "username": data["username"], "password": data["password"], "address": account};
        db.collection('user').insertOne(new_data, function(err, result) {
          console.log(JSON.stringify(new_data));
          if (err) throw err;
          console.log(`1 user inserted: ${result}`);
          res.json({
              status: 200,
              message: "Add user successfully"
            })
          client.close(); 
        })
      } catch (error) {
        console.log(error);
      }
    })
  });
});

//Sign in
router.post('/signin/', function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
  
    db = client.db("myblockchain");
    console.log(`Connected MongoDB: ${url}`);
    db.collection('user').find({"username": req.body["username"], "password": req.body["password"]}).toArray(function (err, result) {
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