import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-blue shadow-sm py-1 fb-navbar">
            <div className="container-fluid d-flex align-items-center">

                {/* FACEBOOK STYLE LOGO */}
                <div className="facebook-logo me-3">
                    VN
                </div>

                {/* SEARCH BAR DESKTOP */}
                <div className="d-none d-lg-block me-4">
                    <div className="fb-search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="fb-search-input"
                            placeholder="Cerca su Vibenet"
                        />
                    </div>
                </div>

                {/* CENTER ICONS LIKE FACEBOOK */}
                <ul className="navbar-nav mx-auto d-none d-lg-flex fb-center-icons">
                    <li className="nav-item"><button className="fb-icon-btn">🏠</button></li>
                    <li className="nav-item"><button className="fb-icon-btn">🎥</button></li>
                    <li className="nav-item"><button className="fb-icon-btn">🛒</button></li>
                    <li className="nav-item"><button className="fb-icon-btn">👥</button></li>
                </ul>

                {/* RIGHT ICONS */}
                <div className="d-flex align-items-center gap-2">

                    <button className="fb-round-btn">🔍</button>
                    <button className="fb-round-btn">💬</button>
                    <button className="fb-round-btn">🔔</button>

                    {/* PROFILE PIC + MENU */}
                    <div className="position-relative">
                        <img
                            src="pepe.jpg"
                            alt="Profile"
                            className="fb-profile-pic"
                            onClick={toggleProfileMenu}
                        />

                        {showProfileMenu && (
                            <div className="fb-dropdown-menu">
                                <div className="dropdown-item">Impostazioni e privacy</div>
                                <div className="dropdown-item">Assistenza e supporto</div>
                                <div className="dropdown-item">Visualizzazione e accessibilità</div>
                                <div className="dropdown-item">Fornisci feedback</div>
                                <div
                                    className="dropdown-item text-danger"
                                    onClick={handleLogout}
                                >
                                    Esci
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
