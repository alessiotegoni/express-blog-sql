import express from "express";
import postRouter from "./routes/postRouter.js";
import cors from "cors"

const app = express();

const PORT = 3000;

app.use(cors())
app.use(express.static("public/imgs/posts"));
app.use(express.json());

app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
