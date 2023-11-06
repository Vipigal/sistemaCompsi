import express, { Request, Response } from "express";
import orderService from "../domain/services/orderService";
import { auth,
         checkRole,} from "../middlewares/auth";
import { TrataErrorUtil } from "../utils/errorHandler";
import { statusCodes } from "../utils/statusCodes";

const router = express.Router();

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    await orderService.createOrder(req.body, req.user?.Email);
    res.status(statusCodes.SUCCESS).json("Pedido criado com sucesso");
  } catch (err) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/", auth, checkRole(["ADMIN", "GERENCIAL"]),async (req: Request, res: Response) => {
  try {
    const orders = await orderService.listOrders(1, 100);
    res.status(200).json(orders);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/product/:product", auth, checkRole(["ADMIN", "GERENCIAL"]),async (req: Request, res: Response) => {
  try {
    const orders = await orderService.listOrdersByProduct(req.params.product);
    res.status(200).json(orders);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/user/:user", auth, checkRole(["ADMIN", "GERENCIAL"]),async (req: Request, res: Response) => {
  try {
    const orders = await orderService.listOrdersByUser(req.params.user);
    res.status(200).json(orders);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/:ID", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderByID(parseInt(req.params.ID));
    res.status(200).json(order);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.put(":ID", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {
  try {
    await orderService.updateOrderbyId(parseInt(req.params.ID), req.body);
    res.status(200).send("Pedido atualizado com sucesso");
  } catch (err) {
        const error = TrataErrorUtil(err);
        res.status(error.status).json(error.message);
      }
});

router.delete("/:ID", auth, checkRole(["ADMIN", "GERENCIAL"]), async (req: Request, res: Response) => {
  try {
    await orderService.deleteOrderByID(parseInt(req.params.ID));
    res.status(200).send("Pedido removido com sucesso");
  } catch (err) {
        const error = TrataErrorUtil(err);
        res.status(error.status).json(error.message);
      }
});

export default router;