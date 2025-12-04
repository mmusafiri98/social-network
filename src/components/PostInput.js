import React, { useState, useEffect, useRef } from "react";

const PostInput = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const storyRef = useRef(null);

    // Recupera i post dal localStorage
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts"));
        if (Array.isArray(savedPosts)) setPosts(savedPosts);
    }, []);

    // Carousel automatico per le stories
    useEffect(() => {
        const scrollContainer = storyRef.current;
        if (!scrollContainer) return;

        const interval = setInterval(() => {
            if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
                scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                scrollContainer.scrollBy({ left: scrollContainer.offsetWidth, behavior: "smooth" });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => setPostText(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleShare = () => {
        if (!postText.trim() && !selectedImage) return;

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

    const handleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes++;
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };

    const handleAddComment = (index, value) => {
        if (!value.trim()) return;

        const updatedPosts = [...posts];
        updatedPosts[index].comments.push(value);
        setPosts(updatedPosts);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };

    return (
        <div className="page-layout">
            {/* Burger Menu Button — Solo Mobile/Tablet - SOTTO IL NAVBAR */}
            <button
                className="burger-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Overlay per chiudere sidebar su mobile */}
            {sidebarOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <button
                    className="close-sidebar-btn"
                    onClick={() => setSidebarOpen(false)}
                >
                    ✕
                </button>

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

            {/* Main Content */}
            <main className="main-content">
                {/* Stories Carousel */}
                <div className="stories-wrapper">
                    <div className="stories-container" ref={storyRef}>
                        <div className="story-card"><img src="bambino.jpg" alt="story" /></div>
                        <div className="story-card"><img src="pepe.jpg" alt="story" /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="story" /></div>
                        {/* Copie per loop fluido */}
                        <div className="story-card"><img src="bambino.jpg" alt="story" /></div>
                        <div className="story-card"><img src="pepe.jpg" alt="story" /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="story" /></div>
                    </div>
                </div>

                {/* Post Input */}
                <div className="post-input-box">
                    <img src="pepe.jpg" alt="Profile" className="profile" />
                    <input
                        type="text"
                        placeholder="A cosa stai pensando Pepe?"
                        value={postText}
                        onChange={handleChange}
                        className="post-input"
                    />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                    <button className="share-btn" onClick={handleShare}>Share</button>
                </div>

                {/* Preview Image */}
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
                                    <b>Pepe Musafiri</b><br />
                                    <small>1 ora fa</small>
                                </div>
                            </div>

                            <p className="post-text">{post.text}</p>

                            {post.image && (
                                <img src={post.image} className="post-image" alt="post" />
                            )}

                            <div className="post-actions">
                                <button onClick={() => handleLike(index)}>👍 {post.likes}</button>
                                <button>💬</button>
                                <button>🔗</button>
                            </div>

                            <div className="comments">
                                {post.comments.map((c, i) => (
                                    <div key={i} className="comment">
                                        <img src="pepe.jpg" className="comment-profile" alt="" />
                                        <span><b>Pepe:</b> {c}</span>
                                    </div>
                                ))}

                                <input
                                    className="comment-input"
                                    placeholder="Scrivi un commento..."
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAddComment(index, e.target.value);
                                            e.target.value = "";
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PostInput;