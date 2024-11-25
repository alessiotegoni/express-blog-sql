import express from "express";
import postRouter from "./routes/postRouter.js";

const app = express();

const PORT = 3000;

app.use(express.static("public/imgs/posts"));
app.use(express.json());

app.use("/posts", postRouter);

app.use((_, res) => {
  res.status(404).json({ error: "Risorsa non trovata" });
});

app.use((err, _, res) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: "Errore del server",
    message: err.message || "Qualcosa è andato storto!",
  });
});

app.listen(PORT, () => console.log(`✅ Server running on port: ${PORT}`));
