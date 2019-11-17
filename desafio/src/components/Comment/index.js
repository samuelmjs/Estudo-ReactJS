import React from 'react';

import './styles.css';

export default function Comment({ data }) {
    const { author, content } = data;
    return (
        <div className='commentContainer'>
            <div id='photo'></div>
            <div className='comment'>
                <p id='comment'><strong>{author.name}</strong> {content}</p>
            </div>
        </div>
    );
}