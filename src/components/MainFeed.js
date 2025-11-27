import React from 'react';
import PostInput from './PostInput';
import Post from './Post';

function MainFeed({ posts, addPost }) {
    return (
        <div className="main-feed">
            <PostInput addPost={addPost} />
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
}

export default MainFeed;
