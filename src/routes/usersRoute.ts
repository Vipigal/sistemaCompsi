// Importe o módulo express
const express = require("express");
const router = express.Router();

// Importe o serviço de usuário
const usersService = require("../src/services"); // Corrija o caminho para o serviço de usuário

const userInstance = usersService.getInstance();

router.post("/", async (req, res) => {
  const user = await userInstance.create(req.body);
  res.status(201).send({user});
});

router.get("/", async (req, res) => {
  const users = await userInstance.list(100, 0);
  res.status(200).send(users)
});

router.get("/:ID", async (req, res) => {
  const user = await userInstance.getById(req.params.ID);
  res.status(200).send(user);
});

router.delete("/:ID", async (req, res) => {
  const user = await userInstance.deleteById(req.params.ID);
  res.status(204).send(user);
});

router.put("/:ID", async (req, res) => {
  const user = await userInstance.updateById(req.body);
  res.status(204).send(user);
});

export default router;