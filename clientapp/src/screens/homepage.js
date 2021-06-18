import React, { useState } from "react";
import Menu from '../components/menu.js'
import Web3 from 'web3';
import {myblockchainAbi} from '../myblockchainAbi'

export default function Homepage() {
  const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
  const web3 = new Web3(currentProvider)

  const contractAddress = "0xcE6661e6daD461b27d334E73873aca3e0519ec7A"; //Contract Address
  const myblockchainContract = new web3.eth.Contract(myblockchainAbi, contractAddress);

  const account = localStorage.getItem("account");
  const [greeting, setGreeting] = useState(localStorage.getItem("account"));
  
  const setData = async e => {
    e.preventDefault();    
    const gas = await myblockchainContract.methods.setGreeting(greeting).estimateGas();
    const result = await myblockchainContract.methods
      .setGreeting(greeting)
      .send({ from: account, gas });
    console.log(result);
  };

  const getData = async e => {
    e.preventDefault();
    const result = await myblockchainContract.methods.getGreeting().call();
    setGreeting(result);
    console.log(result);
  };

  return (
    <div className="App">
        <Menu></Menu>
        <header className="App-header">
            <form onSubmit={setData}>
                <label>
                    Set Data:
                    <input
                    type="text"
                    name="greeting"
                    value={greeting}
                    onChange={e => setGreeting(e.target.value)}
                    />
                </label>
          <input type="submit" value="Set Data" />
        </form>
        <br />
        <button onClick={getData} type="button">
            Get Data
        </button>
      </header>
    </div>
  );
}