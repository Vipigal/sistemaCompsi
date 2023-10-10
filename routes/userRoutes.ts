import express from 'express';
const router = express.Router();
import usersService from '../services/userService';

router.post("/", async (req : any, res: any) => {
  const user = await usersService.createUser(req.body);
  res.status(200).send({user});
});

router.get("/", async (req : any, res: any) => {
  const users = await usersService.listUsers(100, 0);
  res.status(200).send(users)
});

router.get("/:ID", async (req : any, res: any) => {
  const user = await usersService.getUserById(req.params.ID);
  res.status(200).send(user);
});

router.delete("/:ID", async (req : any, res: any) => {
  const user = await usersService.deleteUserById(req.params.ID);
  res.status(200).send(user);
});

router.put("/:ID", async (req : any, res: any) => {
  const user = await usersService.updateUserById(req.body);
  res.status(200).send(user);
});

export default router;