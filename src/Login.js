// src/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Login locale (solo frontend)
        if (onLogin) {
            onLogin(username, password);
        }

        navigate('/');
    };

    const handleRegister = () => {
        alert("Funzione non disponibile. Registrazione disattivata.");
    };

    return (
        <div className="login-page">
            <div className="login-up">
                <h1>Login</h1>
                <p style={{ fontSize: "14px", opacity: 0.7 }}>
                    👉 Username: <b>admin</b> — Password: <b>password</b>
                </p>
            </div>

            <div className="login-center">
                <form className="login-form" onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="E-mail o username"
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

                    <button type="submit" className="login-button">
                        Accedi
                    </button>

                    <Link to="/forgot-password" className="forgot-password">
                        Password dimenticata?
                    </Link>

                    <button
                        type="button"
                        className="create-account"
                        onClick={handleRegister}
                    >
                        Crea nuovo account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
