import React from 'react';
import {format} from "date-fns";
import {Link} from "react-router-dom";


const Post = ({_id,title,summary,createdAt,cover,content,author}) => {



    const username = author?.username;
    const isContainCover = cover ? cover : '';
    return (
        <div className='post'>
            <div className='image'>
                <Link to={`/post/${_id}`}>
                    <img src={`https://mern-blog-2-9fsg.onrender.com/uploads/`+cover} alt="ImagePost"/>
                </Link>
            </div>
            <div className='texts'>
                <h2>{title}</h2>
                <p className="info">
                    <a href="" className='author'>{username}</a>
                    <time>{format(new Date(createdAt),'MMM d, yyyy HH:mm')}</time>
                </p>
                <p className='summary'>{summary}</p>

                <div className='article' style={{lineHeight:'1.6rem',overflow:'hidden'}} dangerouslySetInnerHTML={{__html:content}}></div>

            </div>
        </div>
    );
};

export default Post;