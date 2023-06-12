import React, {useEffect, useState} from 'react';
import Post from "../Post";
import axios from "axios";
import Skeleton from "../Skeleton";

const MainPage = () => {

    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        async function getPosts () {
            try {
                setLoading(true)
                const {data} = await axios.get(`https://mern-blog-2-9fsg.onrender.com/post`,{withCredentials:true});
                setPosts(data);

            } catch (err) {
                alert('Smth went wrong')
            } finally {
                setLoading(false);
            }
        }
        getPosts()
    },[])
    if (!posts) {
        return <h3>Something went wrong</h3>
    }
    return (
     <>
         {
             loading
             ?  <>
                     <Skeleton/>
                     <Skeleton/>
                     <Skeleton/>
                     <Skeleton/>

                </>
             : posts.map(post => (
             <Post
                 key = {posts._id}
                 {...post}
             />
         ))}
         {
             posts.length <= 0 && <h3 style={{textAlign:'center'}}>There is no post yet</h3>
         }
     </>
    );
};

export default MainPage;