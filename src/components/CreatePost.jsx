import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost(props) {

    const navigate = useNavigate()
    useEffect(() => {
        if (!props.loggedIn){
            props.flashMessage('You must be logged in to view this page', 'warning');
            navigate('/login');
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let title = event.target.title.value;
        let body = event.target.body.value;

        // Get the token from localStorage
        let token = localStorage.getItem('token')

        // Set up the request header
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestBody = JSON.stringify({title, body});

        let res = await fetch("https://kekambas-blog.herokuapp.com/posts", {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        });

        if (res.ok){
            let data = await res.json();
            props.flashMessage(`${data.title} has been created`, 'primary');
            navigate('/');
        } else {
            props.flashMessage('There was an issue, please try again', 'warning');
        }
    }

    return (
        <>
            <h3 className="text-center">Create A New Post</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className='form-control' placeholder='Enter Title' name='title' />
                    <label htmlFor="body">Body</label>
                    <input type="text" className='form-control' placeholder='Enter Body' name='body' />
                    <input type="submit" value="Create Post" className='btn btn-success w-100 mt-3' />
                </div>
            </form>
        </>
    )
}