import mongoose from 'mongoose';

interface PostResult<T> {
  _doc: T;
}

interface PostType extends PostResult<PostType> {
  userId: string;
  desc: string;
  img: string;
  likes: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

const mongose = mongoose;

const postSchema = new mongoose.Schema<PostType>(
  {
    userId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    likes: {
      type: [{ type: String }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model<PostType>('Post', postSchema);
