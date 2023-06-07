import React, {useState} from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {Navigate} from "react-router-dom";

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
const CreatePost = () => {
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    async function createNewPost (ev) {
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files);

        ev.preventDefault();

        if (!content || !title || !files) {
            alert('File,title,and content is required!');
            return;
        }

        const res = await axios({
            method:'POST',
            url:"https://mern-blog-2-9fsg.onrender.com/post",
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials:true
        })


        if (res.status === 200) {
            setRedirect(true);
        } else {
            alert('Something went wrong!')
        }




    }


    if (redirect) {
        return <Navigate to={'/'}/>;

    }

    return (
        <form onSubmit={createNewPost}>
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
                onChange={event => setFiles(event.target.files[0])}
            />
           <ReactQuill onChange={newValue => setContent(newValue)} formats={formats} value={content} modules={modules}/>
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    );
};

export default CreatePost;