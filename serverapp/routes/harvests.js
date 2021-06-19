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
        res.json({
          status: 200,
          result: result,
          message: "Create success"
        })
    } catch (error) {
        res.json({
          status: 301,
          result: result,
          message: "Create fail"
        })
        console.log(error);
    }
});

//Get harvest info
router.get('/info/:harvestId', async function(req, res, next) {
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

//Get harvests amount
router.get('/harvestAmount', async function(req, res, next) {
    try {
        const result = await myblockchainContract.methods.getHarvestsAmount().call();
        console.log(result);
        res.json({
            status: 200,
            result: result,
            message: "Get harvest amount successfully"
          })
    } catch (error) {
        console.log(error);
    }
});

//Get harvests by owner
router.get('/owner/:ownerId', async function(req, res, next) {
    try {
        const result = await myblockchainContract.methods.getHarvestIDsByOwner(req.params.ownerId).call();
        console.log(result);
        res.json({
            status: 200,
            result: result,
            message: "Get harvest by owner successfully"
          })
    } catch (error) {
        console.log(error);
    }
});

//Get list harvests
router.get('/list', async function(req, res, next) {
    try {
        const amount = await myblockchainContract.methods.getHarvestsAmount().call();
        let final_result = [];
        for (let i=0; i<amount; i++) {
            const result = await myblockchainContract.methods.getHarvest(i).call();
            const return_result = {name: result["0"], productsAmount: result["1"], owner: result["2"], startTime: result["3"], endTime: result["4"]};
            final_result.push(return_result);   
        }
        res.json({
            status: 200,
            result: final_result,
            message: "Get list harvest successfully"
        })
    } catch (error) {
        console.log(error);
    }
});

//Get list harvests by ownerId
router.get('/listByOwner/:ownerId', async function(req, res, next) {
    try {
        const list_id = await myblockchainContract.methods.getHarvestIDsByOwner(req.params.ownerId).call();
        let final_result = [];
        for (let i=0; i<list_id.length; i++) {
            const result = await myblockchainContract.methods.getHarvest(list_id[i]).call();
            const return_result = {id: list_id[i], name: result["0"], productsAmount: result["1"], owner: result["2"], startTime: result["3"], endTime: result["4"]};
            final_result.push(return_result);   
        }
        res.json({
            status: 200,
            result: final_result,
            message: "Get list harvest by owner successfully"
        })
    } catch (error) {
        console.log(error);
    }
});module.exports = router;