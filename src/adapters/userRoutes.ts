import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import userService from "../domain/userService";
import {
  auth,
  checkIfLoggedIn,
  checkRole,
  login,
  logout,
} from "../middlewares/auth";

router.post("/login", checkIfLoggedIn, login, (req: Request, res: Response) => {
  res.json("Login bem sucedido!");
});

router.post("/logout", logout, (req: Request, res: Response) => {
  res.json("Logout bem sucedido!");
});

router.post("/", async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(200).send(user);
});

//Retorna todos os usuarios cadastrados no sistema.
router.get(
  "/",
  auth,
  checkRole(["ADMIN", "GERENCIAL"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.listUsers(100, 1);
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:ID", async (req: Request, res: Response) => {
  const user = userService.getUserById(parseInt(req.params.ID));
  res.status(200).send(user);
});

router.delete("/:ID", async (req: Request, res: Response) => {
  const user = await userService.deleteUserById(parseInt(req.params.ID));
  res.status(200).send(user);
});

router.put("/:ID", async (req: Request, res: Response) => {
  const user = await userService.updateUserById(
    parseInt(req.params.ID),
    req.body
  );
  res.status(200).send(user);
});

export default router;
