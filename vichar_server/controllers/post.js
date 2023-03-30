import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/post.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await Post.find();
        res.status(200).json(postMessages); 
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, " "); //  default use karan
        const posts = await Post.find({ $or: [ { title }, { tags: { $in: tags } } ]});  
        res.status(200).json({ data: posts });   
    } catch (err) {    
        res.status(404).json({ message: err.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPostMessage = new Post({ ...post, creator: req.userId, createdAt: new Date()}) ;
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
        console.log(newPostMessage, " Posted Succesfully by", newPostMessage.creator);
    } catch (err) {
        res.status(405).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {

    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // console.log(__id); id not __id
        return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await Post.findByIdAndRemove(id);
    res.status(205).json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {

    const { id } = req.params;
    if(!req.userId) return res.status(401).json({ message: 'user not found'});

    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);  
    } else {
       post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    
    res.status(200).json(updatedPost);
}


export const commentPost = async(req, res) => {

    const { id } = req.params;
    const { value } = req.body;  

    const post = await Post.findById(id);
    post.comments.push(value); 

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await Post.find({ name });
        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// kuch smjh na aaye toh dial 011 25 53 25 53
export default router;