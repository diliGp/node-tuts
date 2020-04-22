import express from 'express';
import { getUsers } from '../controllers/users';
import { getPosts } from '../controllers/posts';
import { checkCache } from '../middlewares/RedisHandler';
const router = express.Router();
router.get('/users', checkCache, getUsers);
router.get('/posts', checkCache, getPosts);
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
export default router;