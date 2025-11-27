import React, { useState, useEffect } from 'react';

const PostInput = () => {
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image

    useEffect(() => {
        const savedPosts = localStorage.getItem('posts');

        if (savedPosts) {
            const parsedPosts = JSON.parse(savedPosts);
            setPosts(Array.isArray(parsedPosts) ? parsedPosts : []);
        } else {
            setPosts([]);
        }
    }, []);

    const handleChange = (e) => {
        setPostText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Set the image URL to state
            };
            reader.readAsDataURL(file); // Convert image file to a data URL
        }
    };

    const handleShare = () => {
        if (postText.trim() !== '') {
            const newPost = {
                text: postText,
                likes: 0,
                comments: [],
                image: selectedImage, // Include image in the post
            };
            const newPosts = [newPost, ...posts];
            setPosts(newPosts);
            setPostText('');
            setSelectedImage(null); // Reset selected image
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

    return (
        <>
            <div className="main-container">
                <div className="left-profile">
                    <div className="profile-summary">
                        <h3>In breve</h3>
                        <p>mi piace disegnare manga e disegno di tutto e suonare anche la chitarra</p>
                        <p>📍 Di Likasi che si trova nella repubblica democratica del congo</p>
                        <p>💔 Single</p>
                        <p>mi piace viaggiare sono un ragazzo curioso e mi piace imparare sempre nuove cose</p>
                    </div>
                </div>

                <div className="center-content">
                    <div className="post-container">


                        <div className="post-input-section">
                            <img src="pepe.jpg" alt="Profile" className="profile-icon" />
                            <input
                                type="text"
                                placeholder="A cosa stai pensando Pepe?"
                                value={postText}
                                onChange={handleChange}
                                className="post-input-field"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-input"
                            />
                            <button className="share-button" onClick={handleShare}>Share</button>
                        </div>

                        {selectedImage && (
                            <div className="image-preview">
                                <img src={selectedImage} alt="Selected" className="preview-image" />
                            </div>
                        )}


                        <div className="post-list">
                            {Array.isArray(posts) && posts.map((post, index) => (
                                <div key={index} className="post-item">
                                    <div className="post-header">
                                        <img src="pepe.jpg" alt="Profile" className="profile-icon" />
                                        <div className="post-user-info">
                                            <span className="post-user-name">Pepe Musafiri</span>
                                            <span className="post-timestamp">23 h</span>
                                        </div>
                                    </div>
                                    <div className="post-content">{post.text}</div>
                                    {post.image && (
                                        <img src={post.image} alt="Post" className="post-image" />
                                    )}
                                    <div className="post-actions">
                                        <button className="action-btn" onClick={() => handleLike(index)}>
                                            👍 Mi piace ({post.likes})
                                        </button>
                                        <button className="action-btn">💬 Commenta</button>
                                        <button className="action-btn">🔗 Condividi</button>
                                    </div>

                                    <div className="comments-section">
                                        {post.comments.map((comment, i) => (
                                            <div key={i} className="comment">
                                                <img src="pepe.jpg" alt="Profile" /> {/* Placeholder profile image */}
                                                <div className="comment-content">
                                                    <span className="comment-user-name">Pepe Musafiri</span> {/* Placeholder name */}
                                                    <span className="comment-text">{comment}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="Scrivi un commento..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddComment(index, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            className="comment-input"
                                        />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="right-profile">
                    <div className="contact-summary">
                        <h3>contatti principali</h3>
                        <p>marco merlo</p>
                        <p>jessica fischer</p>
                        <p>veronica sanchez</p>
                        <p>valentino rossi</p>
                        <p>lorenzo falco</p>
                        <p>mario il belli</p>
                        <p>veronica de cruise</p>
                        <p>valentino irabella</p>
                        <p>marco erlo</p>
                        <p>rebecca fischer</p>
                        <p>jessica sanchez</p>
                        <p>sara rossi</p>
                        <p>paolo falco</p>
                        <p>miranda kelli</p>
                        <p>versino pieri</p>
                        <p>iman la vita</p>
                        <p>marco merlo</p>
                        <p>jessica fischer</p>
                        <p>veronica sanchez</p>
                        <p>valentino rossi</p>
                        <p>lorenzo falco</p>
                        <p>mario il belli</p>
                        <p>veronica de cruise</p>
                        <p>valentino irabella</p>
                        <p>marco erlo</p>
                        <p>rebecca fischer</p>
                        <p>jessica sanchez</p>
                        <p>sara rossi</p>
                        <p>paolo falco</p>
                        <p>miranda kelli</p>
                        <p>versino pieri</p>
                        <p>iman la vita</p>
                        <p>jessica fischer</p>
                        <p>veronica sanchez</p>
                        <p>valentino rossi</p>
                        <p>Renzo Vicenzo</p>
                        <p>mario gilberto</p>
                        <p>veronica de cruise</p>
                        <p>irabella bella</p>
                        <p>marco erlo</p>
                        <p>rebecca fischer</p>
                        <p>jessica sanchez</p>
                        <p>sara rossi</p>
                        <p>paolo falco</p>
                        <p>miranda kelli</p>
                        <p>versino pieri</p>
                        <p>iman la vita</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostInput;
