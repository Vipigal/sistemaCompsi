import express, { Request, Response } from "express";
import ticketService from "../domain/services/ticketService";
import {auth} from "../middlewares/auth";
import { TrataErrorUtil } from "../utils/errorHandler";

const router = express.Router();

router.get("/myTickets", auth, async (req: Request, res: Response) => {
  try{
    const ticket = await ticketService.myTickets(req.user?.Email);
    res.status(200).json(ticket);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.get("/:ID", async (req: Request, res: Response) => {
  try {
    const ticket = ticketService.getTicketById(parseInt(req.params.ID));
    res.status(200).json(ticket);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    await ticketService.createTicket(req.body, req.user?.Email);
    res.status(200).json("Ticket criado com sucesso!");
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

router.put("/:ID", async (req: Request, res: Response) => {
  try {
    const ticket = ticketService.updateTicketById(
      parseInt(req.params.ID),
      req.body
    );
    res.status(200).json(ticket);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});
router.delete("/:ID", async (req: Request, res: Response) => {
  try {
    await ticketService.deleteTicketById(parseInt(req.params.ID));
    res
      .status(200)
      .json(`Ticket com id ${req.params.ID} deletado com sucesso!`);
  } catch (err: unknown) {
    const error = TrataErrorUtil(err);
    res.status(error.status).json(error.message);
  }
});

export default router;
