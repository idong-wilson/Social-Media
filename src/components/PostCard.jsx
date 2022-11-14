import React from 'react';

export default function PostCard({ post }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{ post.title }</h5>
                <p className="card-text">{ post.body }</p>
                <a className='btn btn-primary' href='/'>See More</a>
            </div>
        </div>
    )
}