import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import {fileURLToPath} from "url";
import path from "path";
import http from 'http';
import PostSchema from "./models/Post.js";
import {Server,Socket} from 'socket.io'


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    origin: ['http://localhost:3000','https://mern-blog-client-gvbw.onrender.com'],

});



// CONFIGURATIONS
const __filename  = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
dotenv.config();
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000','https://mern-blog-client-gvbw.onrender.com'],
    credentials:true,
    methods:["GET","POST","PATCH","PUT","DELETE"],

}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});



app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


mongoose.connect(process.env.MONGO_URL,{

})
    .then(() => console.log('DB IS WORKING'))
    .catch((err) => console.error(err));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for comment events
    socket.on('comment', async (commentData) => {
        try {
            // Save the comment to MongoDB
            const comment = {
                postId: commentData.postId,
                author: commentData.author,
                comment: commentData.comment,
            };

            // Save the comment to MongoDB using your existing code or Mongoose methods
            // Example:
            // const newComment = await Comment.create(comment);
            const post = await PostSchema.findById(postId);

            await post.comments.push({
                comment,
                author
            });
            const updatedPost = await PostSchema.findByIdAndUpdate(postId,post,{new:true});


            // Broadcast the comment to all connected clients
            io.emit('newComment', newComment);

            console.log('New comment:', newComment);
        } catch (error) {
            console.error('Failed to save comment:', error);
        }
    });

    // ... Other socket event handlers ...
});


app.use('/',authRoutes);
app.use('/',postRoutes);


server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});