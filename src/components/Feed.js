import React from 'react';
import Post from './Post';
function Feed({ posts }) {
    return (
        <div className="feed">
            {posts.length === 0 ? (
                <p>Aucune publication n'a été trouvée.</p>
            ) : (
                posts.map((post, index) => <Post key={index} post={post} />)
            )}
        </div>
    );
}

export default Feed;
