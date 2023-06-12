import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "./UserContext";

const Header = () => {
    const {userInfo,setUserInfo} = useContext(UserContext);

    async function logout() {
        await axios.post(`${process.env.REACT_BASE_URL}/logout`,{},{withCredentials:true});
        setUserInfo(null);
    }

    useEffect(() => {
        async function getUserInfo() {
            const {data} = await axios.get(`${process.env.REACT_BASE_URL}/profile`,{withCredentials:true})
            setUserInfo(data);

        }
        getUserInfo()
    },[])

    const username = userInfo?.username;

    return (
        <header>
            <Link to='/' className='logo'>MyBlog</Link>
            <nav>
                {username && (
                    <>
                        <Link to='/create'>Create a new Post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )
                }
                {!username && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )
                }

            </nav>
        </header>
    );
};

export default Header;