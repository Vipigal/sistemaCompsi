// rota para cadastro
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
	return res.json({ mensagem: "usuário cadastrado com sucesso" });
});

router.get("/", async (req, res) => {
	return res.json({ mensagem: "usuário localizado com sucesso" });
});

router.get("/:ID", async (req, res) => {
	const ID = req.params.ID
	return res.json({ mensagem: `usuário ${ID} localizado com sucesso` });
});

router.delete("/:ID", async (req, res) => {
	return res.json({ mensagem: "usuário excluido com sucesso"})
});

router.put("/:ID", async (req, res) => {
	return res.json({ mensagem: "usuário excluido com sucesso"})
});

export default router;