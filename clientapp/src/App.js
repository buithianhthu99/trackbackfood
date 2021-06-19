import React, {useEffect} from 'react'
import { Redirect } from 'react-router';
import {useHistory} from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './screens/signup.js'
import Login from './screens/login.js'
import Error404 from './screens/Error404.js'
import Homepage from './screens/homepage.js'
// import Web3 from 'web3';
// import {myblockchainAbi} from './myblockchainAbi'

const Routing = () => {
  const history = useHistory();
  useEffect(()=>{
    const user = localStorage.getItem("account")
    if(user){
      // dispatch({type:"USER", payload:user})
    }else{
      history.push('/login')
    }
  },[])

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/homepage">
        <Homepage />
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route path="*">
        <Error404 />
      </Route>
    </Switch>
  );
};

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
      <Routing/>
    </BrowserRouter>
  )
}