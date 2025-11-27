import React, { useState } from 'react';
import { FaUserFriends, FaClock, FaBookmark, FaUsers, FaStore, FaVideo, FaNewspaper, FaCalendarAlt, FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


// src/components/Navbar.js
function Navbar() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const toggleProfileMenu = () => {
        setShowProfileMenu(prevState => !prevState);
    };

    const handleLogout = () => {
        // Logique de déconnexion (par exemple, supprimer le token d'authentification)
        navigate('/login'); // Redirection vers la page de login
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="freesocial.png" alt="Logo" className="navbar-logo" />
                <input
                    type="text"
                    placeholder="Cerca su Freeweb social network"
                    className="navbar-search"
                />
            </div>

            <div className="navbar-center">
                <button className="navbar-icon">🏠</button>
                <button className="navbar-icon">💬</button>
                <button className="navbar-icon">🏪</button>
                <button className="navbar-icon">👥</button>
            </div>

            <div className="navbar-right">
                <button className="navbar-icon">🔔</button>
                <button className="navbar-icon">👤</button>
                <img
                    src="pepe.jpg"
                    alt="Profile"
                    className="navbar-profile"
                    onClick={toggleProfileMenu}
                />
                {showProfileMenu && (
                    <div className="dropdown-menu">
                        <div className="menu-item">Impostazioni e privacy</div>
                        <div className="menu-item">Assistenza e supporto</div>
                        <div className="menu-item">Visualizzazione e accessibilità</div>
                        <div className="menu-item">Fornisci feedback</div>
                        <div className="menu-item" onClick={handleLogout}>Esci</div>
                    </div>
                )}
            </div>
        </nav>
    );
}



// Fonction pour afficher les stories
function StoriesContainer() {
    return (
        <div className="stories-container">
            <div className="story-item">
                <img src="pepe.jpg" alt="Crea storia" />
                <p>Crea storia</p>
            </div>
            <div className="story-item">
                <img src="donnaocchiali.jpg" alt="jessica fischier" />
                <p>jessica fischier </p>
            </div>
            <div className="story-item">
                <img src="bambino.jpg" alt="Jenny Bongioanni" />
                <p>Jenny Bongioanni</p>
            </div>
            <div className="story-item">
                <img src="uomo.jpg" alt="Federico Riccardi" />
                <p>Federico Riccardi</p>
            </div>
        </div>
    );
}

function LeftSidebar() {
    return (
        <div className="down-sidebar">
            <div className="left-sidebar">
                <div className="sidebar-item">
                    <img src="pepe.jpg" alt="Profile" className="sidebar-icon" />
                    Pepe Musafiri
                </div>
                <div className="sidebar-item">
                    <FaUserFriends className="sidebar-icon" />
                    Amici
                </div>
                <div className="sidebar-item">
                    <FaClock className="sidebar-icon" />
                    Ricordi
                </div>
                <div className="sidebar-item">
                    <FaBookmark className="sidebar-icon" />
                    Elementi salvati
                </div>
                <div className="sidebar-item">
                    <FaUsers className="sidebar-icon" />
                    Gruppi
                </div>
                <div className="sidebar-item">
                    <FaVideo className="sidebar-icon" />
                    Video
                </div>
                <div className="sidebar-item">
                    <FaStore className="sidebar-icon" />
                    Marketplace
                </div>
                <div className="sidebar-item">
                    <FaNewspaper className="sidebar-icon" />
                    Feed
                </div>
                <div className="sidebar-item">
                    <FaCalendarAlt className="sidebar-icon" />
                    Eventi
                </div>
                <div className="sidebar-item">
                    <FaEllipsisH className="sidebar-icon" />
                    Altro...
                </div>
            </div>
            <div className="sidebar-item">
                <FaCalendarAlt className="sidebar-icon" />
                hobby nel tempo libero
            </div>
        </div>



    );
}

function RightSidebar() {
    return (
        <div className="right-sidebar">
            <div className="sponsored-section">
                <div className="section-title">Sponsorisé</div>
                <div className="sponsored-item">
                    <div className="ad-title">Découvrez la Fédération SDI</div>
                    <div className="ad-link">bnpparibasfortis.be</div>
                </div>
                <div className="sponsored-item">
                    <div className="ad-title">Ontdek BA Auto</div>
                    <div className="ad-link">ag.be</div>
                </div>
            </div>
            <div className="pages-section">
                <div className="section-title">Le tue Pagine e i tuoi profili</div>
                <div className="page-item">
                    <div className="page-name">Zack Stock</div>
                    <div className="page-link">Passa alla Pagina</div>
                    <div className="page-link">Crea promozione</div>
                </div>
            </div>
            <div className="contacts-section">
                <div className="section-title">Contactti recenti </div>
                <div className="contact-item">Josias Ormaechea</div>
                <div className="contact-item">Leo Leao</div>
                <div className="contact-item">Barbara Boido</div>
                <div className="contact-item">Silvia Harsirmran Kaur</div>
                <div className="contact-item">Andrea Stroppiana</div>
                <div className="contact-item">Claudio</div>
                <div className="contact-item">Vanessa santaroce</div>
                <div className="contact-item">henry cavil</div>

            </div>
        </div>
    );
}

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <div className="layout">
                <LeftSidebar />
                <div className="main-content">
                    <StoriesContainer />
                </div>
                <RightSidebar />

            </div>
        </div>
    );
}

export default App;
