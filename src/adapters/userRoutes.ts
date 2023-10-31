import express, { Request, Response } from "express";
const router = express.Router();
import userService from "../domain/userService";
import {
  auth,
  checkIfLoggedIn,
  checkRole,
  login,
  logout,
} from "../middlewares/auth";
import { TrataErrorUtil } from "../utils/errorHandler";

router.post("/login", checkIfLoggedIn, login, (req: Request, res: Response) => {
  res.json("Login bem sucedido!");
});

router.post("/logout", logout, (req: Request, res: Response) => {
  res.json("Logout bem sucedido!");
});

//Retorna todos os usuarios cadastrados no sistema.
router.get(
  "/",
  auth,
  checkRole(["ADMIN", "GERENCIAL"]),
  async (req: Request, res: Response) => {
    try {
      const users = await userService.listUsers(100, 1);
      res.status(200).json(users);
    } catch (err: unknown) {
      const error = TrataErrorUtil(err);
      res.status(error.status).json(error.message);
    }
  }
);

router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const user = userService.getUserById(parseInt(req.params.ID));
    res.status(200).json(user);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await userService.createUser(req.body);
    res.status(200).json("Usuário criado com sucesso!");
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.put("/:ID", async (req: Request, res: Response) => {
  try {
    const user = userService.updateUserById(parseInt(req.params.ID), req.body);
    res.status(200).json(user);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});
router.delete("/:ID", async (req: Request, res: Response) => {
  try {
    await userService.deleteUserById(parseInt(req.params.ID));
    res
      .status(200)
      .json(`Usuário com id ${req.params.ID} deletado com sucesso!`);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
