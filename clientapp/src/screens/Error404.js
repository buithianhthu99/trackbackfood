import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import Menu from '../components/menu.js';

const Error404=()=>{
    return(
      <div className="App">
            <Menu></Menu>
            <h5 className="text-bold" style={{margin:"2rem auto", textAlign:"center"}}>Sorry, this page isn't available.</h5>
            <h6 style={{textAlign:"center"}}>The link you followed may be broken, or the page may have been removed. <Link to="/" className='blue-link'>Go back to Homepage.</Link></h6>
        </div>
    );

};

export default Error404;