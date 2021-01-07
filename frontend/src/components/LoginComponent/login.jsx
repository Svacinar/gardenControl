import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import './login.css'

const login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/authenticate`, {
            email: email,
            password: password
        })
        props.history.push('/');
    }

    return (
        <div className="login">
            <div className="intro">
                <h2>Provide valid credentials</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="loginForm">
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Your Email" name="email" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Your Password" name="password" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className="button">Login</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default login