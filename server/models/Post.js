import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:{
        type: String,
        required:true,
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            author: Object,
            comment: String,
            createdAt: {
                type:Date,
                default:Date.now
            },
        }
    ],
},{timestamps:true})


export default mongoose.model('Post',PostSchema);