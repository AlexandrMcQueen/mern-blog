import express from "express";
import multer from "multer";
import * as PostRoutes from '../controllers/post.js';
import {deletePost, editPost, getAllPosts, getSinglePost,createComment} from "../controllers/post.js";


const router = express.Router();

const storage  = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads/');
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname);
    },
})

const upload = multer({storage:storage});

router.post('/post',upload.single('file'),PostRoutes.createPost);
router.post('/post/comment',createComment);
router.get('/post',getAllPosts);
router.get('/post/:id',getSinglePost);
router.put('/post',upload.single('file'),editPost);
router.delete('/post/:id',deletePost);


export default router;