import React, { useState, useEffect } from 'react';
import '../scss/LogIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkUser } from '../apis/backendApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const succesNotify = (text) => toast.success(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    const errorNotify = (text) => toast.error(text, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    const loginUser = async () => {
        // controllo se gli input non sono vuoti
        if (email !== '' && password !== '') {
            try {
                const res = await checkUser(email, password)
                succesNotify(res.message)
            } catch (error) {
                errorNotify(error.response.data.message)
            } finally {
                navigate('/profile')
            }

        } else {
            errorNotify('Uno o più campi sono vuoti')
        }
    }

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <h3>LOGIN</h3>
                <input 
                    placeholder='Email' 
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder='Password' 
                    type='password' 
                    className='login-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Hai dimenticato la password?</label>
                <Link to="/signin">
                    <label>Non ho ancora un account</label>
                </Link>
                <button className='login-btn' onClick={loginUser}>Login</button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LogIn;