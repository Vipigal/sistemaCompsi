import express from "express";

import userRouter from "./src/adapters/userRoutes";
import productRouter from "./src/adapters/productRoutes";
import postRouter from "./src/adapters/postRoutes";
import ticketRouter from "./src/adapters/ticketRoutes";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

const port = process.env.PORT || 8081;

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5173", //retirar condicao assim que todos sincronizarem .env -> falha de seguranca
    credentials: true,
  })
);


app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/ticket", ticketRouter);

app.listen(port, () => {
  console.log(`servidor iniciado em http://localhost:${port}`);
});

export default app;
