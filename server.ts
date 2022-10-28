import express from 'express';
import mongoose from 'mongoose';
import authRouter from 'routes/Auth';
import postRouter from 'routes/Posts';
import userRouter from 'routes/Users';
import 'dotenv/config';
import uploadRouter from 'routes/Upload';
import path from 'path';
const app = express();
const POST = 4000;
const mongose = mongoose;

const dbUrl = process.env.MONGOURL as string;

// DB connect
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('接続中...');
  })
  .catch((err) => {
    console.log(err);
  });
console.log(__dirname);

// middleware
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/upload', uploadRouter);
app.get('/', (req, res) => {
  res.send('hello espress!!');
});

app.listen(POST, () => console.log('サーバーが起動しました'));
