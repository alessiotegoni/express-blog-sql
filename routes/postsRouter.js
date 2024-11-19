import { Router } from "express";
import { posts } from "../db/posts.js";

const router = Router();

router.get("/", (req, res) => res.send(posts));
router.post("/", (req, res) => res.send("Creo post"));

router
  .route("/:postId")
  .get((req, res) =>
    res.json(
      posts.find((_, postId) => postId + 1 === parseInt(req.params.postId))
    )
  )
  .put((req, res) =>
    res.send("Aggiorno tutto post " + parseInt(req.params.postId))
  )
  .patch((req, res) => res.send("Modifico post " + parseInt(req.params.postId)))
  .delete((req, res) =>
    res.send("Elimino post " + parseInt(req.params.postId))
  );

export default router;
