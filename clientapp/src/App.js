import React from 'react'
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './screens/signup.js'
import Login from './screens/login.js'
import Homepage from './screens/homepage.js'
// import Web3 from 'web3';
// import {myblockchainAbi} from './myblockchainAbi'


export default function App() {
  // const currentProvider = new Web3.providers.HttpProvider('http://localhost:8545');
  // const web3 = new Web3(currentProvider)

  // const contractAddress = "0xcE6661e6daD461b27d334E73873aca3e0519ec7A"; //Contract Address
  // const myblockchainContract = new web3.eth.Contract(myblockchainAbi, contractAddress);

  // localStorage.setItem("web3", web3);
  // localStorage.setItem("myblockchainContract", myblockchainContract);
  console.log(localStorage.getItem("account"))

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path= "/signup">
          <SignUp/>
        </Route>
        <Route exact path= "/login">
          <Login/>
        </Route>
        <Route exact path= "/homepage">
          <Homepage/>
        </Route>
        <Route path= "/">
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}