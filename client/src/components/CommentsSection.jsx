import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import io from 'socket.io-client';

const CommentsSection = ({ post }) => {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState('');

    const { userInfo } = useContext(UserContext);

    const socket = io.connect('https://mern-blog-client-gvbw.onrender.com/'); // Replace with your server URL

    const addComment = (e) => {
        e.preventDefault();

        if (!userInfo.id || !comment || !post) {
            alert('You must be authorized and add a comment');
            return;
        }

        const commentData = {
            comment,
            author: userInfo,
            postId: post?._id,
        };

        // Emit the comment event
        socket.emit('comment', commentData);

        setComment('');
    };

    useEffect(() => {
        // Fetch the initial comments from the server

        // Listen for new comment events
        socket.on('newComment', (newComment) => {
            // Update the comment list with the new comment
            setCommentList((prevComments) => [...prevComments, newComment]);
        });

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off('newComment');
        };
    }, [socket]);

    return (
        <div style={{ marginTop: '50px' }}>
            {/* Render the comment list */}
            {commentList.map((comment) => (
                <div key={comment._id}>
                    <p>{comment.author.username}</p>
                    <p>{comment.comment}</p>
                </div>
            ))}

            <form style={{ marginTop: '20px' }} onSubmit={addComment}>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Add a comment"
                />

                <div className="comment-btns">
                    <button type="submit">Comment</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CommentsSection;
