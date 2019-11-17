import React from 'react';

import Comment from '../Comment';

import './styles.css';

export default function Post({ data }) {
    const { author, date, content, comments } = data;
    return (
        <div className='postContainer'>
            <div id='user'>
                <strong>{author.name}</strong>
                <span>{date}</span>
            </div>
            <p>{content}</p>
            {comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </div>
    );
}