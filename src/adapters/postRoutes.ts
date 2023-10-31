import express, { Request, Response } from "express";
const router = express.Router();
import postService from "../domain/postService";
import { TrataErrorUtil } from "../utils/errorHandler";

router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const post = postService.getPostById(parseInt(req.params.ID));
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await postService.createPost(req.body);
    res.status(200).json("Post criado com sucesso");
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
