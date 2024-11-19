import express from "express";
import postsRouter from "./routes/postsRouter.js";

const app = express();

const PORT = 3000;

app.use(express.static("public/imgs/posts"));
app.use(express.json());

app.use("/posts", postsRouter);

app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
