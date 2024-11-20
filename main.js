import express from "express";
import postRouter from "./routes/postRouter.js";

const app = express();

const PORT = 3000;

app.use(express.static("public/imgs/posts"));
app.use(express.json());

app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
