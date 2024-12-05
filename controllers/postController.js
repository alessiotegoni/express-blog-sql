import { posts } from "../db/posts.js";

export function getPosts(req, res) {
  const { tag } = req.query;

  let dbPosts = posts;

  if (tag)
    dbPosts = dbPosts.filter((post) => post.tags.includes(tag.toLowerCase()));

  res.status(200).json(dbPosts);
}

export function getPost(req, res) {
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

export function deletePost(req, res) {
  const { postId } = req.params;

  const postIndex = posts.findIndex(
    (post) => post.id === parseInt(postId) || post.slug === postId
  );

  if (postIndex === -1)
    return res.status(404).json({ message: "Post not found" });

  posts.splice(postIndex, 1);

  res.sendStatus(204);
}
