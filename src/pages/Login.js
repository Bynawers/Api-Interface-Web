import React, { useState } from 'react';
import axios from "axios"

import '../styles/Login.css';

function Login(props) {

  const BASE_URL = "http://192.168.1.83:8000"
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeUsername(event) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  function handleLogin() {
    axios.post(BASE_URL+"/api/auth/login", {
      email: username,
      password: password,
    })
    .then(async function (response) {
      let token = response.data.token
      props.setIsLogin(true);
      props.setToken(token)
    })
    .catch(function (error) {
      alert(error)
    });
  }

  return (
    <div className="loginAppContainer" style={{ display: props.isLogin ? "none" : "flex"}}>
      <h1>API Grappe</h1>
      <div className="loginContainer">
        <div className="connexion">
          <p className="h2">Se connecter</p>

          <input
            className="field"
            type="text"
            value={username}
            onChange={handleChangeUsername}
            placeholder="username" 
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleLogin()
              }
            }}
          />
          <input
            className="field"
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="password" 
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleLogin()
              }
            }}
          />
          <button className="button" onClick={() => handleLogin()}>Connexion</button>
        </div>
        
      </div>
    </div>
  );
}

export default Login;