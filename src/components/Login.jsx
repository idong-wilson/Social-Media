import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        // Get data from form
        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`;

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`)

        let response = await fetch('https://kekambas-blog.herokuapp.com/token', {
            headers: myHeaders
        })

        if (response.ok){
            let data = await response.json()
            // Get token and expiration from the response
            let token = data.token;
            let expiration = data.token_expiration;
            // Store values in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);
            // flash success and redirect back to home back
            props.flashMessage("You have successfully logged in", "success");
            props.logUserIn();
            navigate('/');
        } else {
            // flash a fail message
            props.flashMessage('Incorrect username and/or password', 'danger')
        }
    }

    return (
        <>
            <h3 className="text-center">Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className='form-control' placeholder='Enter Username' name='username' />
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control' placeholder='Enter Password' name='password' />
                    <input type="submit" value="Login" className='btn btn-success w-100 mt-3' />
                </div>
            </form>
        </>
    )
}