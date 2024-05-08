import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import Spinner from '../Spinner/Spinner';

const Signup = () => {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [spinner, setSpinner] = useState(false);
    // const { firebase } = useContext(FirebaseContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinner(true);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                // Signed up 
                const user = userCredential.user;
                console.log(user, './././././././././')
                const db = getFirestore();
                addDoc(collection(db, 'users'), {
                    id: user.uid,
                    userName: username,
                    phoneNo: phone
                }).then(() => {
                    console.log('login page')
                    navigate('/login');
                })
                // ...
            })
            .catch((error) => {
                setSpinner(false);
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage, './.././././')
                const message = errorMessage.split("(auth/")[1].split(")")[0];
                setError(message);

                // ..
            });
    }

    const gotLogin = () => {
        navigate('/login');
    }

    return (
        <div>

            {
                spinner ? <Spinner />
                    :
                    <div className='singupParentDiv'>

                        <img width="200px" height="200px" src="../../../Images/olx-logo.png" alt="image" />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">UserName</label>
                            <br />
                            <input onChange={(e) => setUserName(e.target.value)} className='input' type="text" name="" id="" value={username} />
                            <br />
                            <label htmlFor="">Email Address</label>
                            <br />
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='input' type="text" name="" id="" />
                            <br />
                            <label htmlFor="">Phone Number</label>
                            <br />
                            <input onChange={(e) => setPhone(e.target.value)} value={phone} className='input' type="number" name="" id="" />
                            <br />
                            <label htmlFor="">Password</label>
                            <br />
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='input' type="password" name="" id="" />
                            <br />
                            <span style={{ marginBottom: "3%", color: "red" }}>
                                {
                                    error ? error : ""
                                }
                            </span>

                            <br />
                            <button className='submit' type='submit'>Submit</button>
                        </form>
                        <div className='login'>
                            <a onClick={gotLogin}>Login</a>
                        </div>
                    </div>
            }

        </div>

    )
}

export default Signup
