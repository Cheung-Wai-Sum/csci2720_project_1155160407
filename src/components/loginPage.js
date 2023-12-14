import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log(data)
      if (data.success) {
        // Login successful, perform success actions (e.g., redirect)
        window.alert('Login successful')
        console.log('Login successful');
        // path to homepage
        window.location.href = 'http://localhost:3001/';
        
      } else {
        // Login failed, display error message to the user
        console.error('Login failed:', data.message);
        window.alert('Login failed: ' + data.message);
      }
    } catch (error) {
      // Network error or other unexpected issues
      console.error('Network error during login:', error);
      window.alert('Network error during login:', error.response.data.message);
      // Display a generic error message to the user
    }
  };
  
  

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
