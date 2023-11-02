import express, { Request, Response } from "express";
import postService from "../domain/services/postService";
import { TrataErrorUtil } from "../utils/errorHandler";
import { upload } from "../config/s3Config";

const router = express.Router();

router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostById(parseInt(req.params.ID));
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const post = await postService.listPosts(1, 100);
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.post("/", upload.single("Foto"), async (req: Request, res: Response) => {
  try {
    if (req.file) {
      req.body.content = (req.file as Express.MulterS3.File).location;
    } else req.body.content = null;
    await postService.createPost(req.body);
    res.status(200).json("Post criado com sucesso");
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
