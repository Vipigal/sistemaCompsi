import express, { Request, Response } from "express";
const router = express.Router();
import usersService from "../domain/userService";

router.post("/", async (req: Request, res: Response) => {
  const user = await usersService.createUser(req.body);
  res.status(200).send(user);
});

router.get("/", async (req: Request, res: Response) => {
  const users = await usersService.listUsers(100, 1);
  res.status(200).send(users);
});

router.get("/:ID", async (req: Request, res: Response) => {
  const user = await usersService.getUserById(req.params.ID);
  res.status(200).send(user);
});

router.delete("/:ID", async (req: Request, res: Response) => {
  const user = await usersService.deleteUserById(req.params.ID);
  res.status(200).send(user);
});

router.put("/:ID", async (req: Request, res: Response) => {
  const user = await usersService.updateUserById(req.body);
  res.status(200).send(user);
});

export default router;
