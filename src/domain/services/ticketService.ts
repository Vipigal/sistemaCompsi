import { stat } from "fs";
import { TicketRepository } from "../../repositories/ticketRepository";
import { TicketAttributes } from "../models/Ticket";
import { StatusType } from "../models/Ticket";


const ticketService = {
  async createTicket(body: TicketAttributes) {
    const {id, statusType} = body;
    const existingTicket = await TicketRepository.getTicketById(id);

    if (existingTicket) throw new Error("email em uso");

    if (!["NOVO", "TRANSFERIDO", "RESPONDIDO", "ESPERA ", "RESOLVIDO"].includes(statusType))
      throw new Error("tipo de status invalido");

    await TicketRepository.createTicket(body);
    return "Usuario criado";
  },

  async deleteTicketById(id: number) {
    const existingTicket = await TicketRepository.getTicketById(id);
    if (!existingTicket) throw new Error("Usuario não existe");

    TicketRepository.deleteTicketById(id);
    return "Ticket deletado";
  },

  async listTickets(limit: number, page: number) {
    if (page < 1) {
      throw new Error("O número da página deve ser maior ou igual a 1.");
    }

    const tickets = await TicketRepository
      .getTickets
      // limit,
      // offset: (page - 1) * limit, // Calcula o offset a partir da página
      ();
    return tickets;
  },

  getTicketById(id: number) {
    const ticket = TicketRepository.getTicketById(id);
    return ticket;
  },

  updateTicketById(id: number, body: Partial<TicketAttributes>) {
    try{
        TicketRepository.updateTicketById(id, body);
    }
    catch(err) {
      throw new Error("Você não tem permissão para fazer isso");
    }
  },
};

export default ticketService;
