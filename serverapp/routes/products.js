const express = require('express');
const router = express.Router();

const Web3 = require('web3');
const myblockchainAbi = require('../myblockchainAbi.js').myblockchainAbi;
const contract_address = require("../config.js").contract_address;

const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(currentProvider);
const contractAddress = contract_address; //Contract Address
const myblockchainContract = new web3.eth.Contract(myblockchainAbi, contractAddress);

//Add new product
router.post('/', async function(req, res, next) {
    try {
        const gas = await myblockchainContract.methods.addProduct(req.body.harvestId, req.body.name).estimateGas();
        const result = await myblockchainContract.methods
        .addProduct(req.body.harvestId, req.body.name)
        .send({ from: req.body.owner, gas });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

//Update product info
router.post('/update', async function(req, res, next) {
    try {
        const gas = await myblockchainContract.methods.updateProduct(req.body.harvestId, req.body.productId, req.body.name, req.body.amount, req.body.state).estimateGas();
        const result = await myblockchainContract.methods
        .updateProduct(req.body.harvestId, req.body.productId, req.body.name, req.body.amount, req.body.state)
        .send({ from: req.body.owner, gas });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
});

//Get product
router.get('/:harvestId/:productId', async function(req, res, next) {
    try {
        const result = await myblockchainContract.methods.getProduct(req.params.harvestId, req.params.productId).call();
        console.log(result);
        const return_result = {name: result["0"], processesAmount: result["1"], amount: result["2"], state: result["3"]}
        res.json({
            status: 200,
            result: return_result,
            message: "Get product successfully"
          })
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;