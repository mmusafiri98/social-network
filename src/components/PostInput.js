import React, { useState, useEffect } from 'react';

const PostInput = () => {
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);


    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
            const parsedPosts = JSON.parse(savedPosts);
            setPosts(Array.isArray(parsedPosts) ? parsedPosts : []);
        }
    }, []);

    const handleChange = (e) => setPostText(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleShare = () => {
        if (postText.trim() !== '') {
            const newPost = {
                text: postText,
                likes: 0,
                comments: [],
                image: selectedImage,
            };
            const newPosts = [newPost, ...posts];
            setPosts(newPosts);
            setPostText('');
            setSelectedImage(null);
            localStorage.setItem('posts', JSON.stringify(newPosts));
        }
    };

    const handleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleAddComment = (index, comment) => {
        if (comment.trim() !== '') {
            const updatedPosts = [...posts];
            updatedPosts[index].comments.push(comment);
            setPosts(updatedPosts);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };

    const scrollStories = (amount) => {
        const container = document.getElementById("storyScroll");
        if (container) {
            container.scrollBy({ left: amount, behavior: "smooth" });
        }
    };

    return (
        <div className="page-layout" style={{ display: 'flex', minHeight: '100vh' }}>

            {/* Sidebar gauche */}
            {sidebarOpen && (
                <aside className="sidebar-left" style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc', flexShrink: 0 }}>
                    <h3 className="sidebar-title">Menu</h3>
                    <ul className="sidebar-list">
                        <li>🌐 imagine AI</li>
                        <li>👥 Amici</li>
                        <li>🕑 Ricordi</li>
                        <li>🔖 Elementi salvati</li>
                        <li>👨‍👩‍👧‍👦 Gruppi</li>
                        <li>🎬 Reel</li>
                        <li>🛒 Marketplace</li>
                        <li>📰 Feed</li>
                        <li>⬇ Altro…</li>
                    </ul>
                    <h3 className="sidebar-title">I tuoi collegamenti rapidi</h3>
                    <ul className="sidebar-list">
                        <li>⚽ Top Eleven Calcio Manageriale</li>
                        <li>📈 Zack Stock</li>
                    </ul>
                </aside>
            )}

            {/* Contenu principal */}
            <div className="main-content" style={{ flexGrow: 1, padding: '20px' }}>

                {/* Bouton toggle sidebar */}
                <button
                    className="toggle-sidebar-btn"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
                >
                    ☰
                </button>

                {/* Stories */}
                <div className="stories-wrapper" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <button className="story-arrow left" onClick={() => scrollStories(-300)}>‹</button>
                    <div className="stories-container" id="storyScroll" style={{ display: 'flex', overflowX: 'auto', flexGrow: 1 }}>
                        <div className="story-card"><img src="bambino.jpg" alt="story" style={{ width: '480px', height: '480px', objectFit: 'cover' }} /><div className="create-btn">＋</div></div>
                        <div className="story-card"><img src="pepe.jpg" alt="story" style={{ width: '480px', height: '480px', objectFit: 'cover' }} /></div>
                        <div className="story-card"><img src="uomo.jpg" alt="story" style={{ width: '480px', height: '480px', objectFit: 'cover' }} /></div>
                    </div>
                    <button className="story-arrow right" onClick={() => scrollStories(300)}>›</button>
                </div>

                {/* Post input */}
                <div className="post-container" style={{ marginBottom: '20px' }}>
                    <div className="post-input-section" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <img src="pepe.jpg" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        <input type="text" placeholder="A cosa stai pensando Pepe?" value={postText} onChange={handleChange} style={{ flexGrow: 1, padding: '8px' }} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <button onClick={handleShare}>Share</button>
                    </div>

                    {selectedImage && (
                        <div className="image-preview" style={{ marginBottom: '10px' }}>
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                        </div>
                    )}

                    {/* Posts */}
                    <div className="post-list">
                        {posts.map((post, index) => (
                            <div key={index} className="post-item" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
                                <div className="post-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <img src="pepe.jpg" alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    <div className="post-user-info" style={{ marginLeft: '10px' }}>
                                        <span className="post-user-name">Pepe Musafiri</span><br />
                                        <span className="post-timestamp">23 h</span>
                                    </div>
                                </div>
                                <div className="post-content" style={{ marginBottom: '8px' }}>{post.text}</div>
                                {post.image && <img src={post.image} alt="Post" style={{ maxWidth: '100%', marginBottom: '8px' }} />}
                                <div className="post-actions" style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                                    <button onClick={() => handleLike(index)}>👍 Mi piace ({post.likes})</button>
                                    <button>💬 Commenta</button>
                                    <button>🔗 Condividi</button>
                                </div>
                                <div className="comments-section">
                                    {post.comments.map((comment, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                                            <img src="pepe.jpg" alt="" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                                            <div><span className="comment-user-name">Pepe Musafiri</span> <span>{comment}</span></div>
                                        </div>
                                    ))}
                                    <input type="text" placeholder="Scrivi un commento..." onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddComment(index, e.target.value);
                                            e.target.value = '';
                                        }
                                    }} style={{ width: '100%', padding: '6px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );


};

export default PostInput;
