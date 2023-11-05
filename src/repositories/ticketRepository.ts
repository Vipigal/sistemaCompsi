
import prisma from "../config/dbConfig";
import { TicketAttributes } from "../domain/models/Ticket";
import { Optional } from "../utils/option";

export interface ITicketRepository {
  getTicketById(id: number): Promise<TicketAttributes | null>;
  getTickets(): Promise<TicketAttributes[] | null>;
  createTicket( body: TicketAttributes, email: string): Promise<TicketAttributes | null>;
  updateTicketById(
    id: number,
    body: Partial<TicketAttributes>
  ): Promise<TicketAttributes | null>;
  deleteTicketById(id: number): void;
}


export const TicketRepository: ITicketRepository = {

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
  createTicket: async (body, email: string) => {
    try {
      const newTicket = await prisma.ticket.create({
        data: {
          title: body.title,
          content: body.content,
          status: body.status,
          authorEmail: email
        },
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
