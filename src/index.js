import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import "./styles/Load.css"

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");

  return(
  	<>
      <Login isLogin={isLogin} setIsLogin={setIsLogin} setToken={setToken}/>
      <Dashboard isLogin={isLogin} setIsLogin={setIsLogin} token={token}/> 
    </>
  )
}
