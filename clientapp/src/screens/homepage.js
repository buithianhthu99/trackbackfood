import React, { useState } from "react";
import Menu from "../components/menu.js";
import "./homepage.css";
import { Button } from "@material-ui/core";

export default function Homepage() {
  const account = localStorage.getItem("account");

  //Add new harvest
  const data = {
    name: "test_harvest",
    owner: localStorage.getItem("account"),
    startTime: "10/06/2021",
    endTime: "20/06/2021",
  };
  const handleSubmit = () => {
    console.log("Post method");
    fetch("http://localhost:3000/harvests/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  // //Add new product
  // const data = {harvestId: 0, owner: localStorage.getItem("account"), name: "Rice"}
  // const handleSubmit = () => {
  //   console.log('Post method');
  //   fetch("http://localhost:3000/products/", {
  //       method: 'post',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //   })

  // //Update product info
  // const data = {harvestId: 0, productId: 0, name: "Name update", amount: 10, state: "harvested", owner: localStorage.getItem("account")}
  // const handleSubmit = () => {
  //   console.log('Post method');
  //   fetch("http://localhost:3000/products/update/", {
  //       method: 'post',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //   })

  //Add process
  // const data = {harvestId: 0, productId: 0, name: "Test process", ingredients: "Saturated Fat 5g, Dietary Fiber 2g", startTime: "10/06/2021", endTime: "10/06/2021", owner: localStorage.getItem("account")}
  // const handleSubmit = () => {
  //   console.log('Post method');
  //   fetch("http://localhost:3000/processes/", {
  //       method: 'post',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data)
  //   })
  // }

  return (
    <div className="App">
      <Menu></Menu>
      <div className="public-address">Public address: {account}</div>
      <Button onClick={handleSubmit}>Click</Button>
    </div>
  );
}
