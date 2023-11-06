import express, { Request, Response } from "express";
import { upload } from "../config/s3Config";
import postService from "../domain/services/postService";
import {
  auth,
  checkRole,
} from "../middlewares/auth";
import { TrataErrorUtil } from "../utils/errorHandler";


const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const post = await postService.listPosts(null, 1, 100);
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/type/:TYPE", async (req: Request, res: Response) => {
  try {
    console.log(req.params.TYPE);
    const post = await postService.listPosts(req.params.TYPE, 1, 100);
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostById(parseInt(req.params.ID));
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.post(
  "/",
  auth,
  upload.single("Foto"),
  async (req: Request, res: Response) => {
    try {
      if (req.file) {
        req.body.imageURL = (req.file as Express.MulterS3.File).location;
      } else req.body.imageURL = null;
      await postService.createPost(req.body, req.user?.Email);
      res.status(200).json("Post criado com sucesso");
    } catch (err) {
      const error = TrataErrorUtil(err);
      res.status(error.status).json(error.message);
    }
  }
);

router.delete("/:ID", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {
  await postService.deletePostByID(parseInt(req.params.ID));
  res.status(200).send("Produto removido com sucesso");
});

// router.put("/publish/:ID", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {

// });

router.put("/:ID", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {
  try {
    const post = await postService.updatePostByID(parseInt(req.params.ID), req.body);
    res.status(200).json(post);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
