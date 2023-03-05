import express from 'express';

import { signupUser,loginUser} from '../controller/user-controller.js';
import { uploadImage } from '../controller/Image-controller.js';
import upload from '../utils/upload.js';
const router=express.Router();


router.post('/signup',signupUser);
router.post('/login',loginUser);

//routing takes 3 arguments 1st end point wnd middleware  3rd is function api or controller
//image is in binary format so we are using a middleware to convert into desired format using library
router.post('/file/upload',upload.single('file'),uploadImage);




export default router;  