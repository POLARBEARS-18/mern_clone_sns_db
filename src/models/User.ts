import mongoose from 'mongoose';

interface UserResult<T> {
  _doc: T;
}

interface UserType extends UserResult<UserType> {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPicture: string;
  followers: Array<string>;
  followings: Array<string>;
  isAdmin: boolean;
  desc: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const mongose = mongoose;

const userSchema = new mongoose.Schema<UserType>(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 25,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      maz: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: [{ type: String }],
      default: [],
    },
    followings: {
      type: [{ type: String }],
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 70,
    },
    city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserType>('User', userSchema);
