import express from 'express';

import { signupUser,loginUser} from '../controller/user-controller.js';
import { uploadImage,getImage } from '../controller/Image-controller.js';
import { createPost, 
         getAllPosts, 
         getPost, 
         updatePost,
         deletePost }  from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js';




const router=express.Router();


router.post('/signup',signupUser);
router.post('/login',loginUser);

//routing takes 3 arguments 1st end point 2nd middleware  3rd is function api or controller
//image is in binary format so we are using a middleware to convert into desired format using library
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);
router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost);

export default router;   