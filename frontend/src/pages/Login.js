import React, { useState, useEffect } from 'react';
import '../scss/LogIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import { checkUser } from '../apis/backendApi';
import { useSnackbar } from './../components/AlertContext';

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { showSnackbar } = useSnackbar();

    const loginUser = async () => {
        // controllo se gli input non sono vuoti
        if (email !== '' && password !== '') {
            try {
                const res = await checkUser(email, password)
                showSnackbar(res.message, 'success');
                navigate('/profile')
            } catch (error) {
                showSnackbar(error.response.data.message, 'error');
            }

        } else {
            showSnackbar('Error: empty fields', 'error');
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
        </div>
    );
};

export default LogIn;