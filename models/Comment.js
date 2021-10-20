import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name '],
    },
    comment: {
      type: String,
      required: [true, 'Please tell us what you think'],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'post',
    select: 'title',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
