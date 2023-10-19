import express from 'express';
const router = express.Router();
import productService from '../services/productService';

router.post("/", async (req : any, res: any) => {
  const product = await productService.createProduct(req.body);
  res.status(200).send(product)
});

router.get("/", async (req : any, res: any) => {
  const products = await productService.listProducts(100, 1);
  res.status(200).send(products)
});

router.get("/:ID", async (req : any, res: any) => {
  const product = await productService.getProductById(req.params.ID);
  res.status(200).send(product);
});

router.delete("/:ID", async (req : any, res: any) => {
  const product = await productService.deleteProductById(req.params.ID);
  res.status(200).send(product);
});

router.put("/:ID", async (req : any, res: any) => {
  const product = await productService.updateProductByID(req.body);
  res.status(200).send(product);
});

export default router;

