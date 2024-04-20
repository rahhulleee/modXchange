import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import './Register.css';
import backgroundImage from '../images/calculator.png';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
      navigate('/login');
    } catch (error) {
      alert('Error during account creation: ' + error.message);
    }
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  
  return (
    <div style={sectionStyle}>
      <h1>Register</h1>
      <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          className="inputField"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="inputField"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button">Register</button>
        <button onClick={() => navigate('/login')} className="button">Login Now</button>
      </form>
    </div>
  );
}

export default Register;

