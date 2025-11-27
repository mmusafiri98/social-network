

import React from 'react';

function Post({ post }) {
    return (
        <div className="post">
            <h4>[User] shared an album</h4>
            <p>{post.content}</p>
            <div className="post-footer">
                <span>Like</span>
                <span>Comment</span>
                <span>Share</span>
            </div>
        </div>
    );
}

export default Post;
