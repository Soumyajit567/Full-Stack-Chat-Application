import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    try {
      const response = await fetch('http://localhost:8085/register/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username, "password" : password})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        navigate('/');
      } else {
        alert('Sign up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles['signup-container']}>
      <h2>Create your account</h2>
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
        <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" required/>
        <button type="submit" className={styles['submit-button']}>Sign Up</button>
      </form>
      <div className={styles['signin-link']}>
        <p>Already have an account?</p>
        <button onClick={() => navigate('/')} className={styles['signin-button']}>Sign In</button>
      </div>
    </div>
  );
};

export default SignUp;




























