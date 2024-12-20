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

export async function getPost(req, res) {
  const { postId } = req.params;

  const findPost = posts.find(
    (post) => post.id === parseInt(postId) || post.slug === postId
  );

  if (!findPost) return res.status(404).json({ message: "Post not found" });

  res.status(200).json(findPost);
}

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

export async function deletePost(req, res) {
  const { postId } = req.params;

  const postIndex = posts.findIndex(
    (post) => post.id === parseInt(postId) || post.slug === postId
  );

  if (postIndex === -1)
    return res.status(404).json({ message: "Post not found" });

  posts.splice(postIndex, 1);

  res.sendStatus(204);
}
