import express, { Request, Response } from "express";
const router = express.Router();
import productService from "../domain/services/productService";
import { auth, checkRole } from "../middlewares/auth";
import { TrataErrorUtil } from "../utils/errorHandler";
import { statusCodes } from "../utils/statusCodes";
import { upload } from "../config/s3Config";

router.post(
  "/",
  auth,
  checkRole(["ADMIN", "GERENCIAL"]),
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (req.file) {
        req.body.image = (req.file as Express.MulterS3.File).location;
      } else req.body.image = null;
      req.body.price = parseInt(req.body.price);
      await productService.createProduct(req.body);
      res.status(statusCodes.SUCCESS).send("Produto cadastrado com sucesso");
    } catch (err) {
      const error = TrataErrorUtil(err);
      res.status(error.status).json(error.message);
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productService.listProducts();
    res.status(statusCodes.SUCCESS).send(products);
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/type/:type", async (req: Request, res: Response) => {
  try {
    const products = await productService.getProductByType(req.params.type);
    console.log(req.params.type);
    res.status(statusCodes.SUCCESS).send(products);
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      parseInt(req.params.ID)
    );
    res.status(statusCodes.SUCCESS).send(product);
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.delete("/:ID", async (req: Request, res: Response) => {
  try {
    await productService.deleteProductById(parseInt(req.params.ID));
    res.status(200).send("Produto removido com sucesso");
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.put("/:ID", async (req: Request, res: Response) => {
  try {
    await productService.updateProductbyId(parseInt(req.params.ID), req.body);
    res.status(statusCodes.SUCCESS).send("Produto atualizado com sucesso");
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
