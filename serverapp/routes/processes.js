const express = require('express');
const router = express.Router();

const Web3 = require('web3');
const myblockchainAbi = require('../myblockchainAbi.js').myblockchainAbi;
const contract_address = require("../config.js").contract_address;

const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(currentProvider);
const contractAddress = contract_address; //Contract Address
const myblockchainContract = new web3.eth.Contract(myblockchainAbi, contractAddress);

//Add new process
router.post('/', async function(req, res, next) {
    try {
        const gas = await myblockchainContract.methods.addProcess(req.body.harvestId, req.body.productId, req.body.name, req.body.ingredients, req.body.startTime, req.body.endTime).estimateGas();
        const result = await myblockchainContract.methods
        .addProcess(req.body.harvestId, req.body.productId, req.body.name, req.body.ingredients, req.body.startTime, req.body.endTime)
        .send({ from: req.body.owner, gas });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

//Get process
router.get('/detail/:harvestId/:productId/:processId', async function(req, res, next) {
    try {
        const result = await myblockchainContract.methods.getProcess(req.params.harvestId, req.params.productId, req.params.processId).call();
        console.log(result);
        const return_result = {name: result["0"], ingredients: result["1"], startTime: result["2"], endTime: result["3"]}
        res.json({
            status: 200,
            result: return_result,
            message: "Get process successfully"
          })
    } catch (error) {
        console.log(error);
    }
});

//Get list processes by harvest id and product id
router.get('/list/:harvestId/:productId', async function(req, res, next) {
    try {        
        const productInfo = await myblockchainContract.methods.getProduct(req.params.harvestId, req.params.productId).call();
        const amount = productInfo["1"];

        let final_result = [];
        for (let i=0; i<amount; i++) {
            const result = await myblockchainContract.methods.getProcess(req.params.harvestId, req.params.productId, i).call();
            const return_result = {name: result["0"], ingredients: result["1"], startTime: result["2"], endTime: result["3"]}
            final_result.push(return_result);   
        }
        res.json({
            status: 200,
            result: final_result,
            message: "Get list processes by harvest id and product id successfully"
        })
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;