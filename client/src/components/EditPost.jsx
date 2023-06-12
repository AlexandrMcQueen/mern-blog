import React, {useEffect, useState} from 'react';
import ReactQuill from "react-quill";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
};

const formats =
    [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
const EditPost = () => {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);


    const {id} = useParams();

    useEffect(()=> {
        async function getPostInfo() {
            try {
                const {data} = await axios.get(`https://mern-blog-2-9fsg.onrender.com/post/${id}`);
                console.log(data);
                setTitle(data.title);
                setSummary(data.summary);
                setContent(data.content);
                setFiles(data.cover);


            } catch (err) {

            }
        }
        getPostInfo();
    },[])

    
    async function editPost (ev) {

        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if (files){
            data.set('file',files);
            console.log(files);
        }
        ev.preventDefault();

        const res = await axios({
            method:'PUT',
            url:`https://mern-blog-2-9fsg.onrender.com/post`,
            headers:  { "Content-Type": "multipart/form-data" },
            data: data,
            withCredentials:true,
        })

        if (res.status === 200) {
            setRedirect(true);
        } else {
            alert('Something went wrong!')
        }

    }

    if (redirect) {
       return <Navigate to={'/post/' + id}/>;
   }



    return (
        <form onSubmit={editPost}>
            <input
                type="title"
                placeholder={'Title'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input
                type="file"
                onChange={event => setFiles(event?.target?.files[0])}
            />
            <ReactQuill onChange={newValue => setContent(newValue)} formats={formats} value={content} modules={modules}/>
            <button style={{marginTop:'5px'}}>Update post</button>
        </form>
    );
};

export default EditPost;