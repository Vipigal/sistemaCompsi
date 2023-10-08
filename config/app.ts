import express from "express";
import userRouter from "../src/routes/usersRoute"
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use("/api/users", userRouter);

app.get("/", async (req, res) => {
	return res.json({ mensagem: "homepage" });
});


export default app;