import express, { Request, Response } from "express";
const router = express.Router();
import userService from "../domain/userService";

router.post("/", async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(200).send(user);
});

router.get("/", async (req: Request, res: Response) => {
  const users = await userService.listUsers(100, 1);
  res.status(200).send(users);
});

router.get("/:ID", async (req: Request, res: Response) => {
  const user = userService.getUserById(parseInt(req.params.ID));
  res.status(200).send(user);
});

router.delete("/:ID", async (req: Request, res: Response) => {
  const user = await userService.deleteUserById(parseInt(req.params.ID));
  res.status(200).send(user);
});

router.put("/:ID", async (req: Request, res: Response) => {
  const user = await userService.updateUserById(parseInt(req.params.ID), req.body);
  res.status(200).send(user);
});

export default router;
