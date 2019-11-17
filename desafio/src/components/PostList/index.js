import React, { useState } from 'react';

import Post from '../Post';

import './styles.css';

export default function PostList() {
    const [posts, setPosts] = useState(
        [
            {
                id: 1,
                author: {
                    name: "Julio Alcantara",
                },
                date: "04 Jun 2019",
                content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
                comments: [
                    {
                        id: 1,
                        author: {
                            name: "Diego Fernandes",
                        },
                        content: "Conteúdo do comentário"
                    }
                ]
            },
            {
                id: 2,
                author: {
                    name: "Julio Alcantara",
                },
                date: "04 Jun 2018",
                content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
                comments: [
                    {
                        id: 2,
                        author: {
                            name: "Diego Fernandes",
                        },
                        content: "Nós da Rocketseat estamos sempre a procura de novos devs, incluse 80% dos nossos deves fizeram o Bootcamp"
                    },
                    {
                        id: 3,
                        author: {
                            name: "Diego Fernandes",
                        },
                        content: "Nós da Rocketseat estamos sempre a procura de novos devs, incluse 80% dos nossos deves fizeram o Bootcamp"
                    }
                ]
            },
            {
                id: 3,
                author: {
                    name: "Julio Alcantara",
                },
                date: "04 Jun 2018",
                content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
                comments: [
                    {
                        id: 3,
                        author: {
                            name: "Diego Fernandes",
                        },
                        content: "Conteúdo do comentário"
                    }
                ]
            },
            {
                id: 4,
                author: {
                    name: "Julio Alcantara",
                },
                date: "04 Jun 2018",
                content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
                comments: [
                    {
                        id: 4,
                        author: {
                            name: "Diego Fernandes",
                        },
                        content: "Conteúdo do comentário"
                    }
                ]
            }
        ]
    )

    return (
        <div id='container'>
            {posts.map(post => <Post key={post.id} data={post} />)}
        </div>
    );
}