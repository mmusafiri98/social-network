// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainFeed from './components/MainFeed';
import Login from './Login';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert('Username o password errati');
    }
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Navbar />}

        <Routes>
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

          {/* FIXATO: /login e NON /Login */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
