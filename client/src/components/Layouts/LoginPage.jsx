import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

const LoginPage = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);

    const {setUserInfo} = useContext(UserContext);

    async function getUserInfo() {
        const {data} = await axios.get('http://localhost:5000/profile',{withCredentials:true})
        setUserInfo(data);

    }

    async function login(e) {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'POST',
                url:'http://localhost:5000/login',
                withCredentials:true,
                data: JSON.stringify({username,password}),
                headers:{'Content-Type':'application/json'},
            });

            if (response.status === 200){
                 getUserInfo();
                 setRedirect(true);
            }

        } catch (e) {
            console.log(e);
            alert('Invalid credentials.');
        } finally {
            setPassword('');
            setUsername('');
        }

    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }
    return (
        <form id='login'>
            <h1>Login</h1>
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
            <button onClick={login} form="login">Login</button>
        </form>
    );
};

export default LoginPage;