// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
        navigate('/');
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/register', { username, password });
            alert(response.data.message);
        } catch (error) {
            alert("Erreur lors de l'enregistrement : " + error.response.data.message);
        }
    };

    return (
        <div className="login-page">
            {/* Titre déplacé ici, en dehors de "login-center" */}
            <div className="login-up">
                <h1>Login</h1>
            </div>

            <div className="login-center">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="E-mail ou numéro de téléphone"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">Accedi</button>
                    <a href="#" className="forgot-password">Password dimenticata?</a>
                    <button type="button" className="create-account" onClick={handleRegister}>
                        Crea nuovo account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
