import express, { Request, Response } from "express";
import orderService from "../domain/services/orderService";
import { upload } from "../config/s3Config";
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

const router = express.Router();

router.post("/", auth, async (req: Request, res: Response) => {
    try {

      await orderService.createOrder(req.body, req.user?.Email);
      res.status(200).json("Pedido criado com sucesso");
    } catch (err) {
      const error = TrataErrorUtil(err);
      res.status(error.status).json(error.message);
    }
  });

export default router;