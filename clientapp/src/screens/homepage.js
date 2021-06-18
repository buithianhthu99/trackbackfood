import React, { useState } from "react";
import Menu from '../components/menu.js'
import Web3 from 'web3';
import {myblockchainAbi} from '../myblockchainAbi'
import { contract_address } from "../config.js";

export default function Homepage() {
  const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
  const web3 = new Web3(currentProvider)

  const contractAddress = contract_address;
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