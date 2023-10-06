// rota para cadastro
import express from "express";
const router = express.Router();

router.post("/users", async (req, res) => {
	return res.json({ mensagem: "usuário cadastrado com sucesso" });
});

router.get("/", async (req, res) => {
	return res.json({ mensagem: "usuário cadastrado com sucesso" });
});

export default router;
