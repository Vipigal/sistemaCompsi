
import prisma from "../config/dbConfig";
import { TicketAttributes } from "../domain/ticketService";
import { Optional } from "../utils/option";

export interface ITicketRepository {
  getTicketByEmail(email: string): Promise<TicketAttributes | null>;
  getTicketById(id: number): Promise<TicketAttributes | null>;
  getTickets(): Promise<TicketAttributes[] | null>;
  createTicket(
    body: Optional<TicketAttributes, "id">
  ): Promise<TicketAttributes | null>;
  updateTicketById(
    id: number,
    body: Partial<TicketAttributes>
  ): Promise<TicketAttributes | null>;
  deleteTicketById(id: number): void;
}


export const TicketRepository: ITicketRepository = {
  async getTicketByEmail(email: string): Promise<TicketAttributes | null> {
    try {
      const ticket = await prisma.ticket.findFirst({ where: { email: email } });
      if (ticket) return ticket as TicketAttributes;
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getTicketById(id: number): Promise<TicketAttributes | null> {
    try {
      const ticket = await prisma.ticket.findFirst({ where: { id: id } });
      if (ticket) return ticket as TicketAttributes;
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getTickets: async () => {
    try {
      const tickets = await prisma.ticket.findMany();
      if (tickets) return tickets as TicketAttributes[];
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  createTicket: async (body: Optional<TicketAttributes, "id">) => {
    try {

      const newTicket = await prisma.ticket.create({
        data: body,
      });
      if (newTicket) return newTicket as TicketAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },

  updateTicketById: async (id: number, body: Partial<TicketAttributes>) => {
    try {
      if (body.password) {
        body.password = await hashPassword(body.password);
      }

      const updatedTicket = await prisma.ticket.update({
        where: {
          id: id,
        },
        data: body,
      });
      if (updatedTicket) return updatedTicket as TicketAttributes;
      else return null;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
  deleteTicketById: async (id: number) => {
    try {
      await prisma.ticket.delete({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  },
};
