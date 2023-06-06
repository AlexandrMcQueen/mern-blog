import express from "express";
import * as AuthUser from '../controllers/auth.js'
import {validateUser} from "../validation/validateUser.js";

const router = express.Router();


router.post('/register',validateUser,AuthUser.register);
router.post('/login',validateUser,AuthUser.login);
router.post('/logout',AuthUser.logout);
router.get('/profile',AuthUser.profile);



export default router;