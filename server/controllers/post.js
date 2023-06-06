import PostSchema from "../models/Post.js";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";

export const createPost = async  (req,res) => {
    try {
        const {token} = req.cookies;
        jwt.verify(token,process.env.JWT_SECRET,{},async (err,info) => {
            if (err) throw err;

            const {summary,content,title} = req.body;

            const newPost = await PostSchema.create({
                title,
                content,
                summary,
                cover:req.file.originalname,
                author:info.id
            })
            res.json(newPost);
        })


    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}

export const getAllPosts = async (req,res) => {
    try {
        const posts = await PostSchema
            .find()
            .populate('author','username')
            .sort({createdAt: -1})
            .limit(20);

        res.status(200).json(posts);


    } catch (err) {
        res.status(509).json({msg:'Something went wrong while fetching posts'})

    }
}

export const getSinglePost = async (req,res) => {
    const {id} = req.params;
    try {

        const singlePost = await PostSchema.findById(id).populate('author','username');

        res.status(200).json(singlePost);
        
    } catch (err) {
        res.status(404).json({msg:"Cannot find a post..."})
        
    }
};

export const editPost = async (req,res) => {
    try {

        const {token} = req.cookies;

        jwt.verify(token,process.env.JWT_SECRET,{},async (err,info) => {
            if (err) throw err;

            const {id,title,summary,content} = req.body;

            const postDoc = await Post.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                res.status(404).json({msg:"U r not the author"})
            }

            await postDoc.updateOne({
                title,
                summary,
                content,
                cover: req.file ? req.file.originalname : postDoc.cover,
            })

            res.status(200).json(postDoc);
        })


    } catch (err) {
        res.status(502).json({msg:"Smth went wrong while editing the post"})
    }
}

export const deletePost = async (req,res) =>{
    const {id} = req.params;
    try {
        const {token} = req.cookies;

        jwt.verify(token,process.env.JWT_SECRET,{}, async (err,info) => {
            if (err) throw err;

            const post = await PostSchema.findById(id);

            const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);

            if (!isAuthor) {
                res.status(504).json("U r not the author")
            }

            await post.deleteOne();

            res.status(200).json('ok')

        })




    } catch (err) {
        res.status(504).json({msg:'Cannot delete a message'})
    }
}

export const createComment = async (req,res) => {

    const {author,postId,comment} = req.body;

    try {

        const post = await PostSchema.findById(postId);

        await post.comments.push({
            comment,
            author
        });


        const updatedPost = await PostSchema.findByIdAndUpdate(postId,post,{new:true});

        res.status(200).json(updatedPost);


    } catch (err) {
        res.status(504).json({msg:err.message})
    }
}