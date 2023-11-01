import express from "express";
import userRouter from "./src/adapters/userRoutes";
import productRouter from "./src/adapters/userRoutes";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());

const port = process.env.PORT || 8081;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.get("/", async (req, res) => {
  return res.json({ mensagem: "homepage" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.listen(8080, () => {
  console.log(`servidor iniciado em http://localhost:${port}`);
});

export default app;
