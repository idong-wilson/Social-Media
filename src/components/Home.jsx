import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';

export default function Home(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://kekambas-blog.herokuapp.com/posts")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPosts(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <h1 className="text-center">Welcome to the Blog</h1>
            {posts.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    )
}