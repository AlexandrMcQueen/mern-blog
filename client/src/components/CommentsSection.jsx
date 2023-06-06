import React, {useContext, useState} from 'react';
import {UserContext} from "./UserContext";
import axios from "axios";
import {Navigate} from "react-router-dom";

const CommentsSection = ({post}) => {
    const [comment,setComment] = useState('');

    const {userInfo} = useContext(UserContext);
    async function addComment(e) {
        e.preventDefault();


        if (!userInfo.id || !comment || !post) {
            alert(`You must to authorize or add a comment`);
            return;
        }

        const values = {
            comment,
            author:userInfo,
            postId:post?._id
        }

        console.log(values);

        const request = await axios({
            method:"POST",
            url:'http://localhost:5000/post/comment',
            data:values,
            withCredentials:true,

        })
        if (request.status === 200) {
            setComment('');
            window.location.reload()
        } else {
            alert('Cannot add a comment')
        }
    }

    return (
        <div style={{marginTop:'50px'}}>
             <form style={{marginTop:'20px'}} onSubmit={addComment}>
                 <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder='add a comment '/>

                 <div className='comment-btns'>
                     <button type={"submit"}>Comment</button>
                     <button type={"reset"}>Cancel</button>
                 </div>

             </form>
        </div>
    );
};

export default CommentsSection;