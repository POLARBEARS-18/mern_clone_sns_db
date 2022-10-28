import express from 'express';
import multer from 'multer';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
uploadRouter.post('/', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('画像アップロードに成功しました');
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default uploadRouter;
