import express from 'express';
import check from '../check.js';

import { 
    getPostsBySearch, 
    getPosts, 
    getPost, 
    createPost, 
    getPostsByCreator, 
    commentPost, 
    updatePost, 
    likePost, 
    deletePost 
} from '../controllers/post.js';


const router = express.Router();

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', check,createPost);  // update delete post interact ke liye admin token check krne ka
router.patch('/:id', check, updatePost);
router.delete('/:id', check, deletePost);
router.patch('/:id/likePost', check,likePost);
router.post('/:id/commentPost', check, commentPost);


export default router;