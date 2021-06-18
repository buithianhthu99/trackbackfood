var myblockchain = artifacts.require("./myblockchain.sol");

module.exports = function(deployer) {
  deployer.deploy(myblockchain);
};