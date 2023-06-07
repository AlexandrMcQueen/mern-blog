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

const app = express();



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
    methods:["GET","POST","PATCH","PUT","DELETE"]
}))

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


mongoose.connect(process.env.MONGO_URL,{

})
    .then(() => console.log('DB IS WORKING'))
    .then(() => app.listen(process.env.PORT))
    .catch((err) => console.error(err));


app.use('/',authRoutes);
app.use('/',postRoutes)