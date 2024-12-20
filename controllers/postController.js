import asyncHandler from "express-async-handler";
import conn from "../configs/conn.js";

export const getPosts = asyncHandler(async (req, res) => {
  const { tag } = req.query;

  const [results] = await (!tag
    ? conn.query("SELECT * FROM posts as p")
    : conn.execute(
        `SELECT p.*, t.label as tags
         FROM posts AS p
         JOIN post_tag AS pt
         ON pt.post_id = p.id
         JOIN tags AS t
         ON t.id = pt.tag_id
         WHERE t.label = ?`,
        [tag]
      ));

  res.status(200).json(results);
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const [[result]] = await conn.execute("SELECT * FROM posts WHERE id = ?", [
    postId,
  ]);

  if (!result) res.status(404).json({ message: "Post doesn't exist" });

  res.status(200).json(result);
});

export function createPost(req, res) {
  const { post } = req.body;
  res.status(201).json([post, ...posts]);
}

export function updatePost(req, res) {
  const { postId } = req.params;
  const { post } = req.body;
  const postIndex = posts.findIndex((post) => post.id === parseInt(postId));

  if (postIndex === -1)
    return res.status(404).json({ message: "Post not found" });

  res.status(201).json(posts.with(postIndex, post));
}

export function modifyPost(req, res) {
  const { postId } = req.params;
  const { post } = req.body;
  const postIndex = posts.findIndex((post) => post.id === parseInt(postId));

  if (postIndex === -1)
    return res.status(404).json({ message: "Post not found" });

  res.status(201).json(posts.with(postIndex, { ...posts[postIndex], ...post }));
}

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  await conn.execute("DELETE FROM posts WHERE id = ?", [postId]);

  res.sendStatus(204);
});
