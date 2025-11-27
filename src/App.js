// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainFeed from './components/MainFeed';
import Login from './Login';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Stato di autenticazione

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Funzione per gestire il login
  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password') { // Condizioni di login (solo esempio)
      setIsAuthenticated(true);
    } else {
      alert('Username o password errati');
    }
  };

  return (
    <Router>
      <div className="app">
        {/* Mostra la Navbar solo se l'utente è autenticato */}
        {isAuthenticated && <Navbar />}

        <Routes>
          {/* Rotta per la pagina principale, accessibile solo se autenticato */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <div className="main-feed">
                  <div className="mainFeed-container">
                    <MainFeed posts={posts} addPost={addPost} />
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Rotta per la pagina di login */}
          <Route
            path="/Login"
            element={<Login onLogin={handleLogin} />} // Passa la funzione handleLogin come prop
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

