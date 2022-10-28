import express from 'express';
import { Post } from 'models/Post';
import { User } from 'models/User';

const postRouter = express.Router();

// post
postRouter.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update
postRouter.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post?.updateOne({
        $set: req.body,
      });
      return res.status(200).json('投稿編集に成功しました');
    } else {
      return res.status(403).json('あなたは他の人の投稿を編集できません');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// delete
postRouter.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post?.deleteOne();
      return res.status(200).json('投稿削除に成功しました');
    } else {
      return res.status(403).json('あなたは他の人の投稿を削除できません');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// specific get
postRouter.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// post likes
postRouter.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // まだいいねされていない場合
    if (!post?.likes.includes(req.body.userId)) {
      // 相手のフォローカウント
      await post?.updateOne({
        // DBにプッシュ
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json('投稿にいいねしました');
    } else {
      // いいねしているユーザーを取り除く
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json('投稿にいいねを外しました');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get only timeline
postRouter.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user?._id });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get timeline
postRouter.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser?._id });
    // 自身がフォローしている投稿内容を全て取得
    const friendPosts = await Promise.all(
      currentUser!.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default postRouter;
