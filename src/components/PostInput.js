import React, { useState, useEffect, useRef } from "react";

const PostInput = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const storyRef = useRef(null);

    // Charger les posts du localStorage 
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts"));
        if (Array.isArray(savedPosts))
            setPosts(savedPosts);
    }, []);

    // Auto-scroll des stories 
    useEffect(() => {
        const scrollContainer = storyRef.current;
        if (!scrollContainer)
            return;

        const interval = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
                scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                scrollContainer.scrollBy({ left: scrollContainer.offsetWidth, behavior: "smooth" });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleShare = () => {
        if (!postText.trim() && !selectedImage)
            return;

        const newPost = {
            text: postText,
            likes: 0,
            comments: [],
            image: selectedImage,
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
        setPostText("");
        setSelectedImage(null);
    };

    return (
        <div className="page-layout">
            {/* Burger menu */}
            <button className="burger-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>✕</button>
                <h3>Menu</h3>
                <ul>
                    <li>🌐 Imagine AI</li>
                    <li>👥 Amici</li>
                    <li>🕑 Ricordi</li>
                    <li>🔖 Salvati</li>
                    <li>👨‍👩‍👧‍👦 Gruppi</li>
                    <li>🎬 Reel</li>
                    <li>🛒 Marketplace</li>
                    <li>📰 Feed</li>
                </ul>
            </aside>

            {/* Main */}
            <main className="main-content">
                {/* Stories */}
                <div className="stories-wrapper">
                    <div className="stories-container" ref={storyRef}>
                        <div className="story-card"><img src="bambino.jpg" alt="" /></div>
                        <div className="story-card"><img src="pepe.jpg" alt="" /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="" /></div>
                        {/* Doublons */}
                        <div className="story-card"><img src="bambino.jpg" alt="" /></div>
                        <div className="story-card"><img src="pepe.jpg" alt="" /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="" /></div>
                    </div>
                </div>

                {/* Post Input BOX */}
                <div className="post-input-box">
                    {/* Structure optimisée pour aligner l'image et l'input */}
                    <div className="post-input-header">
                        <img src="pepe.jpg" alt="Profile" className="profile" />
                        <input
                            type="text"
                            placeholder="A cosa stai pensando Pepe?"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            className="post-input"
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onloadend = () => setSelectedImage(reader.result);
                            reader.readAsDataURL(file);
                        }}
                        className="file-input"
                    />

                    {/* SHARE BUTTON — Maintenant EN BAS */}
                    <button className="share-btn" onClick={handleShare}>Share</button>
                </div>

                {/* Preview */}
                {selectedImage && (
                    <div className="image-preview">
                        <img src={selectedImage} alt="preview" />
                    </div>
                )}

                {/* Posts */}
                <div className="post-list">
                    {posts.map((post, index) => (
                        <div key={index} className="post-item">
                            <div className="post-header">
                                <img src="pepe.jpg" className="profile" alt="" />
                                <div>
                                    <b>Pepe Musafiri</b>
                                    <br />
                                    <small>1 ora fa</small>
                                </div>
                            </div>
                            <p className="post-text">{post.text}</p>
                            {post.image && (
                                <img src={post.image} className="post-image" alt="post" />
                            )}
                            <div className="post-actions">
                                <button>👍 {post.likes}</button>
                                <button>💬</button>
                                <button>🔗</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* CSS DANS LA MÊME PAGE AVEC RESPONSIVE AJOUTÉ */}
            <style>{`
                .post-input-box { 
                    display: flex; 
                    flex-direction: column; 
                    gap: 10px; 
                    background: white; 
                    padding: 15px; 
                    border-radius: 15px; 
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
                    margin-bottom: 20px; 
                    width: 100%; /* Assure la pleine largeur */
                    box-sizing: border-box; 
                } 

                /* Nouvelle section pour l'alignement profil + input */
                .post-input-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .post-input-header .profile {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                
                .post-input-header .post-input {
                    flex-grow: 1; /* Permet à l'input de prendre l'espace restant */
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    box-sizing: border-box;
                }
                
                /* Style du bouton Share */
                .share-btn { 
                    padding: 12px; 
                    background: #1877f2; 
                    color: white; 
                    border: none; 
                    border-radius: 20px; 
                    cursor: pointer; 
                    font-size: 16px; 
                    width: 100%; 
                    margin-top: 10px; 
                }

                /* Media Query pour les petits écrans (smartphones - max 600px) */
                @media (max-width: 600px) {
                    .post-input-box {
                        padding: 10px; 
                        border-radius: 10px; 
                    }
                    .post-input-header .profile {
                         width: 40px; 
                         height: 40px;
                    }
                    .post-input-header .post-input {
                        font-size: 14px; 
                        padding: 8px;
                    }
                    .share-btn {
                        padding: 10px; 
                        font-size: 14px;
                        border-radius: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PostInput;