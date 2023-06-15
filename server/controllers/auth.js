import UserSchema from "../models/user.js";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
export const register = async (req,res) => {
    const {username,password} = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(400).json(errors.array());
            return;
        }


        const userError = await UserSchema.findOne({username: username });

        if (userError) {
            res.status(409).json('This name is already in use.');
            return;
        }

        const passwordHash = await bcrypt.hash(password,10);

        const validUser = await UserSchema.create({
            username,
            password:passwordHash
        })

        res.status(201).json(validUser);


    } catch (err) {
        res.status(500).json('Server did not response,try to refresh the page.');

    }
}


export const login = async (req,res) => {
    const {username,password} = req.body;

    try {
        if (!username || !password) {
            res.status(400).json('Login failed');
            return
        }

        const user = await UserSchema.findOne({username:username});


        if (!user) {
            res.status(409).json('User not found');
            return
        }

        const verifiedUser = await bcrypt.compare(password,user.password);

        if (!verifiedUser) {
            res.status(409).json('Invalid credentials');
            return
        }

        jwt.sign({username, id:user._id}, process.env.JWT_SECRET, {expiresIn: '30d'},(err,token) => {
            if (err) throw err;

            res.cookie('token',token,{
                sameSite:"none",
                expiresIn: '1h',
                httpOnly:true,
                secure:true
            }).json('ok');
        })




    } catch (err) {
        console.error(err);
        res.status(500).json('Something went wrong');
    }
}

export const profile = async (req,res) => {
    const {token} = req.cookies;
    try {
        if (token) {
           const verifiedToken = await jwt.verify(token,process.env.JWT_SECRET);
           res.json(verifiedToken);
        }

        
    } catch (e) {
        res.status(506).json({msg:e.message});
        
    }
}

export const logout = async (req,res) => {

    try {

        await res.clearCookie('token',{
            sameSite:"none",
            expiresIn: '1h',
            httpOnly:true,
            secure:true
        }).json('ok');


    } catch (e) {
        res.status(506).json({msg:e.message});

    }
}