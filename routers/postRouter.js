import express from 'express';
import {
    addPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
    getPostsMatchingTag,
    searchPosts,
    makeComment
} from '../controllers/PostController.js';

const postRouter = express();

postRouter
    .route('/')
    .post(addPost)
    .get(getAllPosts)

postRouter
    .route('/tags')
    .get(getPostsMatchingTag)

postRouter
    .route('/search')
    .get(searchPosts)

postRouter
    .route('/comment/:slug')
    .post(makeComment)


postRouter
    .route('/:slug')
    .get(getPost)
    .patch(updatePost)
    .delete(deletePost)



export default postRouter;