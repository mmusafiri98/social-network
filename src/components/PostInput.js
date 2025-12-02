import React, { useState, useEffect, useRef } from "react";

const PostInput = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const storyRef = useRef(null);

    // Recupero post salvati
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts"));
        if (Array.isArray(savedPosts)) setPosts(savedPosts);
    }, []);

    // Auto–carousel infinito ogni 3 secondi
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
        if (!postText.trim()) return;

        const newPost = {
            text: postText,
            likes: 0,
            comments: [],
            image: selectedImage,
        };

        const updated = [newPost, ...posts];
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));

        setPostText("");
        setSelectedImage(null);
    };

    const handleLike = (index) => {
        const updated = [...posts];
        updated[index].likes++;
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
    };

    const handleAddComment = (index, value) => {
        if (!value.trim()) return;

        const updated = [...posts];
        updated[index].comments.push(value);
        setPosts(updated);
        localStorage.setItem("posts", JSON.stringify(updated));
    };

    return (
        <div className="page-layout">

            {/* TOGGLE SIDEBAR */}
            <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

            {/* SIDEBAR */}
            {sidebarOpen && (
                <aside className="sidebar">
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
            )}

            {/* CONTENUTO PRINCIPALE */}
            <main className="main-content">

                {/* CAROUSEL STORIES */}
                <div className="stories-wrapper">
                    <div className="stories-container" ref={storyRef}>
                        <div className="story-card"><img src="bambino.jpg" alt="story" /></div>
                        <div className="story-card"><img src="pepe.jpg" alt="story" /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="story" /></div>

                        {/* COPIE per loop infinito visivo fluido */}
                        <div className="story-card"><img src="bambino.jpg" alt="story" /></div>
                        <div className="story-card"><img src="pepe.jpg" alt="story" /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="story" /></div>
                    </div>
                </div>

                {/* INPUT POST */}
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

                {/* PREVIEW IMMAGINE */}
                {selectedImage && (
                    <div className="image-preview">
                        <img src={selectedImage} alt="preview" />
                    </div>
                )}

                {/* POSTS */}
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

                            {post.image && <img src={post.image} className="post-image" alt="post" />}

                            <div className="post-actions">
                                <button onClick={() => handleLike(index)}>👍 {post.likes}</button>
                                <button>💬</button>
                                <button>🔗</button>
                            </div>

                            {/* COMMENTI */}
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
