import React, {useContext, useState} from 'react';
import {UserContext} from "./UserContext";
import axios from "axios";
import {Navigate} from "react-router-dom";

const CommentsSection = ({post}) => {
<<<<<<< HEAD
    const [commentList,setCommentList] = useState([]);
    const [comment,setComment] = useState('');

    const {comments} = post;

    const {userInfo} = useContext(UserContext);

=======
    const [comment,setComment] = useState('');

    const {userInfo} = useContext(UserContext);
>>>>>>> 8b582ed18f56a71b512d877baac2edb7a6a6f6bf
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

<<<<<<< HEAD

        comments.push(values);




        const request = await axios({
            method:"POST",
            url:`https://mern-blog-2-9fsg.onrender.com/post/comment`,
            data:values,
            withCredentials:true,

=======
        console.log(values);

        const request = await axios({
            method:"POST",
            url:`https://mern-blog-2-9fsg.onrender.com/post/comment`,
            data:values,
            withCredentials:true,

>>>>>>> 8b582ed18f56a71b512d877baac2edb7a6a6f6bf
        })
        if (request.status === 200) {
            setComment('');
        } else {
<<<<<<< HEAD
            alert('Cannot add a comment');
=======
            alert('Cannot add a comment')
>>>>>>> 8b582ed18f56a71b512d877baac2edb7a6a6f6bf
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
<<<<<<< HEAD

             </form>

            <div style={{marginTop:'10px'}}>
                Comments:
                {
                    post?.comments.map((com,i) => {
                        return  <>
                            <p  className='comment'>{com?.author?.username} : {com.comment}</p>
                        </>

                    })
                }

            </div>

=======

             </form>
>>>>>>> 8b582ed18f56a71b512d877baac2edb7a6a6f6bf
        </div>
    );
};

export default CommentsSection;
