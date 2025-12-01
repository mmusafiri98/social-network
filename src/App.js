import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-3">
            
            {/* LOGO */}
            <div className="d-flex align-items-center">
                <img src="freesocial.png" alt="Logo" className="navbar-logo me-2" />
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <button 
                className="navbar-toggler" 
                type="button"
                onClick={toggleMobileMenu}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* DESKTOP + MOBILE MENU */}
            <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>

                {/* SEARCH BAR */}
                <div className="flex-grow-1 d-flex justify-content-center my-2 my-lg-0">
                    <input
                        type="text"
                        placeholder="Cerca su Freeweb social network"
                        className="form-control w-75"
                    />
                </div>

                {/* MENU CENTER (ICONE) */}
                <div className="navbar-nav mx-auto text-center d-none d-lg-flex">

                    <button className="navbar-icon btn">🏠</button>
                    <button className="navbar-icon btn">💬</button>
                    <button className="navbar-icon btn">🏪</button>
                    <button className="navbar-icon btn">👥</button>

                </div>

                {/* MOBILE MENU (ICONE) */}
                {mobileMenuOpen && (
                <div className="d-lg-none text-center mb-3">

                    <button className="navbar-icon btn mx-2">🏠</button>
                    <button className="navbar-icon btn mx-2">💬</button>
                    <button className="navbar-icon btn mx-2">🏪</button>
                    <button className="navbar-icon btn mx-2">👥</button>

                </div>
                )}

                {/* RIGHT SIDE */}
                <div className="d-flex align-items-center ms-auto">

                    <button className="navbar-icon btn d-none d-lg-inline">🔔</button>
                    <button className="navbar-icon btn d-none d-lg-inline">👤</button>

                    <img
                        src="pepe.jpg"
                        alt="Profile"
                        className="navbar-profile ms-2"
                        onClick={toggleProfileMenu}
                        style={{ cursor: "pointer", width: "40px", height: "40px", borderRadius: "50%" }}
                    />

                    {/* PROFILO DROPDOWN */}
                    {showProfileMenu && (
                        <div 
                            className="dropdown-menu show p-2"
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "60px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}
                        >
                            <div className="dropdown-item">Impostazioni e privacy</div>
                            <div className="dropdown-item">Assistenza e supporto</div>
                            <div className="dropdown-item">Visualizzazione e accessibilità</div>
                            <div className="dropdown-item">Fornisci feedback</div>
                            <div 
                                className="dropdown-item text-danger" 
                                onClick={handleLogout}
                                style={{ cursor: "pointer" }}
                            >
                                Esci
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
