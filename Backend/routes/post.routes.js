import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost, deletePost, commentOnPost, linkUnlikePost, getAllPosts, getLikesPosts} from '../controllers/post.controller.js';

const router = express.Router();

router.get('/all', protectRoute, getAllPosts);
router.get('/likes/:id', protectRoute, getLikesPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, linkUnlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);
router.delete('/:id', protectRoute, deletePost)
export default router;