const express = require('express');
const router = express.Router();

const Web3 = require('web3');
const myblockchainAbi = require('../myblockchainAbi.js').myblockchainAbi;
const contract_address = require("../config.js").contract_address;

const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(currentProvider);
const contractAddress = contract_address; //Contract Address
const myblockchainContract = new web3.eth.Contract(myblockchainAbi, contractAddress);

//Add new harvest
router.post('/', async function(req, res, next) {
    try {
        const gas = await myblockchainContract.methods.addHarvest(req.body.name, req.body.owner, req.body.startTime, req.body.endTime).estimateGas();
        const result = await myblockchainContract.methods
        .addHarvest(req.body.name, req.body.owner, req.body.startTime, req.body.endTime)
        .send({ from: req.body.owner, gas });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

//Get harvest info
router.get('/:harvestId', async function(req, res, next) {
    try {
        const result = await myblockchainContract.methods.getHarvest(req.params.harvestId).call();
        const return_result = {name: result["0"], productsAmount: result["1"], owner: result["2"], startTime: result["3"], endTime: result["4"]}
        res.json({
            status: 200,
            result: return_result,
            message: "Get harvest successfully"
          })
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;