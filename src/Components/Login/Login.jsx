// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import '../Login/Login.css'
import Uploadpage from '../Uploadpage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false); // State to track successful login

  const handleLogin = () => {
    if (username.length === 0) {
      alert("Username not filled");
    } else if (password.length === 0) {
      alert("Password not filled");
    } else {
      const url = 'http://localhost:3000/login'; // Update with your Node.js backend URL
      const userData = {
        username: username,
        password: password
      };

      axios.post(url, userData)
        .then(response => {
          if (response.data.success) {
            // If login is successful, set state to true to trigger redirection
            setSuccess(true);
          } else {
            alert(response.data.message); // Display error message returned from backend
          }
        })
        .catch(error => alert(error));
    }
  };

  const handleRegister = () => {
    // Implement your register logic here
    console.log('Register new user');
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Forgot password');
  };

  // If success state is true, render the Success component
  if (success) {
    return <Uploadpage/>;
  }
  
  return (
    <div className='App1'>
      <div className="container">
        <img src="logo.jpg" alt="Logo" width="300px" heigth="300px" />
        <h2>Login</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className="options">
          <button type="button" className="register-btn" onClick={handleRegister}>
            Register New User
          </button>
          <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
