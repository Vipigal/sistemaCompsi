import express, { Request, Response } from "express";
const router = express.Router();
import productService from "../domain/services/productService";
import {
  auth,
  checkIfLoggedIn,
  checkRole,
  extractCookie,
  login,
  logout,
} from "../middlewares/auth";
import { TrataErrorUtil } from "../utils/errorHandler";
import { statusCodes } from "../utils/statusCodes";

router.post("/", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.status(200).send("Produto cadastrado com sucesso");
});

router.get("/", async (req: Request, res: Response) => {
  const products = await productService.listProducts();
  res.status(200).send(products);
});

router.get("/:ID", async (req: Request, res: Response) => {
  const product = productService.getProductById(parseInt(req.params.ID));
  res.status(200).send(product);
});

router.delete("/:ID", async (req: Request, res: Response) => {
  const product = await productService.deleteProductById(parseInt(req.params.ID));
  res.status(200).send("Produto removido com sucesso");
});

router.put("/:ID", async (req: Request, res: Response) => {
  const product = await productService.updateProductbyId(parseInt(req.params.ID), req.body);
  res.status(200).send("Produto atualizado com sucesso");
});

export default router;