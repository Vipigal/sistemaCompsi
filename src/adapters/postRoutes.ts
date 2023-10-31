import express, { Request, Response } from "express";
const router = express.Router();
import postService from "../domain/postService";

router.post("/", async (req: Request, res: Response) => {
  const post = await postService.createPost(req.body);
  res.status(200).send(post);
});



export default router;
