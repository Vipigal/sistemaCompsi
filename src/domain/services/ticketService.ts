import { TicketRepository } from "../../repositories/ticketRepository";
import { TicketAttributes } from "../models/Ticket";
import { UserRepository } from "../../repositories/userRepository";

const ticketService = {
  async createTicket(body: TicketAttributes, email: string | undefined) {
    const { status } = body;

    if (body.status && !["NOVO", "TRANSFERIDO", "RESPONDIDO", "ESPERA", "RESOLVIDO"].includes(status))
      throw new Error("Tipo de status invalido");

    if (!email)
      throw new Error("Usuário nao logado");

    await TicketRepository.createTicket(body, email);
    return "Ticket criado";
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

    const tickets = await TicketRepository.getTickets();
    return tickets;
  },

  getTicketById(id: number) {
    const ticket = TicketRepository.getTicketById(id);
    return ticket;
  },

  updateTicketById(id: number, body: Partial<TicketAttributes>) {
    const { status } = body;
    if (status && !["NOVO", "TRANSFERIDO", "RESPONDIDO", "ESPERA", "RESOLVIDO"].includes(status))
      throw new Error("Tipo de status invalido");

    const ticket = TicketRepository.getTicketById(id);
    if (!ticket)
      throw new Error("Ticket não existente");

    TicketRepository.updateTicketById(id, body);
    return "Ticket atualizado com sucesso";

  },

  async myTickets(email: string | undefined) {
    if(!email)
    throw new Error("Usuário não existente");

    const user = UserRepository.getUserByEmail(email);

    if (!user)
      throw new Error("Usuário não existente");
    
    const tickets = await TicketRepository.myTickets(email);
    if (tickets) return tickets;
    else throw new Error("Erro ao obter tickets do usuário");
  }
};

export default ticketService;
