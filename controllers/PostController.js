import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import AppError from '../util/AppError.js';
import catchAsync from '../util/catchAsync.js';




export const addPost = catchAsync(async (req, res, next) => {
    const { title, preview, body, tags, draft } = req.body;
    const tagArray = tags.split(',');
    const newPost = await Post.create({
        title,
        preview,
        body,
        tags: tagArray,
        draft,
    });
    res.status(201).json({
        post: newPost,
    })
});


export const getAllPosts = catchAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const count = await Post.find({ draft: true }).countDocuments();
    const posts = await Post.find({draft: false}).limit(limit).skip(skip).sort('-createdAt');
    res.status(200).json({
        posts,
        count
    });
});

export const getAllDrafts = catchAsync(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const count = await Post.find({ draft: true }).countDocuments();
    const posts = await Post.find({draft: true}).limit(limit).skip(skip).sort('-createdAt');
    res.status(200).json({
        posts,
        count
    });
});



export const getPost = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug }).populate({
        path: 'comments',
        fields: 'name comment date'
    });
    if (!post) {
        return next(new AppError(`Sorry We can't seem to find that post`, 404));
    };
    res.status(200).json({ post });
});

export const deletePost = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug });
    if (!post) {
        return next(new AppError(`Sorry We can't seem to find that post`, 404));
    };
    await Post.findByIdAndDelete(post._id);
    res.status(204).json({
        success: true
    });
});

export const updatePost = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const postToUpdate = await Post.findOne({ slug });
    const { title, preview, body, tag } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
        postToUpdate._id,
        {
            title,
            preview,
            body,
            tag,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json({
        updatedPost
    });
});

export const getPostsMatchingTag = catchAsync(async (req, res, next) => {
    const tag = req.query.tag;
    const matchingPosts = await Post.find({ tag });
    res.status(200).json({ matchingPosts });
});

export const searchPosts = catchAsync(async (req, res, next) => {
    const query = req.query.query;
    console.log(query);
    const matchingPostsByTag = await Post.find({ tag: query });
    const matchingPostsByTitle = await Post.find({ title: { $regex: query } });
    const matchingPosts = matchingPostsByTag.concat(matchingPostsByTitle);
    res.status(200).json({ matchingPosts });
});

export const makeComment = catchAsync(async (req, res, next) => {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
        return next(new AppError(`Sorry We can't seem to find that post`, 404));
    };
    const postId = post._id;
    const { name, comment } = req.body;
    const newComment = await Comment.create({
        name,
        comment,
        post: postId,
    });
    res.status(200).json({
        newComment
    });
});