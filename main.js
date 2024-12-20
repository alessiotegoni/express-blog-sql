import express from "express";
import postRouter from "./routes/postRouter.js";
import cors from "cors";
import { connectDB } from "./configs/conn.js";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.static("public/imgs/posts"));
app.use(express.json());

app.use("/posts", postRouter);

connectDB().then(() =>
  app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`))
);
