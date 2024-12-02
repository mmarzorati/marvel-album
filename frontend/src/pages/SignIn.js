import React, { useState, useEffect } from 'react';
import '../scss/LogIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../apis/backendApi';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const checkFields = () => {
        // Controllo che sia diverso password e confrimPassword 
        if (password !== confirmPassword) {
        // errore password non corrispondono
        return false;
        }
        // Controllo che abbia la struttura di una mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        // errore email non valida
        return false;
        }
        return true;
    }
    const EnrollUser = async () => {
        console.log('in')
        if (email !== '' && name !== '' && username !== '' && password !== '' && confirmPassword !== '') {
        if (checkFields()){
            try {
                const res = await createUser(name, username, email, password);
                
            } catch (error) {
                
            } finally {
                navigate('/profile')
            }

        }
        } else {
            // errore devono rispettare tutti i requisiti
        }
    }

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
                <h3>SIGNIN</h3>
                <input 
                    placeholder=' Email' 
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    placeholder=' Name' 
                    type='text' 
                    className='login-password'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input 
                    placeholder=' Username' 
                    type='text' 
                    className='login-password'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    placeholder=' Password' 
                    type='password' className='login-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    placeholder=' Confirm Password' 
                    type='password' 
                    className='login-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Link to="#">
                    <label>Hai dimenticato la password?</label>
                </Link>
                <Link to="/login">
                    <label>Log In page</label>
                </Link>
                <button className='login-btn' onClick={EnrollUser} >Signin</button>
            </div>
        </div>
    );
};

export default SignIn;