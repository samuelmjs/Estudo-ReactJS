import React from 'react';

export default function TechItem({ tech, onDelete }) {
    return (
        <li>
            {tech}
            <button onClick={onDelete} type='button'>Remover</button>
        </li>
    );
}
