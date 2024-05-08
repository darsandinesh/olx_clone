import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Spinner from '../Spinner/Spinner';

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate('/');
        // ...
      })
      .catch((error) => {
        setSpinner(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('login error', errorCode);
        console.log('login error ', errorMessage);
        const message = errorMessage.split("(auth/")[1].split(")")[0];
        setError(message);


      });
  }

  const gotoSignup = () => {
    navigate('/Signup')
  }

  return (
    <div>
      {
        spinner ? <Spinner /> :
          <div className='loginParentDiv'>
            <img width="200px" height="200px" src="../../../Images/olx-logo.png" alt="olx image" />
            <form onSubmit={handleSubmit}>
              <label htmlFor="">Email Address</label>
              <br />
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='input' type="text" />
              <br />
              <label htmlFor="">Password</label>
              <br />
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='input' type="password" />
              <br />
              <span style={{ color: "red", marginBottom: "3%" }}>
                {
                  error ? error : ""
                }
                <br />
              </span>
              <button className='submit'>Submit</button>
              <br />
              <a className='atag' onClick={gotoSignup}>New User ?,Create Account</a>
              <br />

            </form>

          </div>
      }
    </div>

  )
}

export default Login
