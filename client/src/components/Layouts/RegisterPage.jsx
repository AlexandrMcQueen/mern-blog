import React, {useState} from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";

const RegisterPage = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);

    async function register(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://mern-blog-2-9fsg.onrender.com/register',{username,password});
            if (response.status === 201) {
                setRedirect(true);
            }

        } catch (e) {
            console.log(e);
            alert('Registration failed.Try later.')
        } finally {
            setPassword('');
            setUsername('');
        }

    }

    if (redirect) {
        return <Navigate to={'/login'}/>
    }
    return (
        <form id='register' action="">
            <h1>Register</h1>
            <input
                type="text"
                placeholder='username'
                value={username}
                onChange={e =>setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder='password'
                value={password}
                onChange={e =>setPassword(e.target.value)}
            />
            <button onClick={register} form="register">Register</button>
        </form>
    );
};

export default RegisterPage;