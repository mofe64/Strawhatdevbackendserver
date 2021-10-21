import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide post title'],
            index: true,
            unique: true
        },
        slug: String,
        preview: {
            type: String,
            required: [true, 'Please provide the preview text']
        },
        body: {
            type: String,
            required: [true, 'please proivde post body']
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        tag: {
            type: String,
            default: 'Backend development'
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

postSchema.pre('save', function (next) {
    this.slug = slugify(`${this.title}`, { lower: true });
    next();
});

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});


const Post = mongoose.model('Post', postSchema);

export default Post;