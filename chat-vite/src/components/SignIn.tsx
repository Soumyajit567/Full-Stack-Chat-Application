import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import styles from "./SignIn.module.css";
import { UserContext } from './UserContext';

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsername: setGlobalUsername } = useContext(UserContext); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handleSubmit is being called');

    try {
      const response = await fetch('http://localhost:8085/register/login', {
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

      if (data.status === "success") {  // Change this line
        setGlobalUsername(username);
        navigate('/chat');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.signIncontainer}>
      <h1 className={styles.signIntitle}>Chat Room</h1>
      <h2 className={styles.signIntitle}>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.signInform}>
        <label htmlFor="username" className={styles.signInlabel}>Username</label>
        <input type="text" id="username" onChange={e => setUsername(e.target.value)} className={styles.signIninput} />
        <label htmlFor="password" className={styles.signInlabel}>Password</label>
        <input type="password" id="password" onChange={e => setPassword(e.target.value)} className={styles.signIninput} autoComplete="current-password" />
        <button type="submit" className={styles.signInbutton}>Sign In</button>
        <div className={styles.signInfooter}>
          <span>Don't have an account?</span>
          <Link to="/signup" className={styles.signInlink}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;





