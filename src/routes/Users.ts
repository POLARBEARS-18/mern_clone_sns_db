import express, { Router } from 'express';
import { User } from 'models/User';

const userRouter = express.Router();

// CRUD
// update
userRouter.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('ユーザー情報が更新されました。');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(400).json('自分のアカウントだけしか更新できません。');
  }
});

// delete
userRouter.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('ユーザー情報が削除されました。');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(400).json('自分のアカウントだけしか削除できません。');
  }
});

// get query
userRouter.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ? await User.findById(userId) : await User.findOne({ username: username });

    // 不要な情報は取り除く
    const { password, updatedAt, ...other } = user!._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// user follow
userRouter.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // フォロワーに自身がいない場合はフォロー可
      if (!user?.followers.includes(req.body.userId)) {
        // 相手のフォローカウント
        await user?.updateOne({
          // DBにプッシュ
          $push: {
            followers: req.body.userId,
          },
        });
        // 自身のフォローカウント
        await currentUser?.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json('フォローに成功しました');
      } else {
        return res.status(403).json('あなたは既にこのユーザーをフォローしています');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json('自分自身をフォローできません');
  }
});

// user unfollow
userRouter.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      // フォロワーに自身が存在したらフォロー解除
      if (user?.followers.includes(req.body.userId)) {
        await user?.updateOne({
          $pull: {
            followers: req.body.userId,
          },
        });

        await currentUser?.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json('フォロー解除しました');
      } else {
        return res.status(403).json('このユーザーはフォロー解除できません');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json('自身をフォローできません');
  }
});

export default userRouter;
