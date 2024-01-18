// src/setup/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert('Error during account creation: ' + error.message);
    }
  };

  return (
    <div className="Register" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div><br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div><br />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')} style={{ display: 'block', marginTop: '20px' }}>
        Login Now
      </button>
    </div>
  );
}

export default Register;
