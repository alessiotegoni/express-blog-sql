import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  modifyPost,
  updatePost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

router
  .route("/:postId")
  .get(getPost)
  .put(updatePost)
  .patch(modifyPost)
  .delete(deletePost);

export default router;
