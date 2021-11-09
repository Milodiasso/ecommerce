// import { isAuthenticated } from "utils/auth";
// import LoginPage from "containers/LoginPage";
import React, {useState, useEffect} from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Route, Redirect} from "react-router-dom";
const axios = require('axios');

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {

  const [admin, setAdmin] = useState(0)

  useEffect(() => {
    axios.post('http://127.0.0.1:8000/api/decode',{'token': localStorage.getItem('token')},{
      headers: {"Content-Type": "application/json"}
    })
    .then(res => {
      if (res.data.roles == `["ROLE_ADMIN"]`) {
      setAdmin(1)
      console.log(res);
    } else {
      setAdmin(0)
      console.log("erreeeuuur");
      console.log(res.data.roles);
    }
        })
    .catch(function (error) {
      console.log(error);
    })
  }, [admin])

  return (
    <>
    {admin === 1 ? <Component /> :
      <>
      <h1 style={{padding: "2em", color: "#cf1e1ead"}}>ACCÈS REFUSÉ</h1>
      <a href="/">Retour à l'acceuil</a>
    </>}
  </>
  )
}

export default PrivateRoute;
